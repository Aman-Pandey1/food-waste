import React, { useContext, useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { AuthContext } from '../contexts/AuthProvidor';
import { db } from '../config/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

export default function ProfileScreen() {
  const { user, userData, setUserData } = useContext(AuthContext);
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
    <View style={{ padding: 16 }}>
      <Text style={{ marginBottom: 6 }}>Email: {user.email}</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} keyboardType="phone-pad" />
      <Button title="Save Profile" onPress={save} />
    </View>
  );
}
