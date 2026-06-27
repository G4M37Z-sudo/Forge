import type { ToolConfig } from '@/lib/types';

function uuidV4(): string {
  const hex = '0123456789abcdef';
  let uuid = '';
  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid += '-';
    } else if (i === 14) {
      uuid += '4';
    } else if (i === 19) {
      uuid += hex[(Math.random() * 4) | 8];
    } else {
      uuid += hex[(Math.random() * 16) | 0];
    }
  }
  return uuid;
}

const uuid: ToolConfig = {
  id: 'uuid-generator',
  name: 'UUID Generator',
  slug: 'uuid',
  category: 'generators',
  description:
    'Generate random UUIDs (v4 by default). Use for unique identifiers, database keys, and session tokens.',
  icon: 'Fingerprint',
  inputLabel: '(count)',
  outputLabel: 'Generated UUIDs',
  options: [
    {
      id: 'count',
      label: 'Number of UUIDs',
      type: 'number',
      default: 1,
    },
    {
      id: 'uppercase',
      label: 'Uppercase',
      type: 'toggle',
      default: false,
    },
  ],
  examples: [
    {
      title: 'Single UUID',
      input: '',
      output: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    },
    {
      title: 'Three UUIDs',
      input: '',
      output: 'f47ac10b-58cc-4372-a567-0e02b2c3d479\na1b2c3d4-5678-9012-abcd-ef3456789012\n12345678-abcd-ef12-3456-789012345678',
    },
  ],
  faqs: [
    {
      question: 'How random are these UUIDs?',
      answer:
        'They use Math.random(), which is not cryptographically secure. For security-sensitive keys, use crypto.randomUUID().',
    },
    {
      question: 'Can it generate UUID v1?',
      answer:
        'This tool generates v4 (random) UUIDs only. v1 requires MAC address and timestamp, which are not available in this context.',
    },
  ],
  relatedTools: ['password-generator', 'random-number', 'hash-generator'],
  transform: (_input, options) => {
    try {
      const parsedCount = parseInt(String(options?.count ?? '1'), 10);
      const count = Math.min(Math.max(isNaN(parsedCount) ? 1 : parsedCount, 1), 100);
      const uppercase = options?.uppercase === true;
      const uuids: string[] = [];
      for (let i = 0; i < count; i++) {
        uuids.push(uppercase ? uuidV4().toUpperCase() : uuidV4());
      }
      return { output: uuids.join('\n') };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Generation failed';
      return { output: '', error: msg };
    }
  },
};

export default uuid;
