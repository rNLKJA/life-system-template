import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Life System Template'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1f2231',
          backgroundImage:
            'radial-gradient(circle at 25% 50%, rgba(155, 135, 245, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(126, 105, 214, 0.1) 0%, transparent 50%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '32px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#9b87f5',
            }}
          >
            PERSONAL LIFE OS
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#f8fafc',
              textAlign: 'center',
              maxWidth: '900px',
            }}
          >
            Life System Template
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 32,
              color: '#b4b8cc',
              textAlign: 'center',
              maxWidth: '700px',
              lineHeight: 1.5,
            }}
          >
            A file-based life and work system that you and your AI agents share
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
