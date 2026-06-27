import type { ToolConfig } from '@/lib/types';

const randomNumber: ToolConfig = {
  id: 'random-number',
  name: 'Random Number Generator',
  slug: 'random-number',
  category: 'generators',
  description:
    'Generate random integers within a specified range. Use for sampling, shuffling, or generating test data.',
  icon: 'Dices',
  inputLabel: '(options)',
  outputLabel: 'Random Numbers',
  options: [
    {
      id: 'min',
      label: 'Minimum',
      type: 'number',
      default: 1,
    },
    {
      id: 'max',
      label: 'Maximum',
      type: 'number',
      default: 100,
    },
    {
      id: 'count',
      label: 'Count',
      type: 'number',
      default: 1,
    },
  ],
  examples: [
    {
      title: 'Single number 1-100',
      input: '',
      output: '42',
    },
    {
      title: 'Five numbers 1-10',
      input: '',
      output: '3\n7\n1\n9\n4',
    },
  ],
  faqs: [
    {
      question: 'Are the bounds inclusive?',
      answer: 'Yes, both min and max are inclusive.',
    },
    {
      question: 'Is this cryptographically secure?',
      answer:
        'No, it uses Math.random(). For security-sensitive randomness, use crypto.getRandomValues().',
    },
  ],
  relatedTools: ['uuid-generator', 'password-generator', 'lorem-ipsum'],
  transform: (_input, options) => {
    try {
      const min = parseInt(String(options?.min ?? '1'), 10);
      const max = parseInt(String(options?.max ?? '100'), 10);
      const parsedCount = parseInt(String(options?.count ?? '1'), 10);
      const count = Math.min(Math.max(isNaN(parsedCount) ? 1 : parsedCount, 1), 1000);
      const lo = Math.min(min, max);
      const hi = Math.max(min, max);
      const numbers: number[] = [];
      for (let i = 0; i < count; i++) {
        numbers.push(lo + Math.floor(Math.random() * (hi - lo + 1)));
      }
      return { output: numbers.join('\n') };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Generation failed';
      return { output: '', error: msg };
    }
  },
};

export default randomNumber;
