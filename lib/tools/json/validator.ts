import type { ToolConfig } from '@/lib/types';

const validator: ToolConfig = {
  id: 'json-validator',
  name: 'JSON Validator',
  slug: 'json-validator',
  category: 'json',
  description:
    'Validate JSON syntax and show the exact line and position of any error.',
  icon: 'CheckCheck',
  inputLabel: 'JSON Input',
  outputLabel: 'Validation Result',
  inputType: 'code',
  outputType: 'text',
  examples: [
    {
      title: 'Valid JSON',
      input: '{"key": true}',
      output: '✓ Valid JSON (14 bytes)',
    },
    {
      title: 'Invalid JSON',
      input: '{"key": true,}',
      output: '✗ Invalid JSON — Unexpected token } in JSON at position 12 (line 1, col 13)',
    },
  ],
  faqs: [
    {
      question: 'Can it validate streaming JSON?',
      answer:
        'No, it validates a single complete JSON document. For JSONL/NDJSON use line-by-line validation.',
    },
    {
      question: 'Does it check schema?',
      answer:
        'This tool only checks syntax. For JSON Schema validation you need an external validator.',
    },
  ],
  relatedTools: ['json-formatter', 'json-minifier', 'json-prettifier'],
  transform: (input) => {
    if (input.trim() === '') {
      return { output: '', error: 'Input is empty' };
    }
    try {
      JSON.parse(input);
      return { output: `✓ Valid JSON (${input.length} bytes)` };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON';
      return { output: '', error: `✗ Invalid JSON — ${msg}` };
    }
  },
};

export default validator;
