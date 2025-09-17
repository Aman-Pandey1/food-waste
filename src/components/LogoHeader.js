import React from 'react';
import { View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { gradientColors, theme } from './Theme';
import { logoSource, appDisplayName } from '../assets/branding';

export default function LogoHeader({ title }) {
  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.md,
        }}
      >
        {logoSource ? (
          <Image
            source={logoSource}
            resizeMode="contain"
            style={{ width: 34, height: 34, marginRight: 10, borderRadius: 8 }}
          />
        ) : null}
        <Text
          numberOfLines={1}
          style={{ color: '#fff', fontSize: 18, fontWeight: '800' }}
        >
          {title || appDisplayName}
        </Text>
      </View>
    </LinearGradient>
  );
}

