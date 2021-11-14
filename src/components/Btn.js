import React from 'react';
import { TouchableOpacity, StyleSheet, Image, Text } from "react-native"
import { COLORS, FONTS } from "../constants"

const styles = StyleSheet.create({
    btn: {
        marginBottom: 20,
        paddingVertical: 8,
        width: "100%",
        backgroundColor: COLORS.secondary,
        marginVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 10,
    }
})

export default function Btn(props) {
    return <TouchableOpacity
        onPress={props.onPress}
        style={{ ...styles.btn, ...props.style }}
    >
        <Text style={{ ...FONTS.h3_Bold, color: COLORS.white, ...props.textStyle }}>{props.title}</Text>
    </TouchableOpacity>
}


