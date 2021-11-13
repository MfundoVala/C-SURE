import React from 'react';
import { TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native"
import { COLORS, SIZES } from "../constants"

const styles = StyleSheet.create({
    card: {
        borderRadius: SIZES.borderRadius,
        width: Dimensions.get("window").width * 0.42,
        height: Dimensions.get("window").width * 0.42,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary
    }
})

export default function Card(props) {
    return <TouchableOpacity style={{ ...styles.card, ...props.style }}>
        <Image style={{ height: "30%" }} source={props.icon} resizeMode="contain" />
    </TouchableOpacity>
}