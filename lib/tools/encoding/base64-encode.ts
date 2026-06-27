import type { ToolConfig } from '@/lib/types';

const base64Encode: ToolConfig = {
  id: 'base64-encode',
  name: 'Base64 Encode',
  slug: 'base64-encode',
  category: 'encoding',
  description:
    'Encode text or binary data to Base64. Use for data URIs, basic auth headers, or safe transport of binary data.',
  icon: 'ArrowUpFromLine',
  inputLabel: 'Plain Text',
  outputLabel: 'Base64 Output',
  examples: [
    {
      title: 'Encode a string',
      input: 'Hello, World!',
      output: 'SGVsbG8sIFdvcmxkIQ==',
    },
    {
      title: 'Encode JSON',
      input: '{"user":"admin"}',
      output: 'eyJ1c2VyIjoiYWRtaW4ifQ==',
    },
  ],
  faqs: [
    {
      question: 'Is Base64 encryption?',
      answer:
        'No. Base64 is encoding, not encryption. Anyone can decode it. Use it for transport, not security.',
    },
    {
      question: 'Does it handle Unicode?',
      answer:
        'Yes. The encoder uses TextEncoder to handle UTF-8 correctly, including emoji and non-Latin characters.',
    },
  ],
  relatedTools: ['base64-decode', 'url-encode', 'url-decode'],
  transform: (input) => {
    try {
      const bytes = new TextEncoder().encode(input);
      let binary = '';
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return { output: btoa(binary) };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Encoding failed';
      return { output: '', error: msg };
    }
  },
};

export default base64Encode;
