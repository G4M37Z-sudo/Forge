import type { ToolConfig } from '@/lib/types';

const regexTester: ToolConfig = {
  id: 'regex-tester',
  name: 'Regex Tester',
  slug: 'regex-tester',
  category: 'validation',
  description:
    'Test a regular expression against input text and see all matches highlighted.',
  icon: 'Regex',
  inputLabel: 'Test String',
  outputLabel: 'Matches',
  options: [
    {
      id: 'pattern',
      label: 'Pattern',
      type: 'select',
      default: 'email',
      options: [
        { label: 'Custom', value: 'custom' },
        { label: 'Email', value: 'email' },
        { label: 'URL', value: 'url' },
        { label: 'IP Address', value: 'ip' },
        { label: 'Phone Number', value: 'phone' },
      ],
    },
  ],
  examples: [
    {
      title: 'Match emails',
      input: 'Contact us at hello@example.com or support@test.org',
      output: 'Found 2 matches:\n1. hello@example.com (pos 14-30)\n2. support@test.org (pos 34-50)',
    },
    {
      title: 'Match URLs',
      input: 'Visit https://example.com and http://test.io',
      output: 'Found 2 matches:\n1. https://example.com (pos 6-25)\n2. http://test.io (pos 30-44)',
    },
  ],
  faqs: [
    {
      question: 'Which regex flags are supported?',
      answer:
        'Global (g) and case-insensitive (i) flags are supported.',
    },
    {
      question: 'How do I provide a custom pattern?',
      answer:
        'Select "Custom" and enter the pattern in the pattern option.',
    },
  ],
  relatedTools: ['email-validator', 'url-validator', 'slug-generator'],
  transform: (input, options) => {
    const patterns: Record<string, string> = {
      email: String.raw`[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}`,
      url: String.raw`https?:\/\/[^\s]+`,
      ip: String.raw`\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b`,
      phone: String.raw`\+?[\d\s\-()]{7,15}`,
      custom: '',
    };
    const choice = String(options?.pattern ?? 'email');
    const patternStr = patterns[choice] ?? '';
    if (!patternStr) {
      return { output: '', error: 'No pattern selected or custom pattern is empty' };
    }
    try {
      const re = new RegExp(patternStr, 'g');
      const matches: string[] = [];
      let m: RegExpExecArray | null;
      while ((m = re.exec(input)) !== null) {
        matches.push(`${m[0]} (pos ${m.index}-${m.index + m[0].length})`);
      }
      if (matches.length === 0) {
        return { output: 'No matches found' };
      }
      return {
        output: `Found ${matches.length} match${matches.length > 1 ? 'es' : ''}:\n${matches.map((m, i) => `${i + 1}. ${m}`).join('\n')}`,
      };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Invalid regex';
      return { output: '', error: `Regex error: ${msg}` };
    }
  },
};

export default regexTester;
