import type { ToolConfig } from '@/lib/types';

const jsonEscape: ToolConfig = {
  id: 'json-escape',
  name: 'JSON Escape / Unescape',
  slug: 'json-escape',
  category: 'crypto',
  description: 'Escape special characters for safe JSON inclusion or unescape a JSON-escaped string.',
  icon: 'FileJson2',
  inputLabel: 'Text',
  outputLabel: 'Result',
  options: [
    { id: 'mode', label: 'Mode', type: 'select', default: 'escape', options: [
      { label: 'Escape for JSON', value: 'escape' },
      { label: 'Unescape from JSON', value: 'unescape' },
    ]},
  ],
  relatedTools: ['json-formatter', 'json-minifier', 'jwt-decoder'],
  transform: (input, options) => {
    try {
      if (!input.trim()) return { output: '', error: 'Please enter some input' };
      const mode = String(options?.mode ?? 'escape');
      if (mode === 'escape') {
        const escaped = JSON.stringify(input);
        return { output: escaped.slice(1, -1) };
      } else {
        // Unescape: wrap in quotes and use JSON.parse which handles all standard escapes
        try {
          const quoted = '"' + input + '"';
          const parsed = JSON.parse(quoted);
          return { output: String(parsed) };
        } catch {
          return { output: '', error: 'Invalid escaped JSON string' };
        }
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Processing failed';
      return { output: '', error: msg };
    }
  },
};

export default jsonEscape;
