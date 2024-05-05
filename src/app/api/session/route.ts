import { Prisma, PromptType, Session } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import { openai, setupConfig, QuestionGeneratorResult, question_generator_function_config } from "@lib/openai";
import prisma from "@lib/db";
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function POST(req: NextRequest) {

    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    // extract form data
    const formData = await req.formData()

    // get the file
    const file = formData.get('file') as File | undefined

    const name = formData.get('name')?.toString()

    const prompt = formData.get('prompt')?.toString()

    const prompt_type = formData.get('prompt_type')?.toString() ?? "ONE"

    if (!file) return NextResponse.json({ error: 'No file provided' })

    if (!name) return NextResponse.json({ error: 'No name provided' })

    const openai_config = setupConfig(prompt_type, question_generator_function_config, prompt)

    const file_content = await file.text()

    console.log('prompt', prompt, 'file', file_content)

    openai_config.messages.push({
        role: 'user',
        content: `Can you please generate questions by analyzing the following text? \n\n ${file_content}`
    })

    const openai_result = await openai.chat.completions.create(openai_config)

    const function_call = openai_result.choices[0].message.function_call;

    if (function_call) {
        const { questions }: QuestionGeneratorResult = JSON.parse(function_call.arguments) as QuestionGeneratorResult

        if (questions.length === 0) return NextResponse.json({ error: 'No questions generated' })

        console.log(questions);


        // return NextResponse.json({ topics })
        const {
            data: { user },
        } = await supabase.auth.getUser()

      
        //TODO: Implement transaction for db operations to maintain integrity

        const session: Prisma.SessionCreateInput = {
            email: user?.email!,
            user_id: user?.id!,
            prompt_type: prompt_type as PromptType,
            prompt: prompt ?? "",
            completion_id: openai_result.id,
            name: name,
            model: openai_config.model as string,
            model_usage: openai_result.usage! as unknown as Prisma.JsonObject,
            no_of_questions: questions.length,
        };

        const session_res = await prisma.session.create({ data: session })

        if (session_res) {

            const { data, error } = await supabase.storage.from('docs').upload(`${user?.id}/${session_res.id}/${file.name}`, file);

            if (error) return NextResponse.json({ error, line: "54" })

                await prisma.session.update({
                    where: {
                        id: session_res.id
                    },
                    data: {
                        file_path: data.path
                    }
                });

                
            const questions_data: Prisma.QuestionCreateManyInput[] = questions.map((question) => {
                return {
                    session_id: session_res.id,
                    title: question.question_text,
                    topic: question.topic_name,
                }
            })

            const questions_res = await prisma.question.createMany({ data: questions_data })

            if (!questions_res) return NextResponse.json({ error: 'Failed to insert questions into DB' })

            console.log(questions_res.count);

            return NextResponse.json(session_res);
        } else {
            return NextResponse.json({ error: 'No questions generated' })
        }

    } else {
        return NextResponse.json({ error: 'No questions generated' })
    }
}

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
        const sessions = await prisma.session.findMany({
            include: {
                questions: true
            }
        })

        return NextResponse.json(sessions)
    }

    const session = await prisma.session.findUnique({
        where: {
            id: id
        },
        include: {
            questions: true
        }
    })

    if (!session) return new Response('No session found', { status: 404 })

    return NextResponse.json(session)
}