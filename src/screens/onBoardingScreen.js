import React, { useState } from 'react';
import { View, Text, Image, StatusBar, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { COLORS, SIZES, FONTS, IMAGES } from "../constants"
import Icon from 'react-native-vector-icons/MaterialIcons';

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


    const [modalVisible, setModalVisible] = useState(false);

    function SecondScreen() {

        const styles2 = {
            btn: {
                ...styles.btn,
                marginTop: 0,
                flexDirection: 'row',
                alignItems: 'center',
            }
        }

        function CustomBtn(icon, title, action, color, color2) {
            return <TouchableOpacity
                onPress={() => navigation.navigate("Home1")}
                style={{ ...styles2.btn, backgroundColor: color || COLORS.white }}
            >
                <Image style={{ maxWidth: 60, height: 40, marginRight: 15 }} source={icon} resizeMode="contain" />
                <Text style={{ ...FONTS.h3_Bold, color: color2 || COLORS.white }}>{title}</Text>
            </TouchableOpacity>
        }

        return <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={{ width: "100%", height: "100%" }}>
                <StatusBar barStyle="dark-content" translucent={true} backgroundColor={"white"} />
                <Image style={styles.img} source={IMAGES.LOGIN_BG} resizeMode="stretch" />
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: -40 }}>
                        <Icon name="arrow-back" size={30} color={COLORS.black} />
                    </TouchableOpacity>

                    {/* // Title */}
                    <Text style={{ ...FONTS.h1_Bold, color: COLORS.white, marginVertical: "25%" }}>{"Let's get \nyou signed up. "}</Text>

                    {/* // Buttons Section */}
                    {CustomBtn(IMAGES.google, "Sign up with Google", null, COLORS.secondary)}
                    {CustomBtn(IMAGES.meta, "Sign up with Meta", null, COLORS.primary)}
                    {CustomBtn(IMAGES.email, "Sign up with Email", null, COLORS.white, COLORS.primary)}

                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Text style={{ ...FONTS.h3_Bold, color: COLORS.white, alignSelf: 'center' }}>Already a member?
                            <Text style={{ ...FONTS.h3_Bold, color: COLORS.primary, }}> Sign in</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    }

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
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={{ ...FONTS.h3_Bold, color: COLORS.white, alignSelf: 'center' }}>Already a member?
                    <Text style={{ ...FONTS.h3_Bold, color: COLORS.primary, }}> Sign in</Text>
                </Text>
            </TouchableOpacity>
        </View>

        {/* // Second screen */}
        {SecondScreen()}
    </View>
}