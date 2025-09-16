import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import GradientBackground from '../components/GradientBackground'
import Card from '../components/Card'
import PrimaryButton from '../components/PrimaryButton'
import { theme } from '../components/Theme'
import { AuthContext } from '../contexts/AuthProvidor'

const SupplierHome = ({ navigation }) => {
  const { userData, logout } = useContext(AuthContext);
  return (
    <GradientBackground>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Card>
          <Text style={{ fontSize: 22, fontWeight: '800', color: theme.colors.text, textAlign: 'center' }}>Supplier Dashboard</Text>
          <Text style={{ textAlign: 'center', color: theme.colors.muted, marginTop: 6 }}>Hi {userData?.name || 'Supplier'}</Text>
          <View style={{ height: theme.spacing.lg }} />
          <PrimaryButton title="Post Waste" onPress={() => navigation.navigate('PostWaste')} />
          <View style={{ height: theme.spacing.md }} />
          <PrimaryButton title="My Posts" onPress={() => navigation.navigate('MyPosts')} />
          <View style={{ height: theme.spacing.md }} />
          <PrimaryButton title="Profile" onPress={() => navigation.navigate('Profile')} />
          <View style={{ height: theme.spacing.md }} />
          <PrimaryButton title="Logout" onPress={logout} />
        </Card>
      </View>
    </GradientBackground>
  )
}

export default SupplierHome