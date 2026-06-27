import type { ToolConfig } from '@/lib/types';

const timestamp: ToolConfig = {
  id: 'timestamp',
  name: 'Unix Timestamp Converter',
  slug: 'timestamp',
  category: 'converters',
  description:
    'Convert between Unix timestamps and ISO 8601 date-time strings. Use for debugging time-based APIs.',
  icon: 'Clock',
  inputLabel: 'Timestamp or Date',
  outputLabel: 'Converted Time',
  options: [
    {
      id: 'direction',
      label: 'Direction',
      type: 'select',
      default: 'auto',
      options: [
        { label: 'Auto-detect', value: 'auto' },
        { label: 'Timestamp → ISO', value: 'toIso' },
        { label: 'ISO → Timestamp', value: 'toUnix' },
      ],
    },
  ],
  examples: [
    {
      title: 'Unix to ISO',
      input: '1700000000',
      output: 'ISO: 2023-11-14T22:13:20.000Z\nDate: Tue, 14 Nov 2023 22:13:20 GMT\nLocal: (local date string)',
    },
    {
      title: 'ISO to Unix',
      input: '2023-11-14T22:13:20.000Z',
      output: 'Unix: 1700000000\nUnix (ms): 1700000000000',
    },
  ],
  faqs: [
    {
      question: 'Does it support milliseconds?',
      answer:
        'Yes. Values above 1e12 are interpreted as millisecond timestamps.',
    },
    {
      question: 'What timezones are supported?',
      answer:
        'Unix timestamps are always UTC. ISO strings can include timezone offsets.',
    },
  ],
  relatedTools: ['hex-rgb', 'json-to-csv', 'case-converter'],
  transform: (input, options) => {
    const trimmed = input.trim();
    if (!trimmed) return { output: '', error: 'Input is empty' };
    const dir = String(options?.direction ?? 'auto');
    if (dir === 'toIso' || (dir === 'auto' && /^\d+$/.test(trimmed))) {
      const ts = parseInt(trimmed, 10);
      const ms = ts > 1e12 ? ts : ts * 1000;
      const d = new Date(ms);
      if (isNaN(d.getTime())) return { output: '', error: 'Invalid timestamp' };
      return {
        output: `ISO: ${d.toISOString()}\nDate: ${d.toUTCString()}\nLocal: ${d.toString()}\nUnix (seconds): ${Math.floor(ms / 1000)}\nUnix (ms): ${ms}`,
      };
    } else {
      const d = new Date(trimmed);
      if (isNaN(d.getTime())) return { output: '', error: 'Invalid date string' };
      const ms = d.getTime();
      return {
        output: `Unix (seconds): ${Math.floor(ms / 1000)}\nUnix (ms): ${ms}\nISO: ${d.toISOString()}\nDate: ${d.toUTCString()}`,
      };
    }
  },
};

export default timestamp;
