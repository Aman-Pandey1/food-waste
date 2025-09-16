import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../contexts/AuthProvidor';

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
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 8 }}>
        <TouchableOpacity onPress={() => setRole('supplier')} style={[styles.roleBtn, role === 'supplier' && styles.roleSelected]}>
          <Text>Supplier</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRole('distributor')} style={[styles.roleBtn, role === 'distributor' && styles.roleSelected]}>
          <Text>Distributor</Text>
        </TouchableOpacity>
      </View>
      <Button title={loading ? 'Please wait...' : 'Signup'} onPress={handleSignup} disabled={loading} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 12 }}>
        <Text style={{ color: 'blue' }}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, justifyContent: 'center' },
  title: { fontSize: 22, textAlign: 'center', marginBottom: 12 },
  input: { borderWidth: 1, padding: 10, borderRadius: 6, marginBottom: 10 },
  roleBtn: { padding: 10, borderWidth: 1, borderRadius: 6 },
  roleSelected: { backgroundColor: '#e6e6e6' },
});
