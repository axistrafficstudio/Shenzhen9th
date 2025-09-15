export const theme = {
  palette: {
    accent: '#7aa9ff',
    accentHot: '#ff6f6f',
    accentWarn: '#ffc569',
    accentOk: '#6fdc9d',
    bgBase: '#e5edf6',
    text: '#1d2433',
    dim: '#4b566a'
  },
  shadows: {
    card: '0 12px 40px -12px rgba(30,40,70,0.28),0 4px 12px rgba(30,40,70,0.18)',
    glow: '0 0 0 1px rgba(255,255,255,0.4) inset'
  }
};

export type Theme = typeof theme;