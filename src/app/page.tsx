import { Box, Button, Card, Flex, Heading, Link, Tabs, TabsContent, TabsList, TabsRoot, TabsTrigger, Text, TextFieldInput } from '@radix-ui/themes'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card variant="classic" size="4" style={{ width: 400 }}>
        <TabsRoot defaultValue="register">
          <TabsList>
          <TabsTrigger value="register">Register</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>

          <Box px="4" pt="3" pb="2">
            <TabsContent value="register">
              <Box mb="5">
                <label>
                  <Text as="div" size="2" weight="medium" mb="2">
                    Email address
                  </Text>
                  <TextFieldInput variant="classic" placeholder="Enter your email" />
                </label>
              </Box>

              <Box mb="5" position="relative">
                <Box position="absolute" top="0" right="0" style={{ marginTop: -2 }}>
                  <Link href="#card" size="2">
                    Forgot password?
                  </Link>
                </Box>

                <label>
                  <Text as="div" size="2" weight="medium" mb="2">
                    Password
                  </Text>
                  <TextFieldInput variant="classic" placeholder="Enter your password" />
                </label>
              </Box>

              <Flex mt="6" justify="end" gap="3">
                <Button variant="solid">Sign in</Button>
              </Flex>
            </TabsContent>

            <TabsContent value="login">
              <Text size="2">Access and update your documents.</Text>
            </TabsContent>
          </Box>
        </TabsRoot>
      </Card>
    </main>
  )
}
