import type { ToolConfig } from '@/lib/types';

const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
const SYMBOLS = '!@#$%^&*()-_=+[]{}|;:,.<>?';

const password: ToolConfig = {
  id: 'password-generator',
  name: 'Password Generator',
  slug: 'password',
  category: 'generators',
  description:
    'Generate random passwords with configurable length and character types. Use for creating strong user passwords or API keys.',
  icon: 'KeyRound',
  inputLabel: '(options)',
  outputLabel: 'Generated Password',
  options: [
    {
      id: 'length',
      label: 'Length',
      type: 'number',
      default: 16,
    },
    {
      id: 'lowercase',
      label: 'Lowercase (a-z)',
      type: 'toggle',
      default: true,
    },
    {
      id: 'uppercase',
      label: 'Uppercase (A-Z)',
      type: 'toggle',
      default: true,
    },
    {
      id: 'digits',
      label: 'Digits (0-9)',
      type: 'toggle',
      default: true,
    },
    {
      id: 'symbols',
      label: 'Symbols (!@#$...)',
      type: 'toggle',
      default: true,
    },
  ],
  examples: [
    {
      title: 'Default 16-char password',
      input: '',
      output: 'kR7$mP2!xQ9&nL4@',
    },
    {
      title: 'Long alphanumeric',
      input: '',
      output: 'aB3kR7mP2xQ9nL4w',
    },
  ],
  faqs: [
    {
      question: 'Is this cryptographically secure?',
      answer:
        'It uses Math.random() which is not cryptographically secure. For production secrets, use a CSPRNG.',
    },
    {
      question: 'What is the maximum length?',
      answer: 'Up to 256 characters.',
    },
  ],
  relatedTools: ['uuid-generator', 'hash-generator', 'random-number'],
  transform: (_input, options) => {
    try {
      const parsedLen = parseInt(String(options?.length ?? '16'), 10);
      const length = Math.min(Math.max(isNaN(parsedLen) ? 16 : parsedLen, 1), 256);
      let charset = '';
      if (options?.lowercase !== false) charset += LOWER;
      if (options?.uppercase !== false) charset += UPPER;
      if (options?.digits !== false) charset += DIGITS;
      if (options?.symbols !== false) charset += SYMBOLS;
      if (charset === '') charset = LOWER;
      let result = '';
      for (let i = 0; i < length; i++) {
        result += charset[(Math.random() * charset.length) | 0];
      }
      return { output: result };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Generation failed';
      return { output: '', error: msg };
    }
  },
};

export default password;
