'use client';

import * as Label from '@radix-ui/react-label';
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  TextArea,
  TextFieldInput,
} from '@radix-ui/themes';
import { ChangeEvent, useRef, useState } from 'react';

const Icon = () => {
  return (
    <svg
      className="h-12 w-auto"
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 2.5C3 2.22386 3.22386 2 3.5 2H9.08579C9.21839 2 9.34557 2.05268 9.43934 2.14645L11.8536 4.56066C11.9473 4.65443 12 4.78161 12 4.91421V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V4.91421C13 4.51639 12.842 4.13486 12.5607 3.85355L10.1464 1.43934C9.86514 1.15804 9.48361 1 9.08579 1H3.5ZM4.5 4C4.22386 4 4 4.22386 4 4.5C4 4.77614 4.22386 5 4.5 5H7.5C7.77614 5 8 4.77614 8 4.5C8 4.22386 7.77614 4 7.5 4H4.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H10.5C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H10.5C10.7761 11 11 10.7761 11 10.5C11 10.2239 10.7761 10 10.5 10H4.5Z"
        fill="currentColor"
        fill-rule="evenodd"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
};

export default function Page() {
  const [file, setFile] = useState<File>();
  const [prompt, setPrompt] = useState<string>('');
  const [promptType, setPromptType] = useState<string>('ONE');
  const [name, setName] = useState<string>('');

  const fileUploadInput = useRef<HTMLInputElement>(null);
  const fileUploadContainer = useRef<HTMLDivElement>(null);

  fileUploadContainer.current?.addEventListener('dragover', (e) => {
    console.log('dragover');
    e.preventDefault();
  });
  fileUploadContainer.current?.addEventListener('dragenter', (e) => {
    console.log('dragenter');
    e.preventDefault();
  });

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handlePromptChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = () => {
    if (file) {
      console.log(file);
      console.log(prompt);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', name);
      formData.append('prompt', prompt);
      formData.append('promptType', promptType);

      fetch('/api/session', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error('No file uploaded');
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh] w-full">
      <Card variant="classic" size="4" className="w-[25rem]">
        <Heading className="py-2">Generate a session</Heading>
        <Flex
          direction="column"
          align="center"
          py="8"
          className="cursor-pointer border-dotted border-black border-[3px]"
          onClick={(e) => {
            fileUploadInput.current?.click();
          }}
          onDrop={(e) => {
            e.preventDefault();
            if (fileUploadInput.current) {
              fileUploadInput.current.files = e.dataTransfer.files;
            }
          }}
          ref={fileUploadContainer}
        >
          <Flex align="center" p="2" className="gap-3 cursor-pointer">
            {/* <Icon  /> */}
            <Flex direction="column" py="4" align="center">
              {fileUploadInput.current?.files &&
              fileUploadInput.current?.files?.length > 0 ? (
                <Text size="3">{fileUploadInput.current?.files[0].name}</Text>
              ) : (
                <>
                  <Text size="3">Upload your doc</Text>
                  <Text size="2">Max 2 MB</Text>
                </>
              )}
            </Flex>
            <input
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              id="doc"
              name="doc"
              required
              hidden
              ref={fileUploadInput}
            />
          </Flex>
        </Flex>
        <Box py="2">
          <TextFieldInput
            onChange={(e) => setName(e.currentTarget.value)}
            size="3"
            variant="soft"
            placeholder="Enter your session name (required)"
          />
        </Box>
        <Flex direction={'column'} py="2">
          <Label.Root>Prompt type</Label.Root>
          <SelectRoot
            defaultValue="ONE"
            onValueChange={(v) => setPromptType(v)}
          >
            <SelectTrigger />
            <SelectContent>
              <SelectItem value="ONE">A</SelectItem>
              <SelectItem value="TWO">B</SelectItem>
              <SelectItem value="CUSTOM">CUSTOM</SelectItem>
            </SelectContent>
          </SelectRoot>
        </Flex>
        {promptType === 'CUSTOM' && (
          <Box py="2">
            <TextArea
              onChange={handlePromptChange}
              size="3"
              variant="soft"
              placeholder="Enter your custom prompt for GPT (optional)"
            />
          </Box>
        )}
        <Button onClick={handleSubmit}>Generate</Button>
      </Card>
    </div>
  );
}
