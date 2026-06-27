import type { ToolConfig } from '@/lib/types';

const prettifier: ToolConfig = {
  id: 'json-prettifier',
  name: 'JSON Prettifier (Tabs)',
  slug: 'json-prettifier',
  category: 'json',
  description:
    'Pretty-print JSON using tab indentation instead of spaces. Faster than the formatter for tab-style projects.',
  icon: 'Indent',
  inputLabel: 'JSON Input',
  outputLabel: 'Prettified JSON',
  inputType: 'code',
  outputType: 'code',
  examples: [
    {
      title: 'Prettify with tabs',
      input: '{"name":"John","age":30}',
      output: '{\n\t"name": "John",\n\t"age": 30\n}',
    },
  ],
  faqs: [
    {
      question: 'How is this different from JSON Formatter?',
      answer:
        'This tool always uses tab indentation. The formatter lets you choose space count.',
    },
    {
      question: 'Does it support tabs inside string values?',
      answer:
        'Tabs inside string literals are preserved as-is; only structural indentation uses tabs.',
    },
  ],
  relatedTools: ['json-formatter', 'json-minifier', 'json-validator'],
  transform: (input) => {
    try {
      const parsed = JSON.parse(input);
      return { output: JSON.stringify(parsed, null, '\t') };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON';
      return { output: '', error: msg };
    }
  },
};

export default prettifier;
