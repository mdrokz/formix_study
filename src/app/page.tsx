import Login from "@/components/login";
import MagicLink from "@/components/magicLink";
import SendOtp from "@/components/sendOtp";
import { Box, Button, Card, Text, TabsContent, TabsList, TabsRoot, TabsTrigger, TextFieldInput } from "@radix-ui/themes";

import { login, signup } from './actions'

const Signup = () => {

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  return (
    <Box>
      <form>
        <Text>Email address</Text>
        <TextFieldInput id="email" name="email" required type="email" placeholder="Your Email address" />
        <Text>Password</Text>
        <TextFieldInput id="password" name="password" required type="password" placeholder="Your password" />
        <Button formAction={signup}>Sign up</Button>
        <Button formAction={login}>Sign in</Button>
      </form>
    </Box>
  );
}

export default function Home() {

  return (
    <Card variant="classic" size="4" style={{ width: 400 }}>
      <TabsRoot defaultValue="magic_link">
        <TabsList>
          <TabsTrigger value="magic_link">Magic Link</TabsTrigger>
          <TabsTrigger value="sign_up">Sign up</TabsTrigger>
          <TabsTrigger value="sign_in">Sign up</TabsTrigger>
          {/* <TabsTrigger value="send_otp" disabled>Send OTP</TabsTrigger>
          <TabsTrigger value="verify_otp" disabled>Verify OTP</TabsTrigger> */}
        </TabsList>
        <TabsContent value="magic_link"><MagicLink /></TabsContent>
        <TabsContent value="sign_up"><Signup /></TabsContent>
        {/* <TabsContent value="sign_in"><MagicLink/></TabsContent> */}
        {/* <TabsContent value="send_otp"><SendOtp/></TabsContent> */}
        {/* <TabsContent value="verify_otp"><Login/></TabsContent> */}
      </TabsRoot>
    </Card>
  )
}
