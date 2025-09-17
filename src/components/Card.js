// src/components/Card.js
import React from 'react';
import { View } from 'react-native';
import { theme } from './Theme';

export default function Card({ children, style }) {
  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.card,
          borderRadius: theme.radius.xl,
          padding: theme.spacing.xl,
          borderWidth: 1,
          borderColor: theme.colors.border,
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

