import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Genius Insights'
  const subtitle = searchParams.get('subtitle') || 'South African Financial Tools & Calculators'

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: '#ffffff',
          padding: '60px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top: Logo area */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #059669, #2563eb)',
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            G
          </div>
          <span style={{ marginLeft: '12px', fontSize: '20px', fontWeight: '600', color: '#374151' }}>
            Genius Insights
          </span>
        </div>

        {/* Middle: Title */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
          <div style={{ fontSize: '52px', fontWeight: '800', color: '#111827', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            {title}
          </div>
          <div style={{ fontSize: '24px', color: '#6B7280', marginTop: '16px', lineHeight: 1.4 }}>
            {subtitle}
          </div>
        </div>

        {/* Bottom: URL + SA flag bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '18px', color: '#059669', fontWeight: '500' }}>
            genius-insights.co.za | Free | 2026
          </div>
          <div style={{ display: 'flex', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ flex: 1, backgroundColor: '#007749' }} />
            <div style={{ flex: 1, backgroundColor: '#FFB81C' }} />
            <div style={{ flex: 1, backgroundColor: '#DE3831' }} />
            <div style={{ flex: 1, backgroundColor: '#002395' }} />
            <div style={{ flex: 1, backgroundColor: '#000000' }} />
            <div style={{ flex: 1, backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }} />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
