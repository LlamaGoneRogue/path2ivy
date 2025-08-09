import React, { useEffect, useState } from 'react';
import { registerForPushNotificationsAsync } from './src/utils/notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import DashboardScreen from './src/screens/DashboardScreen';
import CollegesScreen from './src/screens/CollegesScreen';
import ScholarshipsScreen from './src/screens/ScholarshipsScreen';
import MentorsScreen from './src/screens/MentorsScreen';
import ExtracurricularsScreen from './src/screens/ExtracurricularsScreen';
import ProgressScreen from './src/screens/ProgressScreen';

const Tab = createBottomTabNavigator();

const theme = {
  colors: {
    primary: '#2563eb', // Blue-600
    accent: '#f59e0b', // Amber-500
    background: '#f8fafc', // Gray-50
    surface: '#ffffff',
    text: '#1f2937', // Gray-800
    placeholder: '#6b7280', // Gray-500
  },
};

export default function App() {
  const [pushToken, setPushToken] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        if (token) {
          setPushToken(token);
          await AsyncStorage.setItem('expo_push_token', token);
        }
      } catch (e) {
        // no-op
      }
    })();
  }, []);

  useEffect(() => {
    const subReceived = Notifications.addNotificationReceivedListener(() => {
      // could update in-app badge/state
    });
    const subResponse = Notifications.addNotificationResponseReceivedListener(() => {
      // handle when user taps notification
    });
    return () => {
      subReceived.remove();
      subResponse.remove();
    };
  }, []);
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap;

              if (route.name === 'Dashboard') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Colleges') {
                iconName = focused ? 'school' : 'school-outline';
              } else if (route.name === 'Scholarships') {
                iconName = focused ? 'card' : 'card-outline';
              } else if (route.name === 'Mentors') {
                iconName = focused ? 'people' : 'people-outline';
              } else if (route.name === 'Activities') {
                iconName = focused ? 'trophy' : 'trophy-outline';
              } else if (route.name === 'Progress') {
                iconName = focused ? 'analytics' : 'analytics-outline';
              } else {
                iconName = 'help-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.placeholder,
            tabBarStyle: {
              backgroundColor: theme.colors.surface,
              borderTopColor: '#e5e7eb',
            },
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        >
          <Tab.Screen 
            name="Dashboard" 
            component={DashboardScreen}
            options={{ title: 'Path2Ivy' }}
          />
          <Tab.Screen 
            name="Colleges" 
            component={CollegesScreen}
            options={{ title: 'Colleges' }}
          />
          <Tab.Screen 
            name="Scholarships" 
            component={ScholarshipsScreen}
            options={{ title: 'Scholarships' }}
          />
          <Tab.Screen 
            name="Mentors" 
            component={MentorsScreen}
            options={{ title: 'Mentors' }}
          />
          <Tab.Screen 
            name="Activities" 
            component={ExtracurricularsScreen}
            options={{ title: 'Activities' }}
          />
          <Tab.Screen 
            name="Progress" 
            component={ProgressScreen}
            options={{ title: 'Progress' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
