import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { db } from '../config/firebase';
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import GradientBackground from '../components/GradientBackground';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { theme } from '../components/Theme';

export default function PostRequestsScreen({ route }) {
  const { postId } = route.params;
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'requests'), where('postId', '==', postId));
    const unsub = onSnapshot(q, (snap) => {
      setRequests(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [postId]);

  const respond = async (reqId, action, postId) => {
    try {
      await updateDoc(doc(db, 'requests', reqId), { status: action });
      if (action === 'accepted') {
        // also mark post as claimed
        await updateDoc(doc(db, 'posts', postId), { status: 'claimed', claimedAt: new Date() });
      }
      Alert.alert('Done', `Request ${action}`);
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <GradientBackground>
      <FlatList
        contentContainerStyle={{ padding: theme.spacing.lg }}
        data={requests}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: theme.spacing.md }}>
            <Text style={{ fontWeight: '800', fontSize: 16, color: theme.colors.text }}>From: {item.distributorName || item.distributorId}</Text>
            <Text style={{ color: theme.colors.muted, marginTop: 2 }}>Status: {item.status}</Text>
            <View style={{ height: theme.spacing.md }} />
            <PrimaryButton title="Accept" onPress={() => respond(item.id, 'accepted', item.postId)} />
            <View style={{ height: theme.spacing.sm }} />
            <PrimaryButton title="Decline" onPress={() => respond(item.id, 'declined', item.postId)} />
          </Card>
        )}
      />
    </GradientBackground>
  );
}
