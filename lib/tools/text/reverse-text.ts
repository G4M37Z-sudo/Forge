import type { ToolConfig } from '@/lib/types';

const reverseText: ToolConfig = {
  id: 'reverse-text',
  name: 'Reverse Text',
  slug: 'reverse-text',
  category: 'text',
  description:
    'Reverse text at character or word level. Use for string manipulation experiments.',
  icon: 'ArrowLeftRight',
  inputLabel: 'Text',
  outputLabel: 'Reversed',
  options: [
    {
      id: 'mode',
      label: 'Mode',
      type: 'select',
      default: 'character',
      options: [
        { label: 'Character level', value: 'character' },
        { label: 'Word level', value: 'word' },
      ],
    },
  ],
  examples: [
    {
      title: 'Reverse characters',
      input: 'Hello, World!',
      output: '!dlroW ,olleH',
    },
    {
      title: 'Reverse words',
      input: 'Hello, World!',
      output: 'World! Hello,',
    },
  ],
  faqs: [
    {
      question: 'What is the difference between modes?',
      answer:
        'Character mode reverses every character. Word mode reverses the order of words but keeps each word intact.',
    },
    {
      question: 'Does it handle multi-byte characters?',
      answer:
        'Character-level reversal uses spread syntax to correctly handle surrogate pairs (emoji, etc.).',
    },
  ],
  relatedTools: ['case-converter', 'text-diff', 'word-counter'],
  transform: (input, options) => {
    try {
      if (!input.trim()) return { output: '', error: 'Please enter some input' };
      const mode = String(options?.mode ?? 'character');
      if (mode === 'word') {
        return { output: input.split(/\s+/).reverse().join(' ') };
      }
      return { output: [...input].reverse().join('') };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Reversal failed';
      return { output: '', error: msg };
    }
  },
};

export default reverseText;
