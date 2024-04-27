'use client';

import { Attempt } from "@prisma/client";
import { Box, Button, Card, Heading, Link } from "@radix-ui/themes";
import { useState, useEffect } from "react";

export default function Page() {

    const [attempts, setAttempts] = useState<Attempt[]>([]);

    useEffect(() => {
        fetchAttempts();
    }, [])

    const fetchAttempts = async () => {
        try {
            const res = await fetch(`/api/attempt`);

            if (res.ok && res.status === 200) {
                const data = await res.json();
                setAttempts(data);
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
            <Heading>Your Attempts</Heading>
            {attempts.map((attempt, index) => {
                return (
                    <Box key={attempt.id}>
                        <Link href={`/session/${attempt.session_id}/attempt/${attempt.id}`}>{`Attempt no. ${index}`}</Link>
                    </Box>
                )
            })}
        </Card>
    )
}