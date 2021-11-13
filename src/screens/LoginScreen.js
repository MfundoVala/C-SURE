import React from 'react';
import { View, Text, Image, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, FONTS, IMAGES } from "../constants"

const styles = StyleSheet.create({
    container: {
        padding: SIZES.padding,
        paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 10,
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
    }
})


export default function onBoardingScreen({ navigation }) {
    return <View style={{ width: "100%", height: "100%" }}>
        <StatusBar barStyle="light-content" translucent={true} backgroundColor={"transparent"} />
        <Image style={styles.img} source={IMAGES.Start_BG} resizeMode="stretch" />
        <View style={styles.container}>
            <Text style={{ ...FONTS.h3_Regular, color: COLORS.white }}>Insure your <Text style={{ ...FONTS.h3_Bold, color: COLORS.white }}>SAMSUNG GALAXY S10 </Text>
                today for as little as R106 pm.
            </Text>

            {/* Logo section */}
            <Image style={styles.logo} source={IMAGES.Logo} resizeMode="stretch" />

            {/* Description section */}
            <Text style={FONTS.h1_Bold}>Molo!</Text>
            <Text style={FONTS.h3_Bold}>{"We are C-SURE \nyour one snap insurance app"}</Text>

            {/* Join us button */}
            <TouchableOpacity style={styles.btn}>
                <Text style={{ ...FONTS.h1_Bold, fontSize: 30 }} >JOIN US</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{ ...FONTS.h3_Bold, color: COLORS.white, alignSelf: 'center' }}>Already a member?
                    <Text style={{ ...FONTS.h3_Bold, color: COLORS.primary, }}> Sign in</Text>
                </Text>
            </TouchableOpacity>
        </View>
    </View>
}