import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, Text, Alert, Linking } from 'react-native';
import { db } from '../config/firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { AuthContext } from '../contexts/AuthProvider';
import GradientBackground from '../components/GradientBackground';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { theme } from '../components/Theme';

export default function ListingsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const { user, userData } = useContext(AuthContext);

  useEffect(() => {
    const q = query(collection(db, 'posts'));
    const unsub = onSnapshot(q, (snap) => {
      // Show all posts, but prefer available first
      const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      items.sort((a,b) => {
        const scoreA = a.status === 'available' ? 0 : 1;
        const scoreB = b.status === 'available' ? 0 : 1;
        return scoreA - scoreB;
      });
      setPosts(items);
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
        supplierName: post.ownerName || null,
        supplierEmail: post.ownerEmail || null,
        supplierPhone: post.ownerPhone || null,
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

  const contactSupplier = async (post) => {
    if (post.ownerEmail) {
      const subject = encodeURIComponent('Food pickup interest');
      const body = encodeURIComponent(`Hello ${post.ownerName || ''},\n\nI'm interested in picking up your post: ${post.title} (Qty: ${post.quantity}).\nPlease let me know the best time and contact details.\n\nThanks!`);
      const url = `mailto:${post.ownerEmail}?subject=${subject}&body=${body}`;
      try {
        await Linking.openURL(url);
      } catch (e) {
        Alert.alert('Error', 'Unable to open mail app');
      }
    } else {
      Alert.alert('No email available for this supplier');
    }
  };

  const callSupplier = async (post) => {
    if (post.ownerPhone) {
      const url = `tel:${post.ownerPhone}`;
      try {
        await Linking.openURL(url);
      } catch (e) {
        Alert.alert('Error', 'Unable to start call');
      }
    } else {
      Alert.alert('No phone number available');
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
            {!!item.ownerName && <Text style={{ color: theme.colors.muted }}>Supplier: {item.ownerName}</Text>}
            <View style={{ height: theme.spacing.md }} />
            <PrimaryButton title="Request Pickup" onPress={() => requestPickup(item)} />
            <View style={{ height: theme.spacing.sm }} />
            <PrimaryButton title="Contact Supplier" onPress={() => contactSupplier(item)} />
            {item.ownerPhone ? (
              <>
                <View style={{ height: theme.spacing.sm }} />
                <PrimaryButton title="Call Supplier" onPress={() => callSupplier(item)} />
              </>
            ) : null}
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
              <Text style={{ color: theme.colors.muted }}>Location: {item.location}</Text>
              <Text style={{ color: theme.colors.muted }}>Status: {item.status}</Text>
              {!!item.ownerName && <Text style={{ color: theme.colors.muted }}>Supplier: {item.ownerName}</Text>}
              <View style={{ height: theme.spacing.md }} />
              <PrimaryButton title="Request Pickup" onPress={() => requestPickup(item)} />
              <View style={{ height: theme.spacing.sm }} />
              <PrimaryButton title="Contact Supplier" onPress={() => contactSupplier(item)} />
              <View style={{ height: theme.spacing.sm }} />
              <PrimaryButton title="View Details" onPress={() => navigation.navigate('PostDetails', { postId: item.id })} />
              {item.ownerPhone ? (
                <>
                  <View style={{ height: theme.spacing.sm }} />
                  <PrimaryButton title="Call Supplier" onPress={() => callSupplier(item)} />
                </>
              ) : null}
            </Card>
          )}
        />
      )}
    </GradientBackground>
  );
}
