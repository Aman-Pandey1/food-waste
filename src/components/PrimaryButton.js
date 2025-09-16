// src/components/PrimaryButton.js
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { gradientColors, theme } from './Theme';

export default function PrimaryButton({ title, onPress, disabled, loading, style, textStyle }) {
  const isDisabled = disabled || loading;
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} disabled={isDisabled} style={[{ borderRadius: theme.radius.lg, overflow: 'hidden' }, style]}>
      <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ paddingVertical: 14, alignItems: 'center', justifyContent: 'center' }}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={[{ color: '#fff', fontSize: 16, fontWeight: '700' }, textStyle]}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

