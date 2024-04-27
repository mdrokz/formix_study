'use client';

import { Session } from "@prisma/client";
import { Box, Button, Card, Text, Checkbox, Heading, Link } from "@radix-ui/themes";
import { useState, useEffect } from "react";

export default function Page() {

    const [sessions, setSessions] = useState<Session[]>([]);

    const [selectedSessions, setSelectedSessions] = useState<Record<string, boolean>>({});

    const isAnySelected = Object.values(selectedSessions).some((selected) => selected);

    console.log(isAnySelected);

    useEffect(() => {
        fetchSessions();
    }, [])

    const fetchSessions = async () => {
        try {
            const res = await fetch(`/api/session`);

            if (res.ok && res.status === 200) {
                const data = await res.json();
                const selectedSessions: Record<string, boolean> = {};
                for (const session of data) {
                    selectedSessions[session.id] = false;
                }
                setSelectedSessions(selectedSessions);
                setSessions(data);
            } else {
                console.error('Error fetching session');
            }

        } catch (error) {
            console.error(error);
        }
    }

    const handleSessionChange = (id: string) => {
        setSelectedSessions((prevSelectedSessions) => ({
            ...prevSelectedSessions,
            [id]: !prevSelectedSessions[id],
        }));
    }

    const generateCombinedSessions = () => {
        const filteredSessions = sessions.filter((session) => {
            return selectedSessions[session.id];
        })
        console.log(filteredSessions);
        fetch(`/api/session/combine`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sessions: filteredSessions,
            }),
        })
    }

    return (
        <Card variant="classic" size="4" style={{ width: 400 }}>
            <Heading>Your Sessions</Heading>
            <Text color="gray">Select sessions to generate a combined session that will contain questions from all of the selected sessions</Text>
            {sessions.map((session) => {
                return (
                    <Box key={session.id} className="p-1 flex space-x-2 items-center">
                        <Link href={`/session/${session.id}`}>{session.name}</Link>
                        <Checkbox checked={selectedSessions[session.id]} onClick={() => handleSessionChange(session.id)} />
                    </Box>
                )
            })}
            <Button disabled={!isAnySelected} onClick={generateCombinedSessions}>Generate Combined Session</Button>
        </Card>
    )
}