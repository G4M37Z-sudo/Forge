import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/shell/Sidebar';
import { CursorGlow } from '@/components/effects/CursorGlow';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], display: 'swap', variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: new URL('https://forge.dev'),
  title: { template: '%s — Forge', default: 'Forge — Build. Test. Ship.' },
  description: 'Forge is your AI workspace for developers. Build, test, and ship faster with powerful tools crafted to feel like home.',
  keywords: ['developer tools', 'AI workspace', 'json formatter', 'base64 encoder', 'uuid generator', 'free online tools'],
  authors: [{ name: 'Forge' }],
  openGraph: {
    type: 'website',
    siteName: 'Forge',
    title: 'Forge — Build. Test. Ship.',
    description: 'Your AI workspace for developers.',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Forge' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forge — Build. Test. Ship.',
    description: 'Your AI workspace for developers.',
    images: ['/opengraph-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={`${inter.variable} ${jetbrainsMono.variable} bg-void text-text-primary min-h-screen`}>
        <CursorGlow />
        <Sidebar />
        {/* Main content area — offset by sidebar on desktop, below topbar on mobile */}
        <main className="lg:ml-60 pt-14 lg:pt-0 min-h-screen">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
