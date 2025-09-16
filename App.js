// App.js
import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, AuthContext } from './src/contexts/AuthProvidor';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import SupplierHome from './src/screens/SupplierHome'
import PostWasteScreen from './src/screens/PostWasteScreen';
import MyPostsScreen from './src/screens/MyPostsScreen';
import PostRequestsScreen from './src/screens/PostRequestsScreen';
import DistributorHome from './src/screens/DistributorHome';
import ListingsScreen from './src/screens/ListingsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { ActivityIndicator, View } from 'react-native';

const Stack = createStackNavigator();

function AppInner() {
  const { user, userData, initializing } = useContext(AuthContext);

  if (initializing) {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : userData?.role === 'supplier' ? (
          <>
            <Stack.Screen name="SupplierHome" component={SupplierHome} options={{ title: 'Supplier Dashboard' }} />
            <Stack.Screen name="PostWaste" component={PostWasteScreen} options={{ title: 'Post Waste' }} />
            <Stack.Screen name="MyPosts" component={MyPostsScreen} options={{ title: 'My Posts' }} />
            <Stack.Screen name="PostRequests" component={PostRequestsScreen} options={{ title: 'Requests' }} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="DistributorHome" component={DistributorHome} options={{ title: 'Distributor Dashboard' }} />
            <Stack.Screen name="Listings" component={ListingsScreen} options={{ title: 'Available Waste' }} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
