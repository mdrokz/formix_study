'use client';

import { Answer, Session } from "@prisma/client";
import { Card, Text, Container, Separator } from "@radix-ui/themes";
import { useEffect, useState } from "react";

type Params = {
  params: {
    attempt_id: string
  }
}

type AttemptQuery = Session & { questions: Answer[] }

const FeedbackItem = ({ question, userAnswer, actualAnswer, status }: any) => (
  <Container style={{ marginBottom: '16px', border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}>
    <Text>{question}</Text>
    <Separator orientation="horizontal" style={{ margin: '8px 0' }} />
    <Container style={{ display: 'flex', flexDirection: 'column' }}>
      <Text>Your answer: {userAnswer}</Text>
      <Text>Correct answer: {actualAnswer}</Text>
      <Text>Status: {status === 'CORRECT' ? 'Correct' : 'Incorrect'}</Text>
    </Container>
  </Container>
);

const ExamFeedback = ({ data }: any) => {
  const { feedback, answers, accuracy, average_tta } = data;

  return (
    <Container style={{ padding: '16px', maxWidth: '600px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <Container style={{ marginBottom: '16px' }}>
        <Text>{feedback}</Text>
      </Container>
      <Separator orientation="horizontal" style={{ margin: '16px 0' }} />
      <Container style={{ marginBottom: '16px' }}>
        <Text>Individual Answers</Text>
      </Container>
      <Separator orientation="horizontal" style={{ margin: '8px 0' }} />

      {answers.map((answer: any) => (
        <FeedbackItem
          key={answer.id}
          question={answer.question}
          userAnswer={answer.user_answer}
          actualAnswer={answer.actual_answer}
          status={answer.status}
        />
      ))}

      <Separator orientation="horizontal" style={{ margin: '16px 0' }} />

      <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Text>Statistics</Text>
        <Text>Accuracy: {accuracy}%</Text>
        <Text>Average Time to Answer: {average_tta} seconds</Text>
      </Container>
    </Container>
  );
};


export default function Page({ params }: Params) {

  const id = params.attempt_id;

  const [attempt, setAttempt] = useState<AttemptQuery>();

  useEffect(() => {
    fetchAttempt();
  }, [])

  const fetchAttempt = async () => {
    try {
      const res = await fetch(`/api/attempt/?id=${id}`);

      if (res.ok && res.status === 200) {
        const data = await res.json();
        setAttempt(data);
        console.log(data);
      } else {
        console.error('Error fetching session');
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card variant="classic" size="4" style={{ width: 400 }}>
      {attempt && <ExamFeedback data={attempt} />}
    </Card>
  )
}
