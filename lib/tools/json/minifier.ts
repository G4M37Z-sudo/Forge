import type { ToolConfig } from '@/lib/types';

const minifier: ToolConfig = {
  id: 'json-minifier',
  name: 'JSON Minifier',
  slug: 'json-minifier',
  category: 'json',
  description:
    'Minify JSON by removing all unnecessary whitespace. Use to reduce payload size for production or APIs.',
  icon: 'Minimize2',
  inputLabel: 'JSON Input',
  outputLabel: 'Minified JSON',
  inputType: 'code',
  outputType: 'code',
  examples: [
    {
      title: 'Minify pretty JSON',
      input: '{\n  "name": "John",\n  "age": 30\n}',
      output: '{"name":"John","age":30}',
    },
    {
      title: 'Already minified',
      input: '{"a":1,"b":2}',
      output: '{"a":1,"b":2}',
    },
  ],
  faqs: [
    {
      question: 'Does minification lose data?',
      answer:
        'No. Minification only removes whitespace. All key-value pairs remain identical.',
    },
    {
      question: 'Can I minify other formats?',
      answer:
        'Use XML Formatter for XML, or YAML Formatter for YAML.',
    },
  ],
  relatedTools: ['json-formatter', 'json-validator', 'json-prettifier'],
  transform: (input) => {
    try {
      const parsed = JSON.parse(input);
      return { output: JSON.stringify(parsed) };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON';
      return { output: '', error: msg };
    }
  },
};

export default minifier;
