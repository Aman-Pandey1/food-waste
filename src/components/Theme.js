// src/components/Theme.js
export const theme = {
  colors: {
    // Brand greens
    greenLight: '#7fd38a', // soft leaf green for gradients
    green: '#3aa357',      // primary green
    greenDark: '#1f7a3a',  // deep green
    greenDarker: '#155c2b',

    // Cream palette inspired by the design reference
    background: '#f7f4e9', // warm cream background
    card: '#fffaf0',       // light cream card
    text: '#1b2b22',       // deep greenish text for contrast
    muted: '#5b7164',      // desaturated green-gray
    border: '#efe9d6',     // soft cream border

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

