'use client';

import { Sessions } from '@/components/sessions';
import { Settings } from '@/components/settings';
import { Card, Tabs } from '@radix-ui/themes';

export default function Page() {
	return (
		<div className="flex flex-col">
			<div className="flex justify-between px-4 py-4 text-white">
				<h1>Formix Study</h1>
				<div>
					<a className="px-4">Sessions</a>
					<a className="px-4">Settings</a>
				</div>
			</div>
			<div className="flex h-[100vh] w-full">
				<Sessions />
			</div>
		</div>
	);
}
