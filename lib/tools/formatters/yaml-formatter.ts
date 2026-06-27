import type { ToolConfig } from '@/lib/types';

function simpleFormatYaml(jsonStr: string, indent: string): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    throw new Error('Input must be valid JSON (YAML formatter converts JSON to YAML)');
  }
  return convertToYaml(parsed, 0, indent);
}

function convertToYaml(value: unknown, level: number, indent: string): string {
  const pad = indent.repeat(level);
  if (value === null || value === undefined) {
    return 'null';
  }
  if (typeof value === 'string') {
    if (value.includes('\n') || value.includes('"') || value.includes(':')) {
      return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
    }
    return value;
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const lines: string[] = [];
    for (const item of value) {
      const yamlVal = convertToYaml(item, level + 1, indent);
      if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
        lines.push(`${pad}- ${yamlVal}`);
      } else {
        lines.push(`${pad}- ${yamlVal}`);
      }
    }
    return lines.join('\n');
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return '{}';
    const lines: string[] = [];
    for (const [k, v] of entries) {
      const yamlVal = convertToYaml(v, level + 1, indent);
      if (typeof v === 'object' && v !== null) {
        lines.push(`${pad}${k}:\n${yamlVal}`);
      } else {
        lines.push(`${pad}${k}: ${yamlVal}`);
      }
    }
    return lines.join('\n');
  }
  return String(value);
}

const yamlFormatter: ToolConfig = {
  id: 'yaml-formatter',
  name: 'YAML Formatter',
  slug: 'yaml-formatter',
  category: 'formatters',
  description:
    'Convert JSON to formatted YAML with configurable indentation. Use for generating YAML configs from JSON.',
  icon: 'FileJson',
  inputLabel: 'JSON Input',
  outputLabel: 'YAML Output',
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
      ],
    },
  ],
  examples: [
    {
      title: 'JSON to YAML',
      input: '{"name":"John","age":30,"address":{"city":"NYC","zip":"10001"}}',
      output: 'name: John\nage: 30\naddress:\n  city: NYC\n  zip: "10001"',
    },
  ],
  faqs: [
    {
      question: 'Does it handle nested objects?',
      answer: 'Yes, nested objects and arrays are formatted with proper indentation.',
    },
    {
      question: 'Is it a full YAML parser?',
      answer:
        'No, this converts JSON to YAML format. It does not parse existing YAML.',
    },
  ],
  relatedTools: ['json-formatter', 'xml-formatter', 'json-minifier'],
  transform: (input, options) => {
    if (!input.trim()) return { output: '', error: 'Please enter some input' };
    const indentSize = parseInt(String(options?.indent ?? '2'), 10) || 2;
    const indent = ' '.repeat(indentSize);
    try {
      return { output: simpleFormatYaml(input, indent) };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Conversion failed';
      return { output: '', error: msg };
    }
  },
};

export default yamlFormatter;
