import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, Text, Alert } from 'react-native';
import { db } from '../config/firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { AuthContext } from '../contexts/AuthProvider';
import GradientBackground from '../components/GradientBackground';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { theme } from '../components/Theme';

export default function ListingsScreen() {
  const [posts, setPosts] = useState([]);
  const { user, userData } = useContext(AuthContext);

  useEffect(() => {
    const q = query(collection(db, 'posts'), where('status', '==', 'available'));
    const unsub = onSnapshot(q, (snap) => {
      setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const requestPickup = async (post) => {
    try {
      // create a request doc
      await addDoc(collection(db, 'requests'), {
        postId: post.id,
        postTitle: post.title,
        supplierId: post.ownerId,
        distributorId: user.uid,
        distributorName: userData?.name || user.email,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      Alert.alert('Request sent', 'Supplier will see your request');
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <GradientBackground>
      <FlatList
        contentContainerStyle={{ padding: theme.spacing.lg }}
        data={posts}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: theme.spacing.md }}>
            <Text style={{ fontWeight: '800', fontSize: 16, color: theme.colors.text }}>{item.title}</Text>
            <Text style={{ color: theme.colors.muted, marginTop: 2 }}>Qty: {item.quantity}</Text>
            <Text style={{ color: theme.colors.muted }}>Location: {item.location}</Text>
            <View style={{ height: theme.spacing.md }} />
            <PrimaryButton title="Request Pickup" onPress={() => requestPickup(item)} />
          </Card>
        )}
      />
    </GradientBackground>
  );
}
