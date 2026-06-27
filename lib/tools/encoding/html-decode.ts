import type { ToolConfig } from '@/lib/types';

const htmlDecodeMap: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
};

const htmlDecode: ToolConfig = {
  id: 'html-decode',
  name: 'HTML Entities Decode',
  slug: 'html-decode',
  category: 'encoding',
  description:
    'Decode HTML entities back to their original characters. Use to inspect encoded HTML content.',
  icon: 'FileCode',
  inputLabel: 'HTML-Encoded Input',
  outputLabel: 'Decoded Text',
  examples: [
    {
      title: 'Decode entities',
      input: '&lt;div class=&quot;main&quot;&gt;Hello&lt;/div&gt;',
      output: '<div class="main">Hello</div>',
    },
    {
      title: 'Decode ampersand',
      input: 'Tom &amp; Jerry',
      output: 'Tom & Jerry',
    },
  ],
  faqs: [
    {
      question: 'Does it decode numeric entities?',
      answer:
        'No, only the five standard named entities. Numeric entities (&#123;) are left as-is.',
    },
    {
      question: 'Is it safe to decode untrusted input?',
      answer:
        'Decoding itself is safe, but rendering the result as HTML may introduce XSS. Always sanitize after decoding.',
    },
  ],
  relatedTools: ['html-encode', 'url-encode', 'url-decode'],
  transform: (input) => {
    try {
      if (!input.trim()) return { output: '', error: 'Please enter some input' };
      const output = input.replace(/&(amp|lt|gt|quot|#39|apos);/g, (match) => htmlDecodeMap[match] || match);
      return { output };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Decoding failed';
      return { output: '', error: msg };
    }
  },
};

export default htmlDecode;
