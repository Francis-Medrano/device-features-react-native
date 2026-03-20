import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import AddEntryScreen from '../screens/AddEntryScreen';
import EntriesListScreen from '../screens/EntriesListScreen';
import PhotoCaptureScreen from '../screens/PhotoCaptureScreen';
import TravelEntryScreen from '../screens/TravelEntryScreen';
import { COLORS } from '../styles/globalStyles';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors } from '../styles/themes';

export type RootStackParamList = {
  MainTabs: undefined;
  AddEntry: undefined;
  PhotoCapture: undefined;
  TravelEntry: undefined;
};

export type TabsParamList = {
  EntriesList: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabsParamList>();

// Tab Navigator
function TabNavigator() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 0,
          height: 90,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="EntriesList"
        component={EntriesListScreen}
        options={{
          tabBarLabel: 'Entries',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.primary,
          headerTitleStyle: {
            fontWeight: '600',
            color: colors.text,
          },
          headerBackTitleVisible: false,
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddEntry"
          component={AddEntryScreen}
          options={{
            title: 'Add Entry',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="PhotoCapture"
          component={PhotoCaptureScreen}
          options={{
            title: 'Capture Photo',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="TravelEntry"
          component={TravelEntryScreen}
          options={{
            title: 'Travel Entry',
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
