import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'AdmitGPT — Free, Open-Source College Admissions Probability Calculator';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#08090c',
          padding: '64px 72px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              backgroundColor: '#c6ff1a',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#08090c',
              fontWeight: 900,
              fontSize: '26px',
            }}
          >
            A
          </div>
          <span style={{ color: '#eef1f7', fontSize: '26px', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Admit<span style={{ color: '#c6ff1a' }}>GPT</span>
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '-40px' }}>
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 900,
              color: '#eef1f7',
              letterSpacing: '-0.03em',
              lineHeight: 1.02,
              margin: 0,
            }}
          >
            College Admission Chances
          </h1>
          <p style={{ fontSize: '34px', color: '#aab1c4', fontWeight: 500, margin: '4px 0 0' }}>
            Know your real odds &mdash; with the math shown
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '24px',
          }}
        >
          <span style={{ color: '#6b7280', fontSize: '20px', fontWeight: 500 }}>
            admitgpt.pages.dev
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#c6ff1a', fontSize: '20px' }}>&#10038;</span>
            <span style={{ color: '#c6ff1a', fontSize: '20px', fontWeight: 700, letterSpacing: '0.01em' }}>
              Transparent &middot; Open-Source &middot; Free
            </span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
