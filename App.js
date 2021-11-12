import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {


  async function changePicture() {
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

        if (!result.cancelled) {
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
            // Just me assigning the image url to be seen in the view
            console.log(results, results.faces[0].age);
            alert("You are " + results.faces[0].age)
          }).catch(error => {
            console.error(error);
          });
        }
      }
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Upload" onPress={changePicture} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
