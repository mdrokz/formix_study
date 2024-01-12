'use client';

import { Session, Question } from "@prisma/client";
import { useEffect, useState } from "react";

import 'survey-core/defaultV2.min.css';


import { Model, CompleteEvent } from 'survey-core';
import { FlatLight } from "survey-core/themes";
import { Survey } from "survey-react-ui";

type Params = {
    params: {
        id: string
    }
}

type SessionQuery = Session & { questions: Question[] }

export default function Page({ params }: Params) {

    const id = params.id;

    const [session, setSession] = useState<SessionQuery>();

    useEffect(() => {
        fetchSession();
    }, [])

    const panels: Record<string, {
        name: string,
        title: string,
    }[]> = {};

    for (const question of session?.questions || []) {
        if (!panels[question.topic]) {
            panels[question.topic] = [];
        }
        panels[question.topic].push({
            name: question.id,
            title: question.title,
        })
    }

    console.log(panels);

    const surveyQuestions = {
        title: session?.name,
        elements: Object.keys(panels).map((key) => {
            return {
                type: 'panel',
                name: key,
                title: `Topic - ${key}`,
                elements: panels[key].map((d) => {
                    return {
                        title: d.title,
                        name: d.name,
                        // isRequired: true,
                        // requiredErrorText: "Value cannot be empty",
                        type: 'text'
                    }
                }),
            }
        }),
        completedHtml: "<p><h2>Please wait while we process your answers</h2></p>"
    }

    const survey = new Model(surveyQuestions);

    survey.onComplete.add(function (sender, options) {
        options.showSaveInProgress();
        createAttempt(sender.data, options);
    })

    survey.applyTheme(FlatLight);

    const createAttempt = async (data: Record<string, string>, options: CompleteEvent) => {
        try {
            const res = await fetch(`/api/attempt`, {
                method: 'POST',
                body: JSON.stringify({
                    session,
                    questions: data,
                })
            })

            if (res.ok && res.status === 200) {
                const data = await res.json();
                console.log(data);
                options.showDataSavingSuccess();
            } else {
                options.showDataSavingError();
                console.error('Error fetching session');
            }
        } catch (error) {
            options.showDataSavingError();
            console.error(error);
        }
    }

    const fetchSession = async () => {
        try {
            const res = await fetch(`/api/session/?id=${id}`);

            if (res.ok && res.status === 200) {
                const data = await res.json();
                setSession(data);
                console.log(data);
            } else {
                console.error('Error fetching session');
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        // <Card variant="classic" size="4" style={{ width: 400 }}>
        // </Card>
        <Survey model={survey} />
    )
}
