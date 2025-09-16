import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { db } from '../config/firebase';
import { collection, query, where, onSnapshot, orderBy, doc, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../contexts/AuthProvider';
import GradientBackground from '../components/GradientBackground';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { theme } from '../components/Theme';

export default function MyPostsScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let activeUnsub = () => {};
    const attachPrimary = () => {
      const q1 = query(
        collection(db, 'posts'),
        where('ownerId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      activeUnsub = onSnapshot(
        q1,
        (snap) => {
          setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        },
        (err) => {
          // Fallback if index is missing: remove orderBy
          if (err?.code === 'failed-precondition') {
            const q2 = query(collection(db, 'posts'), where('ownerId', '==', user.uid));
            activeUnsub();
            activeUnsub = onSnapshot(q2, (snap2) => {
              const items = snap2.docs.map((d) => ({ id: d.id, ...d.data() }));
              items.sort((a, b) => {
                const ta = a?.createdAt?.seconds || 0;
                const tb = b?.createdAt?.seconds || 0;
                return tb - ta;
              });
              setPosts(items);
            });
          } else {
            Alert.alert('Error', err.message || 'Unable to load posts');
          }
        }
      );
    };
    attachPrimary();
    return () => activeUnsub();
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
    <GradientBackground>
      {posts.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', padding: theme.spacing.lg }}>
          <Card>
            <Text style={{ fontWeight: '800', fontSize: 18, color: theme.colors.text, textAlign: 'center' }}>No posts yet</Text>
            <Text style={{ color: theme.colors.muted, marginTop: 6, textAlign: 'center' }}>Create your first food waste post.</Text>
            <View style={{ height: theme.spacing.md }} />
            <PrimaryButton title="Post Waste" onPress={() => navigation.navigate('Post')} />
          </Card>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{ padding: theme.spacing.lg }}
          data={posts}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <Card style={{ marginBottom: theme.spacing.md }}>
              <Text style={{ fontWeight: '800', fontSize: 16, color: theme.colors.text }}>{item.title}</Text>
              <Text style={{ color: theme.colors.muted, marginTop: 2 }}>Qty: {item.quantity}</Text>
              <Text style={{ color: theme.colors.muted }}>Status: {item.status}</Text>
              <View style={{ height: theme.spacing.md }} />
              <PrimaryButton title="View Requests" onPress={() => navigation.navigate('PostRequests', { postId: item.id, title: item.title })} />
              <View style={{ height: theme.spacing.sm }} />
              <PrimaryButton title="View Details" onPress={() => navigation.navigate('PostDetails', { postId: item.id })} />
              {item.status !== 'completed' && <View style={{ height: theme.spacing.sm }} />}
              {item.status !== 'completed' && <PrimaryButton title="Mark Completed" onPress={() => markCompleted(item.id)} />}
            </Card>
          )}
        />
      )}
    </GradientBackground>
  );
}
