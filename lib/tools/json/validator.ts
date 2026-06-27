import type { ToolConfig } from '@/lib/types';

const validator: ToolConfig = {
  id: 'json-validator',
  name: 'JSON Validator',
  slug: 'json-validator',
  category: 'json',
  description:
    'Validate JSON syntax and show the exact line and position of any error. Use before formatting or parsing.',
  icon: 'CheckCircle',
  inputLabel: 'JSON Input',
  outputLabel: 'Validation Result',
  inputType: 'code',
  outputType: 'text',
  examples: [
    {
      title: 'Valid JSON',
      input: '{"name": "John", "age": 30}',
      output: 'Valid JSON',
    },
    {
      title: 'Missing comma',
      input: '{"name": "John" "age": 30}',
      output: 'Invalid JSON: Unexpected string at line 1, column 16',
    },
    {
      title: 'Trailing comma',
      input: '{"name": "John",}',
      output: 'Invalid JSON: Unexpected token } in JSON at position 16',
    },
  ],
  faqs: [
    {
      question: 'Does it validate JSON5 or JSONC?',
      answer: 'No. This validator checks strict JSON compliance (RFC 8259). JSON5 and JSONC (with comments, trailing commas) will be flagged as invalid.',
    },
    {
      question: 'Can it validate large files?',
      answer: 'Yes, but extremely large files (>10MB) may cause browser slowdown. For large payloads, validate in chunks.',
    },
  ],
  relatedTools: ['json-formatter', 'json-minifier', 'json-escape'],
  transform: (input) => {
    if (!input.trim()) {
      return { output: '', error: 'Please enter some JSON to validate.' };
    }
    try {
      JSON.parse(input);
      // Count lines and keys for extra info
      const lines = input.split('\n').length;
      const chars = input.length;
      return {
        output: `Valid JSON\n\n${lines} lines · ${chars} characters`,
      };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON';
      return { output: '', error: msg };
    }
  },
};

export default validator;
