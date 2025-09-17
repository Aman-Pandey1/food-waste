// src/components/GradientBackground.js
import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { gradientColors, theme } from './Theme';

export default function GradientBackground({ children, style, contentStyle }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      {/* Keep a very subtle top header gradient strip to stay on brand */}
      <View style={{ flex: 1 }}>
        <View style={[{ flex: 1, backgroundColor: theme.colors.background }, style]}>
          {/* soft decorative creams */}
          <View style={{ position: 'absolute', top: -40, right: -30, width: 180, height: 180, borderRadius: 90, backgroundColor: 'rgba(0,0,0,0.02)' }} />
          <View style={{ position: 'absolute', bottom: -60, left: -40, width: 220, height: 220, borderRadius: 110, backgroundColor: 'rgba(0,0,0,0.025)' }} />
          <View style={{ position: 'absolute', top: 120, left: -50, width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(0,0,0,0.015)' }} />
          <View style={[{ flex: 1, padding: theme.spacing.lg }, contentStyle]}>
            {children}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

