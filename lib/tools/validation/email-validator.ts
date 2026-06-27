import type { ToolConfig } from '@/lib/types';

const emailValidator: ToolConfig = {
  id: 'email-validator',
  name: 'Email Validator',
  slug: 'email-validator',
  category: 'validation',
  description:
    'Validate email addresses using a practical regex. Use for quick client-side validation checks.',
  icon: 'Mail',
  inputLabel: 'Email Address',
  outputLabel: 'Validation Result',
  examples: [
    {
      title: 'Valid email',
      input: 'user@example.com',
      output: '✓ Valid email address',
    },
    {
      title: 'Invalid email',
      input: 'not-an-email',
      output: '✗ Invalid email address',
    },
  ],
  faqs: [
    {
      question: 'How accurate is regex email validation?',
      answer:
        'This uses a practical regex that covers 99% of cases. Full RFC 5322 compliance requires a much more complex parser.',
    },
    {
      question: 'Does it check if the domain exists?',
      answer:
        'No, this only validates the syntax. DNS lookup would be needed to check if the domain exists.',
    },
  ],
  relatedTools: ['url-validator', 'regex-tester', 'slug-generator'],
  transform: (input) => {
    const trimmed = input.trim();
    if (!trimmed) return { output: '', error: 'Input is empty' };
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (re.test(trimmed)) {
      return { output: '✓ Valid email address' };
    }
    return { output: '', error: '✗ Invalid email address' };
  },
};

export default emailValidator;
