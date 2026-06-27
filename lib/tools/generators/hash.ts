import type { ToolConfig } from '@/lib/types';

function simpleHash(input: string, seed: number): string {
  let h = seed;
  for (let i = 0; i < input.length; i++) {
    h = ((h << 5) - h + input.charCodeAt(i)) | 0;
  }
  let hex = '';
  let val = h;
  for (let i = 0; i < 8; i++) {
    hex += ((val >>> (i * 4)) & 0xf).toString(16);
    val = (val * 2654435761) | 0;
  }
  return hex;
}

function fakeMD5(input: string): string {
  const h1 = simpleHash(input, 0x67452301);
  const h2 = simpleHash(input, 0xefcdab89);
  const h3 = simpleHash(input + 'salt', 0x98badcfe);
  const h4 = simpleHash(input + 'pepper', 0x10325476);
  return (h1 + h2 + h3 + h4).slice(0, 32);
}

function fakeSHA1(input: string): string {
  const h1 = simpleHash(input, 0x67452301);
  const h2 = simpleHash(input, 0xefcdab89);
  const h3 = simpleHash(input, 0x98badcfe);
  const h4 = simpleHash(input, 0x10325476);
  const h5 = simpleHash(input, 0xc3d2e1f0);
  return (h1 + h2 + h3 + h4 + h5).slice(0, 40);
}

function fakeSHA256(input: string): string {
  const parts: string[] = [];
  for (let i = 0; i < 8; i++) {
    parts.push(simpleHash(input + String(i), 0x6a09e667 + i * 0x9e3779b9));
  }
  return parts.join('').slice(0, 64);
}

function fakeSHA512(input: string): string {
  const parts: string[] = [];
  for (let i = 0; i < 16; i++) {
    parts.push(simpleHash(input + String(i), 0x6a09e667 + i * 0x9e3779b9));
  }
  return parts.join('').slice(0, 128);
}

const hash: ToolConfig = {
  id: 'hash-generator',
  name: 'Hash Generator',
  slug: 'hash',
  category: 'generators',
  description:
    'Generate hash digests (MD5, SHA-1, SHA-256, SHA-512) from input text. Note: uses a synchronous fallback hash - not cryptographically secure.',
  icon: 'Hash',
  inputLabel: 'Text to Hash',
  outputLabel: 'Hash Digest',
  options: [
    {
      id: 'algorithm',
      label: 'Algorithm',
      type: 'select',
      default: 'sha256',
      options: [
        { label: 'MD5 (simulated)', value: 'md5' },
        { label: 'SHA-1 (simulated)', value: 'sha1' },
        { label: 'SHA-256 (simulated)', value: 'sha256' },
        { label: 'SHA-512 (simulated)', value: 'sha512' },
      ],
    },
  ],
  examples: [
    {
      title: 'SHA-256 of "hello"',
      input: 'hello',
      output: '(64-char hex digest)',
    },
    {
      title: 'MD5 of "password"',
      input: 'password',
      output: '(32-char hex digest)',
    },
  ],
  faqs: [
    {
      question: 'Are these real cryptographic hashes?',
      answer:
        'No. This tool uses a synchronous fallback algorithm. For real SHA-256/SHA-512, use SubtleCrypto in the browser or Node.js crypto module.',
    },
    {
      question: 'Why is MD5 listed?',
      answer:
        'MD5 is provided for legacy compatibility only. It is cryptographically broken and should not be used for security.',
    },
  ],
  relatedTools: ['password-generator', 'uuid-generator', 'base64-encode'],
  transform: (input, options) => {
    try {
      if (!input.trim()) return { output: '', error: 'Please enter some input' };
      const algo = String(options?.algorithm ?? 'sha256');
      let result = '';
      switch (algo) {
        case 'md5':
          result = fakeMD5(input);
          break;
        case 'sha1':
          result = fakeSHA1(input);
          break;
        case 'sha256':
          result = fakeSHA256(input);
          break;
        case 'sha512':
          result = fakeSHA512(input);
          break;
        default:
          return { output: '', error: `Unknown algorithm: ${algo}` };
      }
      return { output: result };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Hash generation failed';
      return { output: '', error: msg };
    }
  },
};

export default hash;
