import type { ToolConfig } from '@/lib/types';

const wordCounter: ToolConfig = {
  id: 'word-counter',
  name: 'Word Counter',
  slug: 'word-counter',
  category: 'text',
  description:
    'Count words, characters, lines, and sentences in a text. Use for content length analysis.',
  icon: 'Hash',
  inputLabel: 'Text to Analyze',
  outputLabel: 'Statistics',
  inputType: 'text',
  outputType: 'text',
  examples: [
    {
      title: 'Short text',
      input: 'Hello world. This is a test.',
      output: 'Words: 6\nCharacters: 26 (with spaces)\nCharacters: 21 (without spaces)\nLines: 1\nSentences: 2',
    },
    {
      title: 'Multi-line',
      input: 'First line here.\nSecond line here.',
      output: 'Words: 6\nCharacters: 30 (with spaces)\nCharacters: 25 (without spaces)\nLines: 2\nSentences: 2',
    },
  ],
  faqs: [
    {
      question: 'How are words counted?',
      answer:
        'Words are split by whitespace. Punctuation attached to words counts as part of the word.',
    },
    {
      question: 'How are sentences detected?',
      answer: 'Sentences are counted by splitting on . ! ? followed by whitespace or end of string.',
    },
  ],
  relatedTools: ['case-converter', 'text-diff', 'reverse-text'],
  transform: (input) => {
    try {
      if (!input.trim()) {
        return {
          output:
            'Words: 0\nCharacters: 0 (with spaces)\nCharacters: 0 (without spaces)\nLines: 0\nSentences: 0',
        };
      }
      const words = input.split(/\s+/).filter((w) => w.length > 0).length;
      const charsWith = input.length;
      const charsWithout = input.replace(/\s/g, '').length;
      const lines = input.split('\n').length;
      const sentences = (input.match(/[.!?]+(?=\s|$)/g) || []).length;
      return {
        output: `Words: ${words}\nCharacters: ${charsWith} (with spaces)\nCharacters: ${charsWithout} (without spaces)\nLines: ${lines}\nSentences: ${sentences}`,
      };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Counting failed';
      return { output: '', error: msg };
    }
  },
};

export default wordCounter;
