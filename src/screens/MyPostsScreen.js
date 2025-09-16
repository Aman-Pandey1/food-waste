import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import { db } from '../config/firebase';
import { collection, query, where, onSnapshot, orderBy, doc, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../contexts/AuthProvidor';

export default function MyPostsScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'posts'),
      where('ownerId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    const unsub = onSnapshot(q, (snap) => {
      setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [user.uid]);

  const markCompleted = async (postId) => {
    try {
      await updateDoc(doc(db, 'posts', postId), { status: 'completed' });
      Alert.alert('Updated', 'Marked as completed');
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
          <View style={{ padding: 12, borderWidth: 1, marginBottom: 8, borderRadius: 6 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text>Qty: {item.quantity}</Text>
            <Text>Status: {item.status}</Text>
            <Button title="View Requests" onPress={() => navigation.navigate('PostRequests', { postId: item.id, title: item.title })} />
            {item.status !== 'completed' && <View style={{height:6}} />}
            {item.status !== 'completed' && <Button title="Mark Completed" onPress={() => markCompleted(item.id)} />}
          </View>
        )}
      />
    </View>
  );
}
