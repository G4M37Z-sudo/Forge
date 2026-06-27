import type { ToolConfig } from '@/lib/types';

const base64Encode: ToolConfig = {
  id: 'base64-encode',
  name: 'Base64 Encode',
  slug: 'base64-encode',
  category: 'encoding',
  description:
    'Encode text or binary data to Base64. Use for data URIs, basic auth headers, or safe transport of binary data.',
  icon: 'Lock',
  inputLabel: 'Text Input',
  outputLabel: 'Base64 Output',
  inputType: 'text',
  outputType: 'text',
  options: [
    {
      id: 'urlSafe',
      label: 'URL-safe',
      type: 'toggle',
      default: false,
    },
  ],
  examples: [
    {
      title: 'Simple text',
      input: 'Hello, World!',
      output: 'SGVsbG8sIFdvcmxkIQ==',
    },
    {
      title: 'Unicode text',
      input: 'Hello 世界 🌍',
      output: 'SGVsbG8g5LiW55WMIPCfjI0=',
    },
  ],
  faqs: [
    {
      question: 'Is Base64 encryption?',
      answer: 'No. Base64 is encoding, not encryption. It provides zero security. Anyone can decode it.',
    },
    {
      question: 'Does it handle Unicode?',
      answer: 'Yes. The encoder properly handles UTF-8 characters including emoji and CJK characters.',
    },
  ],
  relatedTools: ['base64-decode', 'url-encode', 'url-decode'],
  transform: (input, options) => {
    if (!input) return { output: '', error: 'Please enter some text to encode.' };
    try {
      // Handle Unicode properly
      const utf8Bytes = new TextEncoder().encode(input);
      let binary = '';
      for (const byte of utf8Bytes) {
        binary += String.fromCharCode(byte);
      }
      let result = btoa(binary);
      if (options?.urlSafe) {
        result = result.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      }
      return { output: result };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Encoding failed';
      return { output: '', error: msg };
    }
  },
};

export default base64Encode;
