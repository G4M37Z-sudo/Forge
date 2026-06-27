import type { ToolConfig } from '@/lib/types';

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur',
  'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor',
  'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna',
  'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis',
  'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi',
  'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis',
  'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur',
  'excepteur', 'sint', 'occaecat', 'cupidatat', 'non',
  'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt',
  'mollit', 'anim', 'id', 'est',
];

function generateLoremParagraph(): string {
  const sentenceCount = 3 + ((Math.random() * 4) | 0);
  const sentences: string[] = [];
  for (let s = 0; s < sentenceCount; s++) {
    const wordCount = 8 + ((Math.random() * 10) | 0);
    const words: string[] = [];
    for (let w = 0; w < wordCount; w++) {
      words.push(LOREM_WORDS[(Math.random() * LOREM_WORDS.length) | 0]);
    }
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    sentences.push(words.join(' ') + '.');
  }
  return sentences.join(' ');
}

const loremIpsum: ToolConfig = {
  id: 'lorem-ipsum',
  name: 'Lorem Ipsum Generator',
  slug: 'lorem-ipsum',
  category: 'generators',
  description:
    'Generate placeholder Lorem Ipsum text. Use for mocking up layouts and testing typography.',
  icon: 'Type',
  inputLabel: '(count)',
  outputLabel: 'Lorem Ipsum',
  options: [
    {
      id: 'paragraphs',
      label: 'Paragraphs',
      type: 'number',
      default: 3,
    },
  ],
  examples: [
    {
      title: 'One paragraph',
      input: '',
      output: 'Lorem ipsum dolor sit amet...',
    },
    {
      title: 'Three paragraphs',
      input: '',
      output: 'Lorem ipsum...\n\nDolor sit...\n\nAmet consectetur...',
    },
  ],
  faqs: [
    {
      question: 'Can I customize the words?',
      answer:
        'This tool uses the standard Lorem Ipsum vocabulary. For custom content, use a template generator.',
    },
    {
      question: 'What is the maximum paragraph count?',
      answer: 'Up to 50 paragraphs.',
    },
  ],
  relatedTools: ['password-generator', 'uuid-generator', 'random-number'],
  transform: (_input, options) => {
    try {
      const parsedCount = parseInt(String(options?.paragraphs ?? '3'), 10);
      const count = Math.min(Math.max(isNaN(parsedCount) ? 3 : parsedCount, 1), 50);
      const paragraphs: string[] = [];
      for (let i = 0; i < count; i++) {
        paragraphs.push(generateLoremParagraph());
      }
      return { output: paragraphs.join('\n\n') };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Generation failed';
      return { output: '', error: msg };
    }
  },
};

export default loremIpsum;
