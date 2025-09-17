import React, { useState, useContext } from 'react';
import { View, TextInput, Alert, Text } from 'react-native';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { AuthContext } from '../contexts/AuthProvider';
import GradientBackground from '../components/GradientBackground';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { theme } from '../components/Theme';

export default function PostWasteScreen({ navigation }) {
  const { user, userData } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [contactEmail, setContactEmail] = useState(user?.email || '');
  const [contactPhone, setContactPhone] = useState(userData?.phone || '');
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!title || !quantity) return Alert.alert('Error', 'Title aur quantity zaroori hai');
    if (!contactEmail && !contactPhone) return Alert.alert('Error', 'Please provide at least email or phone');
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
        ownerPhone: userData?.phone || '',
        status: 'available',
        createdAt: serverTimestamp()
      });
      Alert.alert('Success', 'Waste posted');
      navigation.navigate('MyPosts');
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Card>
          <Text style={{ fontSize: 20, fontWeight: '800', color: theme.colors.text, textAlign: 'center', marginBottom: theme.spacing.sm }}>Post Waste</Text>
          <TextInput placeholder="Title" placeholderTextColor={theme.colors.muted} value={title} onChangeText={setTitle} style={{borderWidth:1,borderColor:theme.colors.border,padding:12,marginBottom:12,borderRadius:10}} />
          <TextInput placeholder="Type (e.g., vegetables)" placeholderTextColor={theme.colors.muted} value={type} onChangeText={setType} style={{borderWidth:1,borderColor:theme.colors.border,padding:12,marginBottom:12,borderRadius:10}} />
          <TextInput placeholder="Quantity (kg)" placeholderTextColor={theme.colors.muted} value={quantity} onChangeText={setQuantity} style={{borderWidth:1,borderColor:theme.colors.border,padding:12,marginBottom:12,borderRadius:10}} keyboardType="numeric" />
          <TextInput placeholder="Location" placeholderTextColor={theme.colors.muted} value={location} onChangeText={setLocation} style={{borderWidth:1,borderColor:theme.colors.border,padding:12,marginBottom:12,borderRadius:10}} />
          <Text style={{ color: theme.colors.muted, marginBottom: 6 }}>Contact Details</Text>
          <TextInput placeholder="Contact Email" placeholderTextColor={theme.colors.muted} value={contactEmail} onChangeText={setContactEmail} style={{borderWidth:1,borderColor:theme.colors.border,padding:12,marginBottom:12,borderRadius:10}} keyboardType="email-address" autoCapitalize="none" />
          <TextInput placeholder="Contact Phone" placeholderTextColor={theme.colors.muted} value={contactPhone} onChangeText={setContactPhone} style={{borderWidth:1,borderColor:theme.colors.border,padding:12,marginBottom:12,borderRadius:10}} keyboardType="phone-pad" />
          <PrimaryButton title={loading ? 'Posting...' : 'Post Waste'} onPress={handlePost} disabled={loading} loading={loading} />
        </Card>
      </View>
    </GradientBackground>
  );
}
