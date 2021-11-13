import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HomeScreen, ClaimScreen, NotificationScreen, ProfileScreen } from "../screens"
import { COLORS } from "../constants"

const Tab = createBottomTabNavigator();

export default function Tabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.black
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="house" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Claims"
                component={ClaimScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Claims',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="file-copy" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={NotificationScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Notifications',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="notifications" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="account-circle" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}