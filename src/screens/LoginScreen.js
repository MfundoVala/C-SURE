import React from 'react';
import { View, Text, Image, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, FONTS, IMAGES } from "../constants"
import { Input, Btn } from "../components"
import Icon from 'react-native-vector-icons/MaterialIcons';


const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
        flex: 1,
        width: "100%",
    },
    img: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: "100%",
        width: "100%",
        zIndex: 0
    },
    logo: {
        marginVertical: "20%",
        width: "65%",
        height: "30%",
        alignSelf: "center",
    },
    btn: {
        marginTop: "30%",
        marginBottom: 25,
        paddingVertical: 8,
        width: "92%",
        backgroundColor: COLORS.white,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 10
    },
    bg:{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        right: 0,
        left: 0,
        top: 0,
        backgroundColor: COLORS.primary, 
        borderTopRightRadius: 35,
        zIndex: -1
    }
})


export default function LoginScreen({ navigation }) {
    return <View style={{ width: "100%", height: "100%" }}>
        <StatusBar barStyle="dark-content" translucent={true} backgroundColor={"transparent"} />
        <View style={styles.container}>
            <TouchableOpacity style={{marginTop: 10}} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={30} color={COLORS.black} />
            </TouchableOpacity>

            {/* // Credentials */}
            <View style={{ alignItems: 'center' }}>
            <Text style={{ ...FONTS.h1_Bold, color: COLORS.primary, marginTop: "25%", marginBottom: 20 }}>Login</Text>
                <Input style={{ marginBottom: 20}} placeholder="Email Address" />
                <Input placeholder="Password" />
                <Btn title="Login" />
            </View>

            <View style={styles.bg}></View>


        </View>
    </View>
}