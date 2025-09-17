import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { gradientColors } from './Theme';

export default function HeaderGradient() {
  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    />
  );
}

