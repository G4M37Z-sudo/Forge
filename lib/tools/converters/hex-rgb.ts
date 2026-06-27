import type { ToolConfig } from '@/lib/types';

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleaned = hex.replace('#', '').trim();
  let full = '';
  if (cleaned.length === 3) {
    full = cleaned.split('').map((c) => c + c).join('');
  } else if (cleaned.length === 6) {
    full = cleaned;
  } else {
    return null;
  }
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break;
      case gn: h = ((bn - rn) / d + 2) / 6; break;
      case bn: h = ((rn - gn) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const hn = (h % 360) / 360;
  const sn = s / 100;
  const ln = l / 100;
  if (sn === 0) {
    const v = Math.round(ln * 255);
    return { r: v, g: v, b: v };
  }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;
  return {
    r: Math.round(hue2rgb(p, q, hn + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, hn) * 255),
    b: Math.round(hue2rgb(p, q, hn - 1 / 3) * 255),
  };
}

const hexRgb: ToolConfig = {
  id: 'hex-rgb',
  name: 'Color Converter',
  slug: 'hex-rgb',
  category: 'converters',
  description:
    'Convert colors between HEX, RGB, and HSL formats. Use for CSS color manipulation.',
  icon: 'Palette',
  inputLabel: 'Color Value',
  outputLabel: 'Converted Colors',
  options: [
    {
      id: 'fromFormat',
      label: 'Input Format',
      type: 'select',
      default: 'auto',
      options: [
        { label: 'Auto-detect', value: 'auto' },
        { label: 'HEX', value: 'hex' },
        { label: 'RGB', value: 'rgb' },
        { label: 'HSL', value: 'hsl' },
      ],
    },
  ],
  examples: [
    {
      title: 'HEX to RGB',
      input: '#ff5733',
      output: 'HEX: #ff5733\nRGB: rgb(255, 87, 51)\nHSL: hsl(11, 100%, 60%)',
    },
    {
      title: 'RGB to HEX',
      input: 'rgb(255, 87, 51)',
      output: 'HEX: #ff5733\nRGB: rgb(255, 87, 51)\nHSL: hsl(11, 100%, 60%)',
    },
  ],
  faqs: [
    {
      question: 'What formats are supported?',
      answer: 'HEX (#fff, #ffffff), RGB (rgb(r, g, b)), and HSL (hsl(h, s%, l%)).',
    },
    {
      question: 'Does it support alpha channels?',
      answer: 'No, this tool handles 6-digit HEX, RGB, and HSL without alpha.',
    },
  ],
  relatedTools: ['timestamp', 'json-to-csv', 'case-converter'],
  transform: (input, options) => {
    const trimmed = input.trim();
    if (!trimmed) return { output: '', error: 'Input is empty' };
    const fmt = String(options?.fromFormat ?? 'auto');
    let r = 0, g = 0, b = 0;
    if (fmt === 'hex' || (fmt === 'auto' && trimmed.startsWith('#'))) {
      const rgb = hexToRgb(trimmed);
      if (!rgb) return { output: '', error: 'Invalid HEX color' };
      r = rgb.r; g = rgb.g; b = rgb.b;
    } else if (fmt === 'rgb' || (fmt === 'auto' && trimmed.toLowerCase().startsWith('rgb'))) {
      const m = trimmed.match(/(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/);
      if (!m) return { output: '', error: 'Invalid RGB color' };
      r = parseInt(m[1], 10); g = parseInt(m[2], 10); b = parseInt(m[3], 10);
    } else if (fmt === 'hsl' || (fmt === 'auto' && trimmed.toLowerCase().startsWith('hsl'))) {
      const m = trimmed.match(/(\d{1,3})\s*,\s*(\d{1,3})%?\s*,\s*(\d{1,3})%?/);
      if (!m) return { output: '', error: 'Invalid HSL color' };
      const rgb2 = hslToRgb(parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10));
      r = rgb2.r; g = rgb2.g; b = rgb2.b;
    } else {
      return { output: '', error: 'Could not detect format' };
    }
    const hex = rgbToHex(r, g, b);
    const hsl = rgbToHsl(r, g, b);
    return {
      output: `HEX: ${hex}\nRGB: rgb(${r}, ${g}, ${b})\nHSL: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
    };
  },
};

export default hexRgb;
