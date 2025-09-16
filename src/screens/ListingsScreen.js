import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, Text, Button, Alert } from 'react-native';
import { db } from '../config/firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { AuthContext } from '../contexts/AuthProvidor';

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
    <View style={{ flex: 1, padding: 12 }}>
      <FlatList
        data={posts}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderWidth: 1, marginBottom: 8 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text>Qty: {item.quantity}</Text>
            <Text>Location: {item.location}</Text>
            <View style={{ height: 6 }} />
            <Button title="Request Pickup" onPress={() => requestPickup(item)} />
          </View>
        )}
      />
    </View>
  );
}
