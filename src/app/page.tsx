'use client';
import { Button, Flex, Grid, Heading } from '@radix-ui/themes';
import { useRef } from 'react';
import '@/app/page.css';

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
        <h1 className="text-gradient lg:text-[76px] p-6 font-bold">
          Welcome to Formix Study
        </h1>
        <div className="py-10 px-8 w-[60vw] text-center">
          <p className="text-gradient text-gray-400 text-2xl leading-7">
            Used by some of the world's largest companies, Next.js enables you
            to create full-stack Web applications by extending the latest React
            features, and integrating powerful Rust-based JavaScript tooling for
            the fastest builds.
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
      </Flex>
      <Flex
        ref={loginContainerRef}
        direction="column"
        className="h-[100vh] snap-start"
      ></Flex>
    </div>
  );
}
