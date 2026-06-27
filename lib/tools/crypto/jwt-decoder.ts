import type { ToolConfig } from '@/lib/types';

const jwtDecoder: ToolConfig = {
  id: 'jwt-decoder',
  name: 'JWT Decoder',
  slug: 'jwt-decoder',
  category: 'crypto',
  description:
    'Decode a JSON Web Token to view its header, payload, and signature info. Use for debugging JWTs.',
  icon: 'Lock',
  inputLabel: 'JWT Token',
  outputLabel: 'Decoded JWT',
  inputType: 'code',
  outputType: 'code',
  examples: [
    {
      title: 'Decode a JWT',
      input: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      output: '{\n  "header": { "alg": "HS256", "typ": "JWT" },\n  "payload": { "sub": "1234567890", "name": "John Doe", "iat": 1516239022 },\n  "signature": "SflKxwRJ...4fwpMeJf36POk6yJV_adQssw5c"\n}',
    },
  ],
  faqs: [
    {
      question: 'Does it verify the signature?',
      answer:
        'No, this tool only decodes. Signature verification requires the secret key.',
    },
    {
      question: 'What if the JWT is invalid?',
      answer:
        'Malformed tokens (wrong segment count, invalid base64, invalid JSON) will produce an error.',
    },
  ],
  relatedTools: ['json-escape', 'base64-decode', 'hash-generator'],
  transform: (input) => {
    const trimmed = input.trim();
    if (!trimmed) return { output: '', error: 'Input is empty' };
    const parts = trimmed.split('.');
    if (parts.length !== 3) {
      return { output: '', error: 'JWT must have 3 parts separated by dots' };
    }
    try {
      const headerStr = parts[0];
      const payloadStr = parts[1];
      const sig = parts[2];
      const decodePart = (s: string): unknown => {
        const cleaned = s.replace(/-/g, '+').replace(/_/g, '/');
        const binary = atob(cleaned);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        return JSON.parse(new TextDecoder().decode(bytes));
      };
      const header = decodePart(headerStr);
      const payload = decodePart(payloadStr);
      const output = JSON.stringify(
        { header, payload, signature: sig },
        null,
        2
      );
      return { output };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Decoding failed';
      return { output: '', error: `Invalid JWT: ${msg}` };
    }
  },
};

export default jwtDecoder;
