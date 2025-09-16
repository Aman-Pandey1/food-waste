import React, { useContext, useState, useEffect } from 'react';
import { View, TextInput, Text, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../contexts/AuthProvider';
import { db } from '../config/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import GradientBackground from '../components/GradientBackground';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { theme } from '../components/Theme';

export default function ProfileScreen() {
  const { user, userData, setUserData, logout } = useContext(AuthContext);
  const [name, setName] = useState(userData?.name || '');
  const [phone, setPhone] = useState(userData?.phone || '');

  useEffect(() => {
    setName(userData?.name || '');
    setPhone(userData?.phone || '');
  }, [userData]);

  const save = async () => {
    try {
      await updateDoc(doc(db, 'users', user.uid), { name, phone });
      // update local
      const snap = await getDoc(doc(db, 'users', user.uid));
      setUserData(snap.exists() ? snap.data() : null);
      Alert.alert('Saved');
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <GradientBackground>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Card>
          <View style={{ alignItems: 'center', marginBottom: theme.spacing.sm }}>
            <Ionicons name="restaurant" size={40} color={theme.colors.greenDark} />
          </View>
          <Text style={{ fontSize: 20, fontWeight: '800', color: theme.colors.text, textAlign: 'center', marginBottom: theme.spacing.sm }}>Account</Text>
          <Text style={{ marginBottom: 4, color: theme.colors.muted, textAlign: 'center' }}>Role: {userData?.role || '-'}</Text>
          <Text style={{ marginBottom: 6, color: theme.colors.muted, textAlign: 'center' }}>Email: {user.email}</Text>
          <TextInput placeholder="Name" placeholderTextColor={theme.colors.muted} value={name} onChangeText={setName} style={{ borderWidth: 1, borderColor: theme.colors.border, padding: 12, marginBottom: 12, borderRadius: 10 }} />
          <TextInput placeholder="Phone" placeholderTextColor={theme.colors.muted} value={phone} onChangeText={setPhone} style={{ borderWidth: 1, borderColor: theme.colors.border, padding: 12, marginBottom: 12, borderRadius: 10 }} keyboardType="phone-pad" />
          <PrimaryButton title="Save Profile" onPress={save} />
          <View style={{ height: theme.spacing.sm }} />
          <PrimaryButton title="Logout" onPress={logout} />
        </Card>
      </View>
    </GradientBackground>
  );
}
