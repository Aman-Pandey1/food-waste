// App.js
import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthProvider, AuthContext } from './src/contexts/AuthProvider';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import SupplierHome from './src/screens/SupplierHome'
import PostWasteScreen from './src/screens/PostWasteScreen';
import MyPostsScreen from './src/screens/MyPostsScreen';
import PostRequestsScreen from './src/screens/PostRequestsScreen';
import DistributorHome from './src/screens/DistributorHome';
import ListingsScreen from './src/screens/ListingsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PostDetailsScreen from './src/screens/PostDetailsScreen';
import DistributorAccepted from './src/screens/DistributorAccepted';
import { ActivityIndicator, View } from 'react-native';
import { theme } from './src/components/Theme';
import HeaderGradient from './src/components/HeaderGradient';
import LogoHeader from './src/components/LogoHeader';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function SupplierTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerBackground: () => <HeaderGradient />,
        headerTitle: (props) => <LogoHeader title={props.children} />,
        headerTintColor: '#fff',
        tabBarActiveTintColor: theme.colors.greenDark,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarStyle: {
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 16,
          backgroundColor: '#fff',
          borderRadius: 18,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 0,
          elevation: 8,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = 'home';
          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Post') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'MyPosts') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Dashboard" component={SupplierHome} options={{ title: 'Supplier Dashboard', tabBarLabel: 'Dashboard' }} />
      <Tab.Screen name="Post" component={PostWasteScreen} options={{ title: 'Post Food', tabBarLabel: 'Post Food' }} />
      <Tab.Screen name="MyPosts" component={MyPostsScreen} options={{ title: 'My Posts', tabBarLabel: 'My Posts' }} />
      <Tab.Screen name="Account" component={ProfileScreen} options={{ title: 'Account', tabBarLabel: 'Account' }} />
    </Tab.Navigator>
  );
}

function DistributorTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerBackground: () => <HeaderGradient />,
        headerTitle: (props) => <LogoHeader title={props.children} />,
        headerTintColor: '#fff',
        tabBarActiveTintColor: theme.colors.greenDark,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarStyle: {
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 16,
          backgroundColor: '#fff',
          borderRadius: 18,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 0,
          elevation: 8,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = 'home';
          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Available') {
            iconName = focused ? 'fast-food' : 'fast-food-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Dashboard" component={DistributorHome} options={{ title: 'Distributor Dashboard', tabBarLabel: 'Dashboard' }} />
      <Tab.Screen name="Available" component={ListingsScreen} options={{ title: 'Food Available', tabBarLabel: 'Available' }} />
      <Tab.Screen name="Account" component={ProfileScreen} options={{ title: 'Account', tabBarLabel: 'Account' }} />
    </Tab.Navigator>
  );
}

function AppInner() {
  const { user, userData, initializing } = useContext(AuthContext);

  if (initializing) {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large" color={theme.colors.greenDark} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackground: () => <HeaderGradient />,
          headerTitle: (props) => <LogoHeader title={props.children} />,
          headerTintColor: '#fff',
        }}
      >
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          </>
        ) : userData?.role === 'supplier' ? (
          <>
            <Stack.Screen name="Supplier" component={SupplierTabs} options={{ headerShown: false }} />
            <Stack.Screen name="PostRequests" component={PostRequestsScreen} options={{ title: 'Requests' }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Distributor" component={DistributorTabs} options={{ headerShown: false }} />
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
