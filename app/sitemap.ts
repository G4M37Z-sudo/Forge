import { MetadataRoute } from 'next';
import { getAllTools } from '@/lib/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = getAllTools();
  const baseUrl = 'https://forge.dev';

  const toolUrls: MetadataRoute.Sitemap = tools.map(tool => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...toolUrls,
  ];
}
