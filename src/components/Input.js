import React from 'react';
import { TouchableOpacity, StyleSheet, TextInput } from "react-native"
import { COLORS, SIZES, FONTS } from "../constants"

const styles = StyleSheet.create({
    input: {
        height: 42,
        width: "92%", 
        borderWidth: 2,
        borderColor: COLORS.secondary,
        borderRadius: 25, 
        color: COLORS.black,
        paddingLeft: 15, 
        ...FONTS.h6_Bold
    }
})

export default function Card(props) {

    let data={}

    for (let key in props){
        if (key !== "style"){
            data = {...data, [key]: props[key]}
        }
    }

    return <TextInput style={{...styles.input, ...props.style}} {...data}  />
}