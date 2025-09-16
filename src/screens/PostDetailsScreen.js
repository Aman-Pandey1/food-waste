import React, { useEffect, useState } from 'react';
import { View, Text, Alert, Linking } from 'react-native';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import GradientBackground from '../components/GradientBackground';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { theme } from '../components/Theme';

export default function PostDetailsScreen({ route, navigation }) {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const snap = await getDoc(doc(db, 'posts', postId));
        if (snap.exists()) {
          setPost({ id: snap.id, ...snap.data() });
        } else {
          Alert.alert('Not found', 'Post no longer exists');
          navigation.goBack();
        }
      } catch (e) {
        Alert.alert('Error', e.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [postId, navigation]);

  const contactSupplier = async () => {
    if (post?.ownerEmail) {
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

  const callSupplier = async () => {
    if (post?.ownerPhone) {
      try {
        await Linking.openURL(`tel:${post.ownerPhone}`);
      } catch (e) {
        Alert.alert('Error', 'Unable to start call');
      }
    } else {
      Alert.alert('No phone number available');
    }
  };

  return (
    <GradientBackground>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Card>
          <Text style={{ fontSize: 20, fontWeight: '800', color: theme.colors.text, textAlign: 'center', marginBottom: theme.spacing.md }}>Post Details</Text>
          {loading ? (
            <Text style={{ color: theme.colors.muted, textAlign: 'center' }}>Loading...</Text>
          ) : post ? (
            <>
              <Text style={{ fontWeight: '800', fontSize: 18, color: theme.colors.text }}>{post.title}</Text>
              <Text style={{ color: theme.colors.muted, marginTop: 6 }}>Type: {post.type || '-'}</Text>
              <Text style={{ color: theme.colors.muted }}>Quantity: {post.quantity}</Text>
              <Text style={{ color: theme.colors.muted }}>Location: {post.location || '-'}</Text>
              <Text style={{ color: theme.colors.muted }}>Status: {post.status}</Text>
              {!!post.ownerName && <Text style={{ color: theme.colors.muted }}>Supplier: {post.ownerName}</Text>}
              {!!post.ownerEmail && <Text style={{ color: theme.colors.muted }}>Email: {post.ownerEmail}</Text>}
              {!!post.ownerPhone && <Text style={{ color: theme.colors.muted }}>Phone: {post.ownerPhone}</Text>}
              <View style={{ height: theme.spacing.lg }} />
              <PrimaryButton title="Contact Supplier" onPress={contactSupplier} />
              {post.ownerPhone ? (
                <>
                  <View style={{ height: theme.spacing.sm }} />
                  <PrimaryButton title="Call Supplier" onPress={callSupplier} />
                </>
              ) : null}
            </>
          ) : (
            <Text style={{ color: theme.colors.muted, textAlign: 'center' }}>No details</Text>
          )}
        </Card>
      </View>
    </GradientBackground>
  );
}

