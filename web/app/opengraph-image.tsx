import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'life-system-template'
export const size = { width: 1200, height: 630 }
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
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: '#21222c',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 56,
            fontFamily: 'monospace',
            color: '#B388EB',
            marginBottom: 20,
            letterSpacing: '0.1em',
          }}
        >
          LIFE-SYSTEM-TEMPLATE
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 32,
            color: '#C3BDDA',
            lineHeight: 1.6,
            maxWidth: 900,
          }}
        >
          A file-based life and work system that you and your AI agents share
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 40,
            gap: 30,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                background: '#B388EB',
              }}
            />
            <span
              style={{
                fontSize: 20,
                color: '#8E89A3',
                fontFamily: 'monospace',
              }}
            >
              AGENTS.md
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                background: '#B388EB',
              }}
            />
            <span
              style={{
                fontSize: 20,
                color: '#8E89A3',
                fontFamily: 'monospace',
              }}
            >
              Areas/
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                background: '#B388EB',
              }}
            />
            <span
              style={{
                fontSize: 20,
                color: '#8E89A3',
                fontFamily: 'monospace',
              }}
            >
              Projects/
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
