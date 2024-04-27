import { Question, Session } from "@prisma/client";
import { NextRequest } from "next/server";

type RequestBody = { sessions: Session & { questions: Question[] }[] }

export async function POST(req: NextRequest) {
    const body: RequestBody = await req.json();

    const sessions = body.sessions;

    const take_questions = 30 / sessions.length;

    const questions = [];

    for (const session of sessions) {
        
        if(questions.length >= 29) break;

        if(session.questions.length === 0) continue;

        let take = take_questions;
        const questions_length = session.questions.length;

        if (questions_length < take_questions) {
            take = questions_length;
        }

        if(questions_length > take_questions) {
            // randomly take some questions
            
        }

        const taken_qs = session.questions.slice(0, take);

        questions.push(...taken_qs);

    }

    console.log(questions);
}