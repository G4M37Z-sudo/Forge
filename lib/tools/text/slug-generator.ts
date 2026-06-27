import type { ToolConfig } from '@/lib/types';

const slugGenerator: ToolConfig = {
  id: 'slug-generator',
  name: 'Slug Generator',
  slug: 'slug-generator',
  category: 'text',
  description:
    'Convert any text into a URL-friendly slug. Use for generating SEO-friendly URLs from titles.',
  icon: 'Link',
  inputLabel: 'Text',
  outputLabel: 'Slug',
  examples: [
    {
      title: 'Blog post title',
      input: 'Hello World! This is My First Post.',
      output: 'hello-world-this-is-my-first-post',
    },
    {
      title: 'Title with special chars',
      input: "What's New in React 18?",
      output: 'whats-new-in-react-18',
    },
  ],
  faqs: [
    {
      question: 'Does it handle Unicode?',
      answer:
        'Non-ASCII characters are transliterated to ASCII approximations when possible.',
    },
    {
      question: 'Are numbers preserved?',
      answer: 'Yes, digits 0-9 are kept in the slug.',
    },
  ],
  relatedTools: ['case-converter', 'reverse-text', 'url-encode'],
  transform: (input) => {
    try {
      if (!input.trim()) return { output: '', error: 'Please enter some input' };
      const slug = input
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/[\s]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      return { output: slug };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Slug generation failed';
      return { output: '', error: msg };
    }
  },
};

export default slugGenerator;
