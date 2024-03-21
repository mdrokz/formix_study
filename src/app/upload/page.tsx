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
