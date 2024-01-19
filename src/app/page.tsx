'use client';
import { Button, Card, Flex, Inset, Strong } from '@radix-ui/themes';
import { useRef } from 'react';
import '@/app/page.css';
import MagicLink from '@/components/magicLink';

export default function Home() {
  const loginContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="h-[100vh] overflow-y-auto snap-y snap-mandatory">
      <Flex
        direction="column"
        justify="center"
        align="center"
        gap="3"
        className="h-[100vh] snap-start"
      >
        <div className="container flex flex-col justify-center items-center">
          <h1 className="text-gradient lg:text-[76px] p-6 font-bold">
            Welcome to Formix Study
          </h1>
          <div className="py-10 px-8 w-[60vw] text-center">
            <p className="text-gradient text-gray-400 text-2xl leading-7">
              Used by some of the world's largest companies, Next.js enables you
              to create full-stack Web applications by extending the latest
              React features, and integrating powerful Rust-based JavaScript
              tooling for the fastest builds.
            </p>
          </div>
          <Button
            size={'4'}
            onClick={() => {
              if (loginContainerRef.current) {
                loginContainerRef.current.scrollIntoView({
                  behavior: 'smooth',
                });
              }
            }}
          >
            Get Started
          </Button>
        </div>
      </Flex>
      <Flex
        ref={loginContainerRef}
        direction="column"
        justify="center"
        align="center"
        className="h-[100vh] snap-start"
      >
        <div className="container flex flex-col justify-center items-center [--colors-brand:--accent-10] [--colors-brandAccent:--accent-10] [--colors-messageText:--accent-10]">
          <div className="auth-container grid grid-cols-[2fr_1fr] w-[70%] h-[70vh] items-center rounded-xl">
            <div className="left w-full h-full rounded-s-lg"></div>
            <div className="px-6">
              <MagicLink />
            </div>
          </div>
        </div>
      </Flex>
    </div>
  );
}
