// src/components/Theme.js
export const theme = {
  colors: {
    greenLight: '#34d399', // emerald 400
    green: '#10b981',      // emerald 500
    greenDark: '#059669',  // emerald 600
    greenDarker: '#047857',
    background: '#f0fdf4', // green-50
    card: '#ffffff',
    text: '#0f172a',       // slate-900
    muted: '#475569',      // slate-600
    border: '#e2e8f0',     // slate-200
    danger: '#ef4444',
    success: '#22c55e'
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 18,
    xl: 24
  }
};

export const gradientColors = [
  theme.colors.greenLight,
  theme.colors.green,
  theme.colors.greenDark
];

