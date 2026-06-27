import { ImageResponse } from 'next/og';
import { getToolBySlug } from '@/lib/tools';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  const name = tool?.name || 'Developer Tool';
  const category = tool?.category || '';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0f0f14 0%, #1a1a2e 50%, #0f0f14 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(ellipse at 50% 30%, rgba(212,168,83,0.08) 0%, transparent 70%)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, position: 'relative' }}>
          <div style={{ fontSize: 14, color: '#D4A853', textTransform: 'uppercase', letterSpacing: 4, fontWeight: 600 }}>
            Forge
          </div>
          <div style={{ fontSize: 48, color: '#ffffff', fontWeight: 700, textAlign: 'center', maxWidth: 900 }}>
            {name}
          </div>
          <div style={{
            fontSize: 18,
            color: '#6b7280',
            marginTop: 8,
            padding: '6px 20px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            {category} tool
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
