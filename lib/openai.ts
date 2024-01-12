import { PromptType } from '@prisma/client';
import OpenAI from 'openai';

export const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});


export const question_generator_prompt_1 = `Create a set of examination questions that assess different cognitive skills—recall, application, analysis, and critical thinking—derived from a given text. Ensure each question reflects the core content of the material and measures the student's comprehension and memory effectively. Also, provide an evaluation of the responses, including precise feedback to support learning enhancement and better academic results.`;

export const question_generator_prompt_2 = `
Imagine yourself as an advanced AI Examination Assistant, whose primary function is to meticulously scrutinize any text a user submits.
Your role is to dissect the material thoroughly and leverage your analysis to devise a series of insightful, detailed, and pertinent questions that effectively measure a student's understanding and advancement in the topic at hand.
The questions you create must be highly relevant, tailored to the context of the subject matter, and crafted to intellectually stimulate the students, akin to the thoughtful and supportive approach of a seasoned educator or examiner.
Furthermore, you bear the responsibility of evaluating the students' answers to these questions.
Conduct this evaluation with the utmost precision and pertinence, mirroring the rigor of your question formation, to ensure a just and precise depiction of the students' knowledge and comprehension.
`

export const examiner_prompt_1 = `As an examination assistant AI, analyze the provided questions and their respective answers in JSON format to assess the accuracy of each answer in relation to its question. Provide a detailed evaluation of the answers, offering constructive feedback to the student that includes both commendations and suggestions for improvement. Summarize the student's overall performance, highlighting their strengths and pinpointing opportunities for future learning and development. Your feedback should be insightful, supportive, and aimed at guiding the student to enhance their understanding and skills.`
export const examiner_prompt_2 = `AI, your mission is to assume the role of a sophisticated Examination Assistant, specializing in the analysis and evaluation of student responses against a set of predefined answers within a JSON file. You are endowed with the ability to meticulously parse complex JSON structures, compare and contrast the given student answers with the correct ones, and render judgments on their accuracy with unwavering precision.

You will be provided with a JSON dataset comprising various pairs of questions and their corresponding student answers. For each of these pairs, you're required to scrutinize the student's answer and conclusively determine its validity, marking it explicitly as 'correct' or 'incorrect'. Following the comprehensive evaluation of all question-answer pairs, you are to craft customized feedback for the student.

Your feedback must be incisive yet nurturing, designed to reflect the student's performance accurately while providing them with constructive criticism and guidance for improvement. The feedback should be couched in a motivational language that fosters a sense of encouragement and focuses on the student's capacity for educational advancement.

Remember, your role is pivotal in bolstering the student's academic journey, so ensure that your feedback is supportive, affirmative, and oriented towards cultivating a positive learning environment.`

export type QuestionGeneratorResult = {
    questions: {
        topic_name: string
        question_text: string
    }[]
}

export const question_generator_function_config = {
    name: 'set_output',
    parameters: {
        "type": "object",
        "properties": {
            "questions": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "topic_name": {
                            "type": "string"
                        },
                        "question_text": {
                            "type": "string"
                        },
                    },
                    "required": [
                        "topic_name",
                        "question_text",
                    ]
                }
            }
        }
    }

}

export type ExaminerResult = {
    questions_and_answers: {
        question: string
        user_answer: string
        is_answer_correct: boolean
        example_answer_to_the_question: string
    }[]
    feedback: string
}

export const examiner_function_config = {
    name: 'set_output',
    parameters: {
        "type": "object",
        "properties": {
            "questions_and_answers": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "question": {
                            "type": "string"
                        },
                        "user_answer": {
                            "type": "string"
                        },
                        "is_answer_correct": {
                            "type": "boolean"
                        },
                        "example_answer_to_the_question": {
                            "type": "string",
                        }
                    },
                    "required": [
                        "question",
                        "answer",
                    ] // adverbs describe & modify other adverbs
                }
            },
            "feedback": {
                "type": "string"
            },
        },
        "required": [
            "questions_and_answers",
            "feedback",
        ]
    }
}

export function setupConfig(prompt: string, function_call: any, custom_prompt?: string): OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming {
    return {
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: custom_prompt ?? prompt
            },
        ],
        functions: [
            function_call
        ]
    }
}