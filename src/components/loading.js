import React from 'react'
import { View, Modal, StatusBar, Text } from 'react-native'
import {COLORS, FONTS} from "../constants"
import LottieView from 'lottie-react-native';

export default function Loading(props) {
    return <Modal
        style={{ flex: 1 }}
        animationType="slide"
        transparent={true}
        visible={props.isLoading}
        onRequestClose={() => null}
    >

        <View style={{ width: '100%', flex: 1, backgroundColor: props.light ? COLORS.white : "rgba(0, 0, 0, 0.7)", justifyContent: "center" }}>
            <StatusBar barStyle={!props.light ? "light-content" : "dark-content"} translucent={true} backgroundColor={props.light ? COLORS.white : "rgba(0, 0, 0, 0.7)"} />
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <LottieView
                style={{ width: "78%", alignSelf: "center" }}
                autoPlay
                loop
                source={require("../../assets/animations/loading.json")}
            />
            <Text style={{...FONTS.h2_Regular, color: props.light ? COLORS.primary : COLORS.white}}>Please Wait...</Text>
            </View>
        </View>
    </Modal>
}