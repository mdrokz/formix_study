'use client';

import { Session } from '@/components/session';
import { Settings } from '@/components/settings';
import { Card, Tabs } from '@radix-ui/themes';

export default function Page() {
  return (
    <div className="flex items-center justify-center h-[100vh] w-full">
      <Card className="w-[40%] h-[70vh]">
        <div>
          <Tabs.Root className="TabsRoot" defaultValue="tab1">
            <Tabs.List
              className="TabsList justify-center"
              aria-label="Manage your account"
            >
              <Tabs.Trigger className="TabsTrigger w-[50%]" value="sessions">
                Sessions
              </Tabs.Trigger>
              <Tabs.Trigger className="TabsTrigger w-[50%]" value="settings">
                Settings
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content className="TabsContent" value="sessions">
              <Session />
            </Tabs.Content>
            <Tabs.Content className="TabsContent" value="settings">
              <Settings />
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </Card>
    </div>
  );
}
