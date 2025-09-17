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
          borderRadius: theme.radius.lg,
          padding: theme.spacing.lg,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 3,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

