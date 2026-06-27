/**
 * Client-side transform registry
 *
 * In Next.js App Router, functions cannot be passed from Server Components
 * to Client Components. This registry allows Client Components to look up
 * transform functions by tool slug, keeping the Server/Client boundary clean.
 *
 * The Server Component passes only the tool's slug (a string).
 * The Client Component uses that slug to retrieve the transform function here.
 */
import type { TransformFn } from '@/lib/types';

// ─── JSON ────────────────────────────────────────────────
import jsonFormatter from '@/lib/tools/json/formatter';
import jsonValidator from '@/lib/tools/json/validator';
import jsonMinifier from '@/lib/tools/json/minifier';
import jsonPrettifier from '@/lib/tools/json/prettifier';

// ─── Encoding ────────────────────────────────────────────
import base64Encode from '@/lib/tools/encoding/base64-encode';
import base64Decode from '@/lib/tools/encoding/base64-decode';
import urlEncode from '@/lib/tools/encoding/url-encode';
import urlDecode from '@/lib/tools/encoding/url-decode';
import htmlEncode from '@/lib/tools/encoding/html-encode';
import htmlDecode from '@/lib/tools/encoding/html-decode';

// ─── Generators ──────────────────────────────────────────
import uuidGenerator from '@/lib/tools/generators/uuid';
import passwordGenerator from '@/lib/tools/generators/password';
import hashGenerator from '@/lib/tools/generators/hash';
import loremIpsum from '@/lib/tools/generators/lorem-ipsum';
import randomNumber from '@/lib/tools/generators/random-number';

// ─── Text ────────────────────────────────────────────────
import caseConverter from '@/lib/tools/text/case-converter';
import textDiff from '@/lib/tools/text/text-diff';
import wordCounter from '@/lib/tools/text/word-counter';
import slugGenerator from '@/lib/tools/text/slug-generator';
import reverseText from '@/lib/tools/text/reverse-text';

// ─── Formatters ──────────────────────────────────────────
import xmlFormatter from '@/lib/tools/formatters/xml-formatter';
import yamlFormatter from '@/lib/tools/formatters/yaml-formatter';

// ─── Crypto ──────────────────────────────────────────────
import jwtDecoder from '@/lib/tools/crypto/jwt-decoder';
import jsonEscape from '@/lib/tools/crypto/json-escape';

// ─── Validation ──────────────────────────────────────────
import emailValidator from '@/lib/tools/validation/email-validator';
import urlValidator from '@/lib/tools/validation/url-validator';
import regexTester from '@/lib/tools/validation/regex-tester';

// ─── Converters ──────────────────────────────────────────
import hexRgb from '@/lib/tools/converters/hex-rgb';
import timestamp from '@/lib/tools/converters/timestamp';
import jsonToCsvConverter from '@/lib/tools/converters/json-to-csv';

// ─── Registry ────────────────────────────────────────────
const registry: Record<string, TransformFn> = {
  [jsonFormatter.slug]: jsonFormatter.transform,
  [jsonValidator.slug]: jsonValidator.transform,
  [jsonMinifier.slug]: jsonMinifier.transform,
  [jsonPrettifier.slug]: jsonPrettifier.transform,

  [base64Encode.slug]: base64Encode.transform,
  [base64Decode.slug]: base64Decode.transform,
  [urlEncode.slug]: urlEncode.transform,
  [urlDecode.slug]: urlDecode.transform,
  [htmlEncode.slug]: htmlEncode.transform,
  [htmlDecode.slug]: htmlDecode.transform,

  [uuidGenerator.slug]: uuidGenerator.transform,
  [passwordGenerator.slug]: passwordGenerator.transform,
  [hashGenerator.slug]: hashGenerator.transform,
  [loremIpsum.slug]: loremIpsum.transform,
  [randomNumber.slug]: randomNumber.transform,

  [caseConverter.slug]: caseConverter.transform,
  [textDiff.slug]: textDiff.transform,
  [wordCounter.slug]: wordCounter.transform,
  [slugGenerator.slug]: slugGenerator.transform,
  [reverseText.slug]: reverseText.transform,

  [xmlFormatter.slug]: xmlFormatter.transform,
  [yamlFormatter.slug]: yamlFormatter.transform,

  [jwtDecoder.slug]: jwtDecoder.transform,
  [jsonEscape.slug]: jsonEscape.transform,

  [emailValidator.slug]: emailValidator.transform,
  [urlValidator.slug]: urlValidator.transform,
  [regexTester.slug]: regexTester.transform,

  [hexRgb.slug]: hexRgb.transform,
  [timestamp.slug]: timestamp.transform,
  [jsonToCsvConverter.slug]: jsonToCsvConverter.transform,
};

/**
 * Get the transform function for a tool by its slug.
 * This is the ONLY way Client Components should access transform functions.
 */
export function getTransform(slug: string): TransformFn | undefined {
  return registry[slug];
}

export default registry;
