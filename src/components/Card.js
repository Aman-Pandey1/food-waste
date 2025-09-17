// src/components/Card.js
import React from 'react';
import { View } from 'react-native';
import { theme } from './Theme';

export default function Card({ children, style }) {
  return (
    <View
      style={[
        {
          backgroundColor: 'rgba(255,255,255,0.85)',
          borderRadius: theme.radius.xl,
          padding: theme.spacing.xl,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.6)',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.18,
          shadowRadius: 12,
          elevation: 6,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

