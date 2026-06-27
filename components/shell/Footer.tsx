import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border bg-void mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>JSON</h4>
            <ul className="space-y-2">
              <li><Link href="/tools/json-formatter" className="text-xs text-text-tertiary hover:text-purple-bright transition-colors duration-200">JSON Formatter</Link></li>
              <li><Link href="/tools/json-validator" className="text-xs text-text-tertiary hover:text-purple-bright transition-colors duration-200">JSON Validator</Link></li>
              <li><Link href="/tools/json-minifier" className="text-xs text-text-tertiary hover:text-purple-bright transition-colors duration-200">JSON Minifier</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>Encoding</h4>
            <ul className="space-y-2">
              <li><Link href="/tools/base64-encode" className="text-xs text-text-tertiary hover:text-purple-bright transition-colors duration-200">Base64 Encode</Link></li>
              <li><Link href="/tools/base64-decode" className="text-xs text-text-tertiary hover:text-purple-bright transition-colors duration-200">Base64 Decode</Link></li>
              <li><Link href="/tools/url-encode" className="text-xs text-text-tertiary hover:text-purple-bright transition-colors duration-200">URL Encode</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>Generators</h4>
            <ul className="space-y-2">
              <li><Link href="/tools/uuid" className="text-xs text-text-tertiary hover:text-purple-bright transition-colors duration-200">UUID Generator</Link></li>
              <li><Link href="/tools/password" className="text-xs text-text-tertiary hover:text-purple-bright transition-colors duration-200">Password Generator</Link></li>
              <li><Link href="/tools/lorem-ipsum" className="text-xs text-text-tertiary hover:text-purple-bright transition-colors duration-200">Lorem Ipsum</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>Company</h4>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-xs text-text-tertiary hover:text-purple-bright transition-colors duration-200">Features</Link></li>
              <li><Link href="/docs" className="text-xs text-text-tertiary hover:text-purple-bright transition-colors duration-200">Documentation</Link></li>
              <li><Link href="/community" className="text-xs text-text-tertiary hover:text-purple-bright transition-colors duration-200">Community</Link></li>
              <li><Link href="/privacy" className="text-xs text-text-tertiary hover:text-purple-bright transition-colors duration-200">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-xs text-text-tertiary hover:text-purple-bright transition-colors duration-200">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-sm bg-gradient-to-br from-purple to-purple-dim flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-xs text-text-tertiary" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>&copy; {new Date().getFullYear()} Forge. Build. Test. Ship.</p>
          </div>
          <span className="text-[10px] text-text-tertiary/50">Next.js + Tailwind + GSAP</span>
        </div>
      </div>
    </footer>
  );
}
