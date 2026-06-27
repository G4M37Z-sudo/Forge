import type { ToolConfig } from '@/lib/types';

function lineDiff(a: string, b: string): string {
  const linesA = a.split('\n');
  const linesB = b.split('\n');
  const maxLen = Math.max(linesA.length, linesB.length);
  const result: string[] = [];
  for (let i = 0; i < maxLen; i++) {
    const la = linesA[i] ?? '';
    const lb = linesB[i] ?? '';
    if (la === lb) {
      result.push(`  ${la}`);
    } else {
      if (i < linesA.length) result.push(`- ${la}`);
      if (i < linesB.length) result.push(`+ ${lb}`);
    }
  }
  return result.join('\n');
}

const textDiff: ToolConfig = {
  id: 'text-diff',
  name: 'Text Diff Checker',
  slug: 'text-diff',
  category: 'text',
  description:
    'Compare two texts line-by-line and show additions and deletions.',
  icon: 'Diff',
  inputLabel: 'Original Text',
  outputLabel: 'Diff Output',
  examples: [
    {
      title: 'Simple addition',
      input: 'line1\nline2',
      output: '  line1\n  line2\n+ line3',
    },
    {
      title: 'Line change',
      input: 'hello',
      output: '- hello\n+ world',
    },
  ],
  faqs: [
    {
      question: 'Should I paste the new text in options?',
      answer:
        'Yes, the tool compares the main input with the "compareWith" option value.',
    },
    {
      question: 'Does it do character-level diff?',
      answer:
        'No, this is a line-level diff. Each line is treated as a single unit.',
    },
  ],
  relatedTools: ['word-counter', 'reverse-text', 'case-converter'],
  transform: (input, options) => {
    try {
      if (!input.trim()) return { output: '', error: 'Please enter some input' };
      const compareWith = String(options?.compareWith ?? '');
      return { output: lineDiff(compareWith, input) };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Diff failed';
      return { output: '', error: msg };
    }
  },
};

export default textDiff;
