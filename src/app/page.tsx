import Login from "@/components/login";
import MagicLink from "@/components/magicLink";
import SendOtp from "@/components/sendOtp";
import { Card, TabsContent, TabsList, TabsRoot, TabsTrigger } from "@radix-ui/themes";

export default function Home() {

  return (
      <Card variant="classic" size="4" style={{ width: 400 }}>
      <TabsRoot defaultValue="magic_link">
        <TabsList>
          <TabsTrigger value="magic_link">Magic Link</TabsTrigger>
          <TabsTrigger value="send_otp" disabled>Send OTP</TabsTrigger>
          <TabsTrigger value="verify_otp" disabled>Verify OTP</TabsTrigger>
        </TabsList>
        <TabsContent value="magic_link"><MagicLink/></TabsContent>
        <TabsContent value="send_otp"><SendOtp/></TabsContent>
        <TabsContent value="verify_otp"><Login/></TabsContent>
      </TabsRoot>
      </Card>
  )
}
