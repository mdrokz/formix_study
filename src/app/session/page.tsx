'use client';

import { Session } from "@prisma/client";
import { Box, Button, Card, Heading, Link } from "@radix-ui/themes";
import { useState, useEffect } from "react";

export default function Page() {

    const [sessions, setSessions] = useState<Session[]>([]);

    useEffect(() => {
        fetchSessions();
    }, [])

    const fetchSessions = async () => {
        try {
            const res = await fetch(`/api/session`);

            if (res.ok && res.status === 200) {
                const data = await res.json();
                setSessions(data);
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
            <Heading>Your Sessions</Heading>
            {sessions.map((session) => {
                return (
                    <Box>
                   <Link href={`/session/${session.id}`}>{session.name}</Link>
                    </Box>
                )
            })}
        </Card>
    )
  }
  