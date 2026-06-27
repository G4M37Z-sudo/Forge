import type { ToolConfig } from '@/lib/types';

function jsonToCsv(data: unknown[], delimiter: string): string {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('Input must be a non-empty JSON array');
  }
  const headers = new Set<string>();
  for (const row of data) {
    if (typeof row !== 'object' || row === null) {
      throw new Error('Each item must be a flat object');
    }
    Object.keys(row as Record<string, unknown>).forEach((k) => headers.add(k));
  }
  const headerArr = Array.from(headers);
  const csvRows: string[] = [];
  csvRows.push(headerArr.map((h) => quoteCsv(h, delimiter)).join(delimiter));
  for (const row of data) {
    const obj = row as Record<string, unknown>;
    const cells = headerArr.map((h) => {
      const val = obj[h];
      if (val === null || val === undefined) return '';
      return quoteCsv(String(val), delimiter);
    });
    csvRows.push(cells.join(delimiter));
  }
  return csvRows.join('\n');
}

function quoteCsv(value: string, delimiter: string): string {
  if (value.includes(delimiter) || value.includes('"') || value.includes('\n') || value.includes('\r')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

const jsonToCsvTool: ToolConfig = {
  id: 'json-to-csv',
  name: 'JSON to CSV Converter',
  slug: 'json-to-csv',
  category: 'converters',
  description:
    'Convert a JSON array of flat objects to CSV format. Use for data export and spreadsheet import.',
  icon: 'Table',
  inputLabel: 'JSON Array',
  outputLabel: 'CSV Output',
  inputType: 'code',
  outputType: 'code',
  options: [
    {
      id: 'separator',
      label: 'Separator',
      type: 'select',
      default: ',',
      options: [
        { label: 'Comma (,)', value: ',' },
        { label: 'Semicolon (;)', value: ';' },
        { label: 'Tab', value: 'tab' },
        { label: 'Pipe (|)', value: '|' },
      ],
    },
    {
      id: 'includeHeader',
      label: 'Include Header Row',
      type: 'toggle',
      default: true,
    },
  ],
  examples: [
    {
      title: 'Array of objects',
      input: '[{"name":"John","age":30},{"name":"Jane","age":25}]',
      output: 'name,age\nJohn,30\nJane,25',
    },
  ],
  faqs: [
    {
      question: 'Does it handle nested objects?',
      answer:
        'No, objects must be flat (no nested objects or arrays). Nested values are converted to "[object Object]".',
    },
    {
      question: 'How are special characters handled?',
      answer:
        'Values containing the delimiter, quotes, or newlines are properly quoted and escaped.',
    },
  ],
  relatedTools: ['json-formatter', 'json-minifier', 'hex-rgb'],
  transform: (input, options) => {
    const sep = options?.separator ?? ',';
    const delimiter = sep === 'tab' ? '\t' : String(sep);
    const includeHeader = options?.includeHeader !== false;
    try {
      const data = JSON.parse(input);
      if (!Array.isArray(data)) {
        return { output: '', error: 'Input must be a JSON array' };
      }
      const csv = jsonToCsv(data, delimiter);
      if (!includeHeader) {
        const lines = csv.split('\n');
        return { output: lines.slice(1).join('\n') };
      }
      return { output: csv };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Conversion failed';
      return { output: '', error: msg };
    }
  },
};

export default jsonToCsvTool;
