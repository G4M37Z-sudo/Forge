import type { ToolConfig } from '@/lib/types';

const urlDecode: ToolConfig = {
  id: 'url-decode',
  name: 'URL Decode',
  slug: 'url-decode',
  category: 'encoding',
  description:
    'Decode a percent-encoded URL string back to readable text.',
  icon: 'Unlink',
  inputLabel: 'URL-Encoded Input',
  outputLabel: 'Decoded Text',
  examples: [
    {
      title: 'Decode query value',
      input: 'hello%20world%20%26%20goodbye',
      output: 'hello world & goodbye',
    },
    {
      title: 'Decode path',
      input: '/path/to/file%20name.txt',
      output: '/path/to/file name.txt',
    },
  ],
  faqs: [
    {
      question: 'What happens with malformed percent encoding?',
      answer:
        'Invalid sequences (e.g., %ZZ) will produce an error message.',
    },
    {
      question: 'Does it decode + as space?',
      answer:
        'No. This tool uses decodeURIComponent which does not convert + to space. For application/x-www-form-urlencoded, replace + with %20 first.',
    },
  ],
  relatedTools: ['url-encode', 'base64-encode', 'base64-decode'],
  transform: (input) => {
    try {
      return { output: decodeURIComponent(input) };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Decoding failed';
      return { output: '', error: `Invalid URL encoding: ${msg}` };
    }
  },
};

export default urlDecode;
