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
        <View style={[{ flex: 1, padding: theme.spacing.lg }, contentStyle]}>
          {children}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

