import type { ToolConfig } from '@/lib/types';

const urlValidator: ToolConfig = {
  id: 'url-validator',
  name: 'URL Validator',
  slug: 'url-validator',
  category: 'validation',
  description:
    'Validate URLs including protocol, host, and common schemes (http, https, ftp, ws).',
  icon: 'Globe',
  inputLabel: 'URL',
  outputLabel: 'Validation Result',
  examples: [
    {
      title: 'Valid HTTPS URL',
      input: 'https://example.com/path?query=1',
      output: '✓ Valid URL (https://example.com/path?query=1)',
    },
    {
      title: 'Missing scheme',
      input: 'example.com',
      output: '✗ Invalid URL: scheme is required (https://...)',
    },
  ],
  faqs: [
    {
      question: 'Which protocols are supported?',
      answer: 'http, https, ftp, ftps, ws, wss, file.',
    },
    {
      question: 'Does it require a protocol?',
      answer:
        'Yes, a scheme is required. "example.com" without https:// is considered invalid.',
    },
  ],
  relatedTools: ['email-validator', 'regex-tester', 'url-encode'],
  transform: (input) => {
    const trimmed = input.trim();
    if (!trimmed) return { output: '', error: 'Input is empty' };
    const schemes = ['http', 'https', 'ftp', 'ftps', 'ws', 'wss', 'file'];
    let testUrl = trimmed;
    if (!schemes.some((s) => trimmed.startsWith(s + '://'))) {
      testUrl = 'https://' + trimmed;
    }
    try {
      const url = new URL(testUrl);
      const isValid = schemes.includes(url.protocol.replace(':', ''));
      if (isValid && url.hostname) {
        return { output: `✓ Valid URL (${trimmed})` };
      }
      return { output: '', error: '✗ Invalid URL: could not parse' };
    } catch {
      return { output: '', error: '✗ Invalid URL: scheme is required (https://...)' };
    }
  },
};

export default urlValidator;
