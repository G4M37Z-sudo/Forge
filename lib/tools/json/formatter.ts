import type { ToolConfig } from '@/lib/types';

const formatter: ToolConfig = {
  id: 'json-formatter',
  name: 'JSON Formatter',
  slug: 'json-formatter',
  category: 'json',
  description:
    'Pretty-print JSON with configurable indentation. Use to make minified or messy JSON human-readable.',
  icon: 'Braces',
  inputLabel: 'JSON Input',
  outputLabel: 'Formatted JSON',
  inputType: 'code',
  outputType: 'code',
  options: [
    {
      id: 'indent',
      label: 'Indentation',
      type: 'select',
      default: '2',
      options: [
        { label: '2 spaces', value: '2' },
        { label: '4 spaces', value: '4' },
        { label: '1 tab', value: 'tab' },
        { label: 'Compact (tabs inline)', value: '0' },
      ],
    },
    {
      id: 'sort',
      label: 'Sort keys',
      type: 'toggle',
      default: false,
    },
  ],
  examples: [
    {
      title: 'Format minified JSON',
      input: '{"name":"John","age":30,"city":"NYC"}',
      output: '{\n  "name": "John",\n  "age": 30,\n  "city": "NYC"\n}',
    },
    {
      title: 'Deeply nested object',
      input: '{"a":{"b":{"c":1}}}',
      output: '{\n  "a": {\n    "b": {\n      "c": 1\n    }\n  }\n}',
    },
  ],
  faqs: [
    {
      question: 'What happens with invalid JSON?',
      answer:
        'The formatter returns an error message describing where parsing failed. Validate your JSON first with the JSON Validator.',
    },
    {
      question: 'Does it sort keys?',
      answer:
        'No, key order is preserved exactly as in the input. For sorted keys use the JSON Minifier.',
    },
  ],
  relatedTools: ['json-minifier', 'json-validator', 'json-prettifier'],
  transform: (input, options) => {
    try {
      const indent = options?.indent ?? '2';
      const space = indent === 'tab' ? '\t' : indent === '0' ? '' : ' '.repeat(parseInt(String(indent), 10));
      const shouldSort = options?.sort === true;
      const parsed = JSON.parse(input);
      const output = JSON.stringify(parsed, shouldSort ? Object.keys(parsed).sort() : null, space);
      return { output };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON';
      return { output: '', error: `JSON Parse Error: ${msg}` };
    }
  },
};

export default formatter;
