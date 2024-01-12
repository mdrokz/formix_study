import { NextRequest, NextResponse } from "next/server"
import prisma from "@lib/db";
import { Prisma, PromptType, Question, Session } from "@prisma/client";
import { setupConfig, examiner_function_config, openai, examiner_prompt_1, examiner_prompt_2, ExaminerResult } from "@lib/openai";

export type RequestBody = {
    session: Session & {questions: Question[]},
    questions: Record<string, string>
}

export async function POST(req: NextRequest) {
    const { questions, session }: RequestBody = await req.json();

    const keys = Object.keys(questions);

    if (!questions || keys.length === 0) return new Response('No questions provided', { status: 400 })

    const prompt = session.prompt == PromptType.ONE ? examiner_prompt_1 : examiner_prompt_2;

    const openai_config = setupConfig(prompt, examiner_function_config)

    const questions_data = keys.map((key,i) => {
        const answer = questions[key];

        return {
            id: key,
            question: session.questions[i].title,
            answer: answer
        }
    });

    openai_config.messages.push({
        role: 'user',
        content: `Can you please analyze this json & output the correct answers for each question & your overall feedback ? \n\n ${JSON.stringify(questions_data)}`
    })

    const openai_result = await openai.chat.completions.create(openai_config);

    const function_call = openai_result.choices[0].message.function_call;

    if (function_call) {
        const { questions_and_answers, feedback } = JSON.parse(function_call.arguments) as ExaminerResult;


        const attempt = await prisma.attempt.create({
            data: {
                feedback,
                session_id: session.id,
                topic_feedback: {},
                accuracy: questions_and_answers.filter(q => q.is_answer_correct).length / questions_and_answers.length * 100,
            }
        });

        if (!attempt) return new Response('Failed to insert attempt into DB', { status: 500 })

        const answers: Prisma.AnswerCreateManyInput[] = questions_and_answers.map((q, i) => {
            return {
                question_id: keys[i],
                user_answer: q.user_answer,
                actual_answer: q.example_answer_to_the_question,
                status: q.is_answer_correct ? "CORRECT" : "INCORRECT",
                attempt_id: attempt.id
            }
        })

        const answers_res = await prisma.answer.createMany({ data: answers })

        if (!answers_res) return new Response('Failed to insert answers into DB', { status: 500 })

        console.log("CREATED ANSWERS COUNT: ", answers_res.count);

        console.log(function_call);

        return NextResponse.json({ answers, feedback })
    } else {
        return new Response('Failed to insert answers into DB', { status: 500 })
    }
}