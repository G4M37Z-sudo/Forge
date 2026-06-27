import type { ToolConfig } from '@/lib/types';

function formatXml(xml: string, indent: string): string {
  const PADDING = indent;
  const reg = /(>)(<)(\/*)/g;
  const formatted = xml.replace(reg, '$1\r\n$2$3');
  let pad = 0;
  const lines = formatted.split('\r\n');
  const result: string[] = [];
  for (const line of lines) {
    let indentDelta = 0;
    if (line.match(/.+<\/\w[^>]*>$/)) {
      indentDelta = 0;
    } else if (line.match(/^<\/\w/) && pad > 0) {
      indentDelta = -1;
    } else if (line.match(/^<\w([^>]*[^/])?>.*$/)) {
      indentDelta = 1;
    } else {
      indentDelta = 0;
    }
    const padding = PADDING.repeat(Math.max(0, pad));
    result.push(padding + line);
    pad += indentDelta;
  }
  return result.join('\r\n').trim();
}

const xmlFormatter: ToolConfig = {
  id: 'xml-formatter',
  name: 'XML Formatter',
  slug: 'xml-formatter',
  category: 'formatters',
  description:
    'Pretty-print XML with configurable indentation. Use to make minified XML readable.',
  icon: 'FileCode2',
  inputLabel: 'XML Input',
  outputLabel: 'Formatted XML',
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
      ],
    },
  ],
  examples: [
    {
      title: 'Format XML',
      input: '<root><child><nested>value</nested></child></root>',
      output: '<root>\n  <child>\n    <nested>value</nested>\n  </child>\n</root>',
    },
  ],
  faqs: [
    {
      question: 'Does it validate XML?',
      answer:
        'No, it only formats. Malformed XML may produce unexpected output.',
    },
    {
      question: 'Does it handle CDATA?',
      answer: 'CDATA sections are preserved as-is during formatting.',
    },
  ],
  relatedTools: ['json-formatter', 'yaml-formatter', 'html-encode'],
  transform: (input, options) => {
    const indent = options?.indent ?? '2';
    const space = indent === 'tab' ? '\t' : ' '.repeat(parseInt(String(indent), 10) || 2);
    try {
      return { output: formatXml(input, space) };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Formatting failed';
      return { output: '', error: msg };
    }
  },
};

export default xmlFormatter;
