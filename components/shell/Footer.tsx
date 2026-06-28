import Link from 'next/link';

const jsonTools = [
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'JSON Validator', href: '/tools/json-validator' },
  { name: 'JSON Minifier', href: '/tools/json-minifier' },
  { name: 'JSON to YAML', href: '/tools/json-to-yaml' },
  { name: 'JSON Diff', href: '/tools/json-diff' },
];

const encodingTools = [
  { name: 'Base64 Encode', href: '/tools/base64-encode' },
  { name: 'Base64 Decode', href: '/tools/base64-decode' },
  { name: 'URL Encode', href: '/tools/url-encode' },
  { name: 'URL Decode', href: '/tools/url-decode' },
  { name: 'HTML Entities', href: '/tools/html-entities' },
];

const generatorTools = [
  { name: 'UUID Generator', href: '/tools/uuid-generator' },
  { name: 'Hash Generator', href: '/tools/hash-generator' },
  { name: 'Lorem Ipsum', href: '/tools/lorem-ipsum' },
  { name: 'Random String', href: '/tools/random-string' },
  { name: 'Password Generator', href: '/tools/password-generator' },
];

const companyLinks = [
  { name: 'Features', href: '/#features' },
  { name: 'Docs', href: '/docs' },
  { name: 'Community', href: '/community' },
  { name: 'Privacy', href: '/privacy' },
  { name: 'Terms', href: '/terms' },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#1E1E26] bg-[#0A0A0F]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* JSON Tools */}
          <div>
            <h3
              className="text-sm font-semibold text-[#F0F0F5] mb-4"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            >
              JSON Tools
            </h3>
            <ul className="space-y-2">
              {jsonTools.map((tool) => (
                <li key={tool.name}>
                  <Link
                    href={tool.href}
                    className="text-sm text-[#A0A0B8] hover:text-[#F0F0F5] transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Encoding Tools */}
          <div>
            <h3
              className="text-sm font-semibold text-[#F0F0F5] mb-4"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            >
              Encoding Tools
            </h3>
            <ul className="space-y-2">
              {encodingTools.map((tool) => (
                <li key={tool.name}>
                  <Link
                    href={tool.href}
                    className="text-sm text-[#A0A0B8] hover:text-[#F0F0F5] transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Generators */}
          <div>
            <h3
              className="text-sm font-semibold text-[#F0F0F5] mb-4"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            >
              Generators
            </h3>
            <ul className="space-y-2">
              {generatorTools.map((tool) => (
                <li key={tool.name}>
                  <Link
                    href={tool.href}
                    className="text-sm text-[#A0A0B8] hover:text-[#F0F0F5] transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3
              className="text-sm font-semibold text-[#F0F0F5] mb-4"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            >
              Company
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#A0A0B8] hover:text-[#F0F0F5] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1E1E26] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6A6A80]">
            &copy; {new Date().getFullYear()} Forge. Open source under MIT License.
          </p>
          <p className="text-xs text-[#6A6A80]">
            Built with Next.js &middot; All tools run client-side
          </p>
        </div>
      </div>
    </footer>
  );
}
