import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import { db } from '../config/firebase';
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';

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
    <View style={{ flex: 1, padding: 12 }}>
      <FlatList
        data={requests}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderWidth: 1, marginBottom: 8 }}>
            <Text style={{ fontWeight: 'bold' }}>From: {item.distributorName || item.distributorId}</Text>
            <Text>Status: {item.status}</Text>
            <Button title="Accept" onPress={() => respond(item.id, 'accepted', item.postId)} />
            <View style={{height:6}} />
            <Button title="Decline" onPress={() => respond(item.id, 'declined', item.postId)} />
          </View>
        )}
      />
    </View>
  );
}
