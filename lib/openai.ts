import { PromptType } from '@prisma/client';
import OpenAI from 'openai';

export const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});


const prompt_1 = `Create a set of examination questions that assess different cognitive skills—recall, application, analysis, and critical thinking—derived from a given text. Ensure each question reflects the core content of the material and measures the student's comprehension and memory effectively. Also, provide an evaluation of the responses, including precise feedback to support learning enhancement and better academic results.`;

const prompt_2 = `
Imagine yourself as an advanced AI Examination Assistant, whose primary function is to meticulously scrutinize any text a user submits.
Your role is to dissect the material thoroughly and leverage your analysis to devise a series of insightful, detailed, and pertinent questions that effectively measure a student's understanding and advancement in the topic at hand.
The questions you create must be highly relevant, tailored to the context of the subject matter, and crafted to intellectually stimulate the students, akin to the thoughtful and supportive approach of a seasoned educator or examiner.
Furthermore, you bear the responsibility of evaluating the students' answers to these questions.
Conduct this evaluation with the utmost precision and pertinence, mirroring the rigor of your question formation, to ensure a just and precise depiction of the students' knowledge and comprehension.
`


export function setupConfig(prompt_type: string, custom_prompt?: string): OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming {
    const prompt = custom_prompt ?? prompt_type === PromptType.ONE ? prompt_1 : prompt_2;
    return {
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: prompt
            },
        ],
        functions: [{
            name: 'set_output',
            parameters: {
                "type": "object",
                "properties": {
                    "questions": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "question_text": {
                                    "type": "string"
                                },
                            },
                            "required": [
                                "question_text",
                            ]
                        }
                    }
                }
            }
        }]
    }
}