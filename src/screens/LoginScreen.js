import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../contexts/AuthProvider';
import GradientBackground from '../components/GradientBackground';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { theme } from '../components/Theme';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert('Error', 'Email aur password darj karo');
    setLoading(true);
    try {
      await login(email.trim(), password);
    } catch (e) {
      Alert.alert('Login error', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Card>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor={theme.colors.muted}
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={theme.colors.muted}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />
          <PrimaryButton title={loading ? 'Please wait...' : 'Login'} onPress={handleLogin} disabled={loading} loading={loading} />
          <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={{ marginTop: theme.spacing.md, alignItems: 'center' }}>
            <Text style={{ color: theme.colors.greenDark, fontWeight: '600' }}>Create new account</Text>
          </TouchableOpacity>
        </Card>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, textAlign: 'center', marginBottom: 6, fontWeight: '800', color: theme.colors.text },
  subtitle: { fontSize: 14, textAlign: 'center', marginBottom: 16, color: theme.colors.muted },
  input: { borderWidth: 1, borderColor: theme.colors.border, padding: 12, borderRadius: 10, marginBottom: 12 },
});
