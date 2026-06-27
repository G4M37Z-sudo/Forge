import type { Metadata } from 'next';
import type { ToolConfigSerializable } from '@/lib/types';

const SITE_NAME = 'Forge';
const SITE_URL = 'https://forge.dev';

export function generateToolMeta(tool: ToolConfigSerializable, slug: string): Metadata {
  const title = `${tool.name} — ${SITE_NAME}`;
  const description = tool.description.length > 155
    ? tool.description.slice(0, 152) + '...'
    : tool.description;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: [tool.name.toLowerCase(), tool.category, 'developer tools', 'online tools', 'free tools'],
    openGraph: {
      title,
      description,
      type: 'website' as const,
      url: `${SITE_URL}/tools/${slug}`,
      siteName: SITE_NAME,
      images: [{ url: `/tools/${slug}/opengraph-image`, width: 1200, height: 630, alt: tool.name }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: [`/tools/${slug}/opengraph-image`],
    },
    alternates: {
      canonical: `/tools/${slug}`,
    },
  };
}

export function generateJsonLd(tool: ToolConfigSerializable, slug: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.description,
    url: `${SITE_URL}/tools/${slug}`,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
}

export function generateHomeMeta(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: `${SITE_NAME} — Free Developer Tools`,
    description: 'Free online developer tools. Fast, private, client-side utilities for JSON, encoding, text, generators, converters, and more.',
    openGraph: {
      title: `${SITE_NAME} — Free Developer Tools`,
      description: 'Fast, private, client-side developer utilities.',
      type: 'website' as const,
      url: SITE_URL,
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: `${SITE_NAME} — Free Developer Tools`,
      description: 'Fast, private, client-side developer utilities.',
    },
  };
}

export function generateToolsListingMeta(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: `All Tools — ${SITE_NAME}`,
    description: 'Browse all free developer utilities.',
    openGraph: {
      title: `All Tools — ${SITE_NAME}`,
      description: 'Browse all free developer utilities.',
      type: 'website' as const,
      url: `${SITE_URL}/tools`,
      siteName: SITE_NAME,
    },
    alternates: { canonical: '/tools' },
  };
}
