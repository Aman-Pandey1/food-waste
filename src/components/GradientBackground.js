// src/components/GradientBackground.js
import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { gradientColors, theme } from './Theme';

export default function GradientBackground({ children, style, contentStyle }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.greenDark} />
      <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[{ flex: 1 }, style]}>
        <View style={{ position: 'absolute', top: -40, right: -30, width: 180, height: 180, borderRadius: 90, backgroundColor: 'rgba(255,255,255,0.12)' }} />
        <View style={{ position: 'absolute', bottom: -60, left: -40, width: 220, height: 220, borderRadius: 110, backgroundColor: 'rgba(255,255,255,0.10)' }} />
        <View style={{ position: 'absolute', top: 120, left: -50, width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.08)' }} />
        <View style={[{ flex: 1, padding: theme.spacing.lg }, contentStyle]}>
          {children}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

