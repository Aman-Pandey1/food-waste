import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../contexts/AuthProvidor';

export default function DistributorHome({ navigation }) {
  const { user, userData, logout } = useContext(AuthContext);

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>Welcome, {userData?.name || user?.email}</Text>
      <Button title="Browse Listings" onPress={() => navigation.navigate('Listings')} />
      <View style={{ height: 10 }} />
      <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
      <View style={{ height: 10 }} />
      <Button title="Logout" onPress={() => logout()} />
    </View>
  );
}
