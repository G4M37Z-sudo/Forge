import type { ToolConfig } from '@/lib/types';

const htmlEncodeMap: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const htmlEncode: ToolConfig = {
  id: 'html-encode',
  name: 'HTML Entities Encode',
  slug: 'html-encode',
  category: 'encoding',
  description:
    'Encode special HTML characters to their entity equivalents. Use to safely embed user content in HTML.',
  icon: 'Code',
  inputLabel: 'Plain Text',
  outputLabel: 'HTML-Encoded',
  examples: [
    {
      title: 'Encode HTML tags',
      input: '<script>alert("xss")</script>',
      output: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;',
    },
    {
      title: 'Encode ampersand',
      input: 'Tom & Jerry',
      output: 'Tom &amp; Jerry',
    },
  ],
  faqs: [
    {
      question: 'Which characters are encoded?',
      answer: 'The five critical HTML entities: & < > " \'',
    },
    {
      question: 'Does it encode all HTML entities?',
      answer:
        'No, only the five essential ones. For full named-entity encoding use a library.',
    },
  ],
  relatedTools: ['html-decode', 'url-encode', 'url-decode'],
  transform: (input) => {
    try {
      if (!input.trim()) return { output: '', error: 'Please enter some input' };
      const output = input.replace(/[&<>"']/g, (ch) => htmlEncodeMap[ch] || ch);
      return { output };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Encoding failed';
      return { output: '', error: msg };
    }
  },
};

export default htmlEncode;
