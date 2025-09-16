import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../contexts/AuthProvidor';
import GradientBackground from '../components/GradientBackground';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { theme } from '../components/Theme';

export default function SignupScreen({ navigation }) {
  const { signup } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [role, setRole] = useState('supplier'); // default
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password) return Alert.alert('Error', 'Email aur password darj karo');
    setLoading(true);
    try {
      await signup(name, role, email.trim(), password);
      Alert.alert('Success', 'Account created');
      // onAuthStateChanged in provider will redirect
    } catch (e) {
      Alert.alert('Signup error', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Card>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join as Supplier or Distributor</Text>
          <TextInput placeholder="Name" placeholderTextColor={theme.colors.muted} value={name} onChangeText={setName} style={styles.input} />
          <TextInput placeholder="Email" placeholderTextColor={theme.colors.muted} value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
          <TextInput placeholder="Password" placeholderTextColor={theme.colors.muted} value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 }}>
            <TouchableOpacity onPress={() => setRole('supplier')} style={[styles.roleBtn, role === 'supplier' && styles.roleSelected]}>
              <Text style={[styles.roleText, role === 'supplier' && styles.roleTextActive]}>Supplier</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setRole('distributor')} style={[styles.roleBtn, role === 'distributor' && styles.roleSelected]}>
              <Text style={[styles.roleText, role === 'distributor' && styles.roleTextActive]}>Distributor</Text>
            </TouchableOpacity>
          </View>
          <PrimaryButton title={loading ? 'Please wait...' : 'Signup'} onPress={handleSignup} disabled={loading} loading={loading} />
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: theme.spacing.md, alignItems: 'center' }}>
            <Text style={{ color: theme.colors.greenDark, fontWeight: '600' }}>Already have an account? Login</Text>
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
  roleBtn: { paddingVertical: 10, paddingHorizontal: 14, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 12, backgroundColor: '#fff', flex: 1, marginHorizontal: 6, alignItems: 'center' },
  roleSelected: { borderColor: theme.colors.greenDark, backgroundColor: '#ecfdf5' },
  roleText: { color: theme.colors.muted, fontWeight: '600' },
  roleTextActive: { color: theme.colors.greenDark },
});
