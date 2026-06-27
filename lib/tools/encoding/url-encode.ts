import type { ToolConfig } from '@/lib/types';

const urlEncode: ToolConfig = {
  id: 'url-encode',
  name: 'URL Encode',
  slug: 'url-encode',
  category: 'encoding',
  description:
    'Percent-encode a string for safe use in URLs. Use for query parameters and path segments.',
  icon: 'Link',
  inputLabel: 'Plain Text',
  outputLabel: 'URL-Encoded',
  examples: [
    {
      title: 'Encode query value',
      input: 'hello world & goodbye',
      output: 'hello%20world%20%26%20goodbye',
    },
    {
      title: 'Encode URL path',
      input: '/path/to/file name.txt',
      output: '/path/to/file%20name.txt',
    },
  ],
  faqs: [
    {
      question: 'What is the difference between encodeURI and encodeURIComponent?',
      answer:
        'This tool uses encodeURIComponent, which encodes all characters except A-Z a-z 0-9 - _ . ! ~ * \' ( ).',
    },
    {
      question: 'Does it encode already-encoded strings?',
      answer:
        'Yes, it will double-encode. Decode first if you need to re-encode.',
    },
  ],
  relatedTools: ['url-decode', 'base64-encode', 'base64-decode'],
  transform: (input) => {
    try {
      if (!input.trim()) return { output: '', error: 'Please enter some input' };
      return { output: encodeURIComponent(input) };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Encoding failed';
      return { output: '', error: msg };
    }
  },
};

export default urlEncode;
