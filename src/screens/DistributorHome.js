import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../contexts/AuthProvider';
import GradientBackground from '../components/GradientBackground';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { theme } from '../components/Theme';

export default function DistributorHome({ navigation }) {
  const { user, userData, logout } = useContext(AuthContext);

  return (
    <GradientBackground>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Card>
          <Text style={{ fontSize: 22, fontWeight: '800', color: theme.colors.text, textAlign: 'center' }}>Distributor Dashboard</Text>
          <Text style={{ textAlign: 'center', color: theme.colors.muted, marginTop: 6 }}>Welcome, {userData?.name || user?.email}</Text>
          <View style={{ height: theme.spacing.lg }} />
          <PrimaryButton title="Browse Listings" onPress={() => navigation.navigate('Available')} />
          <View style={{ height: theme.spacing.md }} />
          <PrimaryButton title="Account" onPress={() => navigation.navigate('Account')} />
          <View style={{ height: theme.spacing.md }} />
          <PrimaryButton title="Logout" onPress={logout} />
        </Card>
      </View>
    </GradientBackground>
  );
}
