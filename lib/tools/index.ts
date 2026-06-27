import type { ToolConfig, ToolConfigSerializable } from '@/lib/types';

import jsonFormatter from './json/formatter';
import jsonValidator from './json/validator';
import jsonMinifier from './json/minifier';
import jsonPrettifier from './json/prettifier';

import base64Encode from './encoding/base64-encode';
import base64Decode from './encoding/base64-decode';
import urlEncode from './encoding/url-encode';
import urlDecode from './encoding/url-decode';
import htmlEncode from './encoding/html-encode';
import htmlDecode from './encoding/html-decode';

import uuidGenerator from './generators/uuid';
import passwordGenerator from './generators/password';
import hashGenerator from './generators/hash';
import loremIpsum from './generators/lorem-ipsum';
import randomNumber from './generators/random-number';

import caseConverter from './text/case-converter';
import textDiff from './text/text-diff';
import wordCounter from './text/word-counter';
import slugGenerator from './text/slug-generator';
import reverseText from './text/reverse-text';

import xmlFormatter from './formatters/xml-formatter';
import yamlFormatter from './formatters/yaml-formatter';

import jwtDecoder from './crypto/jwt-decoder';
import jsonEscape from './crypto/json-escape';

import emailValidator from './validation/email-validator';
import urlValidator from './validation/url-validator';
import regexTester from './validation/regex-tester';

import hexRgb from './converters/hex-rgb';
import timestamp from './converters/timestamp';
import jsonToCsvConverter from './converters/json-to-csv';

export const tools: ToolConfig[] = [
  jsonFormatter, jsonValidator, jsonMinifier, jsonPrettifier,
  base64Encode, base64Decode, urlEncode, urlDecode, htmlEncode, htmlDecode,
  uuidGenerator, passwordGenerator, hashGenerator, loremIpsum, randomNumber,
  caseConverter, textDiff, wordCounter, slugGenerator, reverseText,
  xmlFormatter, yamlFormatter,
  jwtDecoder, jsonEscape,
  emailValidator, urlValidator, regexTester,
  hexRgb, timestamp, jsonToCsvConverter,
];

export const categories = [
  { name: 'JSON', slug: 'json', icon: '{ }', description: 'Format, validate, and minify JSON' },
  { name: 'Encoding', slug: 'encoding', icon: '<>', description: 'Base64, URL, and HTML encoding' },
  { name: 'Generators', slug: 'generators', icon: '?', description: 'UUID, password, hash, lorem ipsum' },
  { name: 'Text', slug: 'text', icon: 'T', description: 'Case, diff, count, slug, reverse' },
  { name: 'Formatters', slug: 'formatters', icon: '</>', description: 'XML and YAML formatters' },
  { name: 'Crypto', slug: 'crypto', icon: '#', description: 'JWT decoder, JSON escape/unescape' },
  { name: 'Validation', slug: 'validation', icon: 'OK', description: 'Email, URL, regex testing' },
  { name: 'Converters', slug: 'converters', icon: 'RP', description: 'Color, timestamp, JSON to CSV' },
];

export function getAllTools(): ToolConfig[] {
  return tools;
}

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return tools.find(t => t.slug === slug);
}

export function getToolsByCategory(category: string): ToolConfig[] {
  return tools.filter(t => t.category === category);
}

export function getRelatedTools(slug: string): ToolConfig[] {
  const tool = getToolBySlug(slug);
  if (!tool || !tool.relatedTools) return [];
  return tools.filter(t => tool.relatedTools!.includes(t.slug));
}

export function searchTools(query: string): ToolConfig[] {
  if (!query.trim()) return tools;
  const q = query.toLowerCase();
  return tools.filter(t =>
    t.name.toLowerCase().includes(q) ||
    t.slug.toLowerCase().includes(q) ||
    t.category.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q)
  );
}

/**
 * Get the serializable (function-free) version of a tool config.
 * Use this when passing tool data from Server Components to Client Components.
 * Client Components resolve the transform function via getTransform(slug) from transforms.ts.
 */
export function getToolDataBySlug(slug: string): ToolConfigSerializable | undefined {
  const tool = getToolBySlug(slug);
  if (!tool) return undefined;
  // Destructure to exclude the non-serializable transform function
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { transform, ...data } = tool;
  return data;
}

export default tools;
