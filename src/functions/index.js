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

async function requestQuote(data) {

  // Creating the image
  const image = {
    uri: data,
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
    return results.faces[0].age
  }).catch(error => {
    console.error(error);
  });
}

async function uploadID(data) {

    const image = data;
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
      "<GOOGLE API KEY>",
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

    return filterDate(responseJson.responses[0].textAnnotations)
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

export { takePicture, requestQuote, uploadID }