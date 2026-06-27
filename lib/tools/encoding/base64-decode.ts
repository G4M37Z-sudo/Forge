import type { ToolConfig } from '@/lib/types';

const base64Decode: ToolConfig = {
  id: 'base64-decode',
  name: 'Base64 Decode',
  slug: 'base64-decode',
  category: 'encoding',
  description:
    'Decode Base64-encoded text back to its original form. Use for inspecting data URIs or auth headers.',
  icon: 'ArrowDownToLine',
  inputLabel: 'Base64 Input',
  outputLabel: 'Decoded Text',
  examples: [
    {
      title: 'Decode a string',
      input: 'SGVsbG8sIFdvcmxkIQ==',
      output: 'Hello, World!',
    },
    {
      title: 'Decode JSON',
      input: 'eyJ1c2VyIjoiYWRtaW4ifQ==',
      output: '{"user":"admin"}',
    },
  ],
  faqs: [
    {
      question: 'What if the input has line breaks?',
      answer:
        'Line breaks and whitespace are stripped before decoding, so multi-line Base64 works fine.',
    },
    {
      question: 'Does it validate the input?',
      answer:
        'Yes. Invalid Base64 characters or incorrect padding will produce an error message.',
    },
  ],
  relatedTools: ['base64-encode', 'url-encode', 'url-decode'],
  transform: (input) => {
    try {
      if (!input.trim()) return { output: '', error: 'Please enter some input' };
      const cleaned = input.replace(/\s+/g, '');
      const binary = atob(cleaned);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const decoded = new TextDecoder().decode(bytes);
      return { output: decoded };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Decoding failed';
      return { output: '', error: `Invalid Base64: ${msg}` };
    }
  },
};

export default base64Decode;
