import { Session as SessionModel } from '@prisma/client';
import { Box, Card, Heading, Link } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

export const Sessions = () => {
	const [sessions, setSessions] = useState<SessionModel[]>([]);

	useEffect(() => {
		fetchSessions();
	}, []);

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
	};

	return (
		<div className="px-8 py-4">
			<h1 className="text-2xl text-white">Your Sessions</h1>
			<div className="flex flex-wrap gap-4">
				{sessions.map((session) => {
					return (
						<Link href={`/session/${session.id}`}>
							<Card
								variant="classic"
								size="4"
								style={{ width: 400, height: 200 }}
							>
								<Box key={session.id} className="text-3xl">
									{session.name}
								</Box>
							</Card>
						</Link>
					);
				})}
			</div>
		</div>
	);
};
