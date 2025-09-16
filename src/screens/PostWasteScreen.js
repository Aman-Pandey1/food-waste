import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { AuthContext } from '../contexts/AuthProvidor';

export default function PostWasteScreen({ navigation }) {
  const { user, userData } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!title || !quantity) return Alert.alert('Error', 'Title aur quantity zaroori hai');
    setLoading(true);
    try {
      await addDoc(collection(db, 'posts'), {
        title,
        type,
        quantity,
        location,
        description: '',
        ownerId: user.uid,
        ownerName: userData?.name || user.email,
        ownerEmail: user.email,
        status: 'available',
        createdAt: serverTimestamp()
      });
      Alert.alert('Success', 'Waste posted');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={{borderWidth:1,padding:8,marginBottom:8}} />
      <TextInput placeholder="Type (e.g., vegetables)" value={type} onChangeText={setType} style={{borderWidth:1,padding:8,marginBottom:8}} />
      <TextInput placeholder="Quantity (kg)" value={quantity} onChangeText={setQuantity} style={{borderWidth:1,padding:8,marginBottom:8}} keyboardType="numeric" />
      <TextInput placeholder="Location" value={location} onChangeText={setLocation} style={{borderWidth:1,padding:8,marginBottom:8}} />
      <Button title={loading ? 'Posting...' : 'Post Waste'} onPress={handlePost} disabled={loading} />
    </View>
  );
}
