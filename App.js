import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import LoginScreen from './screens/login'
import { Btn, Combobox } from './components';
import { COLORS, SIZES, FONTS_FAMILY, FONTS, SHADOW } from "./constants"
import bgImage from './assets/bgImage.jpg'
import React, { useState, useEffect, useCallback } from "react"





export default function App() {

  // A function that allow the user to access his camera
  async function takePicture() {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to access your gallery!');
      } else {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          base64: true,
          aspect: [1, 1],
          quality: 1,
        });

        return result;
      }
    }
  }

  async function onUploadPictureClicked() {
    // Calling Take Picture Function
    const result = await takePicture();

    if (!result.cancelled) {

      // Creating the image
      const image = {
        uri: result.uri,
        type: 'image/jpeg',
        name: 'myImage' + '-' + Date.now() + '.jpg'
      }

      // Instantiate a FormData() object
      const imgBody = new FormData();
      // append the image to the object with the title 'image'
      imgBody.append('data', image);

      console.log(imgBody)
      const url = `https://api.everypixel.com/v1/faces`;
      // Perform the request. Note the content type - very important
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': "Basic V0dGYmJwUkV1YmliNExtSTk2TWEzakRZOmE3a2luOXZyNG9EcWtqc2RScXBaNGdLeENZY1QzMW5CYUtGSjdoc3RUb0I3YnAzdQ=="
        },
        body: imgBody

      }).then(res => res.json()).then(results => {
        // Getting the data back from the API
        alert("You are " + results.faces[0].age)
      }).catch(error => {
        console.error(error);
      });
    }
  }

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
        'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyD_JvXyKj3DlEc2CdW_6nV2fIqDWZBsfdM',
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
      console.log(responseJson);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <ImageBackground source={bgImage} resizeMode="stretch" style={styles.background} />

      <Btn title="Text Recognition" onPress={onUploadIDClicked} />
      <Btn style={{ marginTop: SIZES.padding * 2, backgroundColor: COLORS.secondary }} title="Upload" onPress={onUploadPictureClicked} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: SIZES.padding,
      paddingTop: Platform.OS === "ios" ? 40 : StatusBar.currentHeight,
      width: '100%',
      backgroundColor: COLORS.white
  },
  background: {
      position: 'absolute',
      top: 0,
      left: 0,
      flex: 1,
      zIndex: 0
  },
  Box: {
      ...SHADOW,
      borderRadius: SIZES.smallRadius,
      padding: SIZES.padding * 3,
      marginVertical: SIZES.padding,
      width: "48%",
      alignItems: "center",
      justifyContent: "center",
  },
  modalContainer2: {
      backgroundColor: COLORS.white,
      borderTopLeftRadius: SIZES.radius,
      borderTopRightRadius: SIZES.radius,
      height: "100%",
      alignItems: "center",
  },
  navBar: {
      width: "100%",
      minHeight: 60,
      backgroundColor: COLORS.white,
      justifyContent: 'center',
      padding: SIZES.padding,
      alignItems: "center",
  },
})
