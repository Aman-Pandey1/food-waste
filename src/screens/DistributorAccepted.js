import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, Text, Alert, Linking } from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { AuthContext } from '../contexts/AuthProvider';
import GradientBackground from '../components/GradientBackground';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { theme } from '../components/Theme';

export default function DistributorAccepted() {
  const { user } = useContext(AuthContext);
  const [accepted, setAccepted] = useState([]);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'requests'),
      where('distributorId', '==', user.uid),
      where('status', '==', 'accepted')
    );
    const unsub = onSnapshot(q, (snap) => {
      setAccepted(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [user]);

  const contactSupplier = async (item) => {
    if (item.supplierEmail) {
      const subject = encodeURIComponent('Pickup coordination for accepted post');
      const body = encodeURIComponent(
        `Hello ${item.supplierName || ''},\n\nThis is to coordinate pickup for your post: ${item.postTitle}.\n\nThank you!`
      );
      const url = `mailto:${item.supplierEmail}?subject=${subject}&body=${body}`;
      try {
        await Linking.openURL(url);
      } catch (e) {
        Alert.alert('Error', 'Unable to open mail app');
      }
    } else {
      Alert.alert('No email available for this supplier');
    }
  };

  const callSupplier = async (item) => {
    if (item.supplierPhone) {
      const url = `tel:${item.supplierPhone}`;
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
        data={accepted}
        keyExtractor={(i) => i.id}
        ListEmptyComponent={() => (
          <View style={{ padding: theme.spacing.lg }}>
            <Text style={{ color: theme.colors.muted, textAlign: 'center' }}>No accepted requests yet.</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: theme.spacing.md }}>
            <Text style={{ fontWeight: '800', fontSize: 16, color: theme.colors.text }}>{item.postTitle || 'Accepted Post'}</Text>
            {!!item.supplierName && (
              <Text style={{ color: theme.colors.muted, marginTop: 2 }}>Supplier: {item.supplierName}</Text>
            )}
            <Text style={{ color: theme.colors.muted }}>Request status: {item.status}</Text>
            <View style={{ height: theme.spacing.md }} />
            <PrimaryButton title="Contact Supplier" onPress={() => contactSupplier(item)} />
            {item.supplierPhone ? (
              <>
                <View style={{ height: theme.spacing.sm }} />
                <PrimaryButton title="Call Supplier" onPress={() => callSupplier(item)} />
              </>
            ) : null}
          </Card>
        )}
      />
    </GradientBackground>
  );
}

