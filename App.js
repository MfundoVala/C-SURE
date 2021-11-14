import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import Tabs from "./src/navigation"
import { takePicture } from "./src/functions"
import { onBoardingScreen, IDScanScreen } from "./src/screens"
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';


const Stack = createStackNavigator();

export default function App() {

  // Asking for permissions
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const { status2 } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    })();
  }, [])


  // Importing fonts
  let [fontsLoaded] = useFonts({
    'RobotoBold': require('./assets/fonts/Roboto-Bold.ttf'),
    'RobotoExtraBold': require('./assets/fonts/Roboto-Black.ttf'),
    'RobotoLight': require('./assets/fonts/Roboto-Light.ttf'),
    'RobotoMedium': require('./assets/fonts/Roboto-Medium.ttf'),
    'RobotoRegular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="onBoarding" component={onBoardingScreen} options={{
            headerShown: false
          }} />

          <Stack.Screen name="Home1" component={Tabs} options={{
            headerShown: false
          }} />

          <Stack.Screen name="Scan" component={IDScanScreen} options={{
            headerShown: false
          }} />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
