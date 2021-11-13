import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

// A function that allow the user to access his camera
async function takePicture() {
    if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to access your gallery!');
        } else {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                base64: true,
                aspect: [4, 3],
                quality: 1,
            });

            return result;
        }
    }
}

export {takePicture}