import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import Tabs from "./src/navigation"
import { takePicture } from "./src/functions"
import { onBoardingScreen, LoginScreen } from "./src/screens"
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';


const Stack = createStackNavigator();

export default function App() {

  async function onUploadIDClicked() {

    const result = await takePicture();

    if (!result.cancelled) {
      const image = result.base64;
      // Performs text detection on the local file

      let body = JSON.stringify({
        requests: [
          {
            image: {
              content: image
            },
            features: [
              {
                type: "TEXT_DETECTION"
              }
            ]
          }
        ]
      });

      let response = await fetch(
        'https://vision.googleapis.com/v1/images:annotate?key=' +
        "AIzaSyD_JvXyKj3DlEc2CdW_6nV2fIqDWZBsfdM",
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: body
        }
      );

      let responseJson = await response.json();
      console.log(responseJson.responses[0].textAnnotations);
      console.log(filterDate(responseJson.responses[0].textAnnotations))
    }
  }

  function filterDate(data) {
    let filteredData = {}

    function checker(key2, i) {
      let count = i + 1;
      let name = ""
      while (data[count].description !== key2 && data[count].description !== key2 + ":" &&
        data[count].description !== key2 + " : " && data[count].description !== key2 + " :" &&
        data[count].description !== key2 + ": ") {
        name += data[count].description
        count++

        if (count >= data.length)
          break;
      }

      return name;
    }

    for (let i = 0; i < data.length; i++) {
      const doc = data[i]
      if (doc.description === "Surname" || doc.description === "Surname:" || doc.description === "Surname: " || doc.description === "Surname :" || doc.description === "Surname : ") {
        filteredData = { ...filteredData, surname: checker("Names", i) }
      } else if (doc.description === "Names" || doc.description === "Names:" || doc.description === "Names: " || doc.description === "Names :" || doc.description === "Names : ")
        filteredData = { ...filteredData, name: checker("Sex", i) };
      else if (doc.description === "Sex" || doc.description === "Sex:" || doc.description === "Sex: " || doc.description === "Sex :" || doc.description === "Sex : ")
        filteredData = { ...filteredData, sex: checker("Nationality", i) };
      else if (doc.description === "Nationality" || doc.description === "Nationality:" || doc.description === "Nationality: " || doc.description === "Nationality :" || doc.description === "Nationality : ")
        filteredData = { ...filteredData, nationality: checker("Identity", i) };
      else if (doc.description === "Number" || doc.description === "Number:" || doc.description === "Number: " || doc.description === "Number :" || doc.description === "Number : ")
        filteredData = { ...filteredData, ID: checker("Date", i) };
      else if (doc.description === "Date" || doc.description === "Date:" || doc.description === "Date: " || doc.description === "Date :" || doc.description === "Date : ") {
        let DOB = checker("Country", i)
        DOB = DOB.slice(DOB.indexOf("ofBirth"), DOB.length)
        if (DOB.indexOf(":") >= 0) {
          DOB = DOB.slice(DOB.indexOf(":") + 1, DOB.length)
        }

        filteredData = { ...filteredData, DOB };
      }
      else if (doc.description === "Country" || doc.description === "Country:" || doc.description === "Country: " || doc.description === "Country :" || doc.description === "Country : ") {
        let placeOfBirth = checker("Signature", i)
        placeOfBirth = placeOfBirth.slice(placeOfBirth.indexOf("ofBirth"), placeOfBirth.length)
        if (placeOfBirth.indexOf(":") >= 0) {
          placeOfBirth = placeOfBirth.slice(placeOfBirth.indexOf(":") + 1, placeOfBirth.length)
        }
        filteredData = { ...filteredData, placeOfBirth };
      }
      else if (doc.description === "Status" || doc.description === "Status:" || doc.description === "Status: " || doc.description === "Status :" || doc.description === "Status : ")
        filteredData = { ...filteredData, status: checker("Signature", i) };
    }

    return filteredData;
  }

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
