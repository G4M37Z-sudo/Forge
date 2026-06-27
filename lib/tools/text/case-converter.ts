import type { ToolConfig } from '@/lib/types';

const caseConverter: ToolConfig = {
  id: 'case-converter',
  name: 'Case Converter',
  slug: 'case-converter',
  category: 'text',
  description:
    'Convert text between camelCase, PascalCase, snake_case, kebab-case, UPPER, and lower.',
  icon: 'CaseSensitive',
  inputLabel: 'Input Text',
  outputLabel: 'Converted Text',
  options: [
    {
      id: 'target',
      label: 'Target Case',
      type: 'select',
      default: 'camel',
      options: [
        { label: 'camelCase', value: 'camel' },
        { label: 'PascalCase', value: 'pascal' },
        { label: 'snake_case', value: 'snake' },
        { label: 'kebab-case', value: 'kebab' },
        { label: 'UPPER CASE', value: 'upper' },
        { label: 'lower case', value: 'lower' },
        { label: 'CONSTANT_CASE', value: 'constant' },
      ],
    },
  ],
  examples: [
    {
      title: 'to camelCase',
      input: 'hello world example',
      output: 'helloWorldExample',
    },
    {
      title: 'to snake_case',
      input: 'HelloWorldExample',
      output: 'hello_world_example',
    },
    {
      title: 'to kebab-case',
      input: 'Hello World Example',
      output: 'hello-world-example',
    },
  ],
  faqs: [
    {
      question: 'How does it split words?',
      answer:
        'It splits on spaces, hyphens, underscores, and camelCase boundaries.',
    },
    {
      question: 'Does it handle acronyms?',
      answer:
        'Acronyms stay together. "HTTPResponse" becomes "http_response" in snake_case.',
    },
  ],
  relatedTools: ['slug-generator', 'reverse-text', 'word-counter'],
  transform: (input, options) => {
    try {
      if (!input.trim()) return { output: '', error: 'Please enter some input' };
      const target = String(options?.target ?? 'camel');
      const words = input
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[-_]+/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 0);
      if (words.length === 0) return { output: '' };
      let result = '';
      switch (target) {
        case 'camel':
          result = words[0].toLowerCase() + words.slice(1).map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
          break;
        case 'pascal':
          result = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
          break;
        case 'snake':
          result = words.map((w) => w.toLowerCase()).join('_');
          break;
        case 'kebab':
          result = words.map((w) => w.toLowerCase()).join('-');
          break;
        case 'upper':
          result = input.toUpperCase();
          break;
        case 'lower':
          result = input.toLowerCase();
          break;
        case 'constant':
          result = words.map((w) => w.toUpperCase()).join('_');
          break;
        default:
          result = input;
      }
      return { output: result };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Conversion failed';
      return { output: '', error: msg };
    }
  },
};

export default caseConverter;
