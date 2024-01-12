"use client";
import Login from "@/components/login";
import MagicLink from "@/components/magicLink";
import SendOtp from "@/components/sendOtp";
import {
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "@radix-ui/themes";

export default function Home() {
  return (
    <Grid rows="2" className="bg-black px-40">
      <Flex
        direction="column"
        justify="center"
        align="center"
        gap="3"
        className="h-[100vh]"
      >
        <Heading>Welcome to Formix Study</Heading>
        <h2>Description</h2>
        <Button
          onClick={() => {
            const loginDiv = document.querySelector("#login");
            if (loginDiv) {
              loginDiv.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          Get Started
        </Button>
      </Flex>
      <Flex id="login" direction="column" className="h-[100vh]"></Flex>
    </Grid>
  );
}
