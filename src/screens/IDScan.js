import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StatusBar, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { COLORS, SIZES, FONTS, IMAGES } from "../constants"
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Card, Btn, Loading } from "../components"
import { Camera } from 'expo-camera';
import { uploadID } from "../functions"

const styles = StyleSheet.create({
    container: {
        padding: SIZES.padding,
        paddingBottom: 0,
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
    topHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "8%"
    },
    IDCard: {
        marginTop: 30,
        borderRadius: SIZES.borderRadius,
        backgroundColor: COLORS.secondary,
        padding: SIZES.padding
    },
    palmImg: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        height: 60
    },
    cardWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    imgProfile: {
        width: 80,
        height: 80,
        borderRadius: 200,
        borderWidth: 2,
        borderColor: COLORS.white
    },
    camera: {
        width: "100%",
        height: "50%"
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
})


export default function QuoteModal({ navigation }) {

    const cameraRef = useRef();
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [isPreview, setIsPreview] = useState(false);
    const [isTaken, setIsTaken] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null)

    async function requestCameraPermission() {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    function init() {
        setIsPreview(false)
        setIsTaken(false)
        setIsLoading(false)
    }

    const onContinueClicked = async () => {
        init();
        setIsLoading(true)
        const d = await uploadID(data).then(res => {
            navigation.navigate("Home1", {response: "OK", data: res})
            alert("Thank you! \nYour data has been captured successfully!")
            setIsLoading(false)
        }).catch(err => {
            alert("Oops, Something went wrong, please try again later!")
            init();
        })
    }

    const cancelPreview = async () => {
        await cameraRef.current.resumePreview();
        init();
    };

    useEffect(() => {
        requestCameraPermission();
    }, []);

    async function takePicture() {
        setIsPreview(true);
        setIsTaken(true);

        if (cameraRef.current) {
            const options = { quality: 1, base64: true };
            const data = await cameraRef.current.takePictureAsync(options);
            const source = data.base64;

            setData(source)

            if (source) {
                setIsPreview(true);
                await cameraRef.current.pausePreview();
            }
        }
    }


    return <View style={{ width: "100%", height: "100%" }}>
        <StatusBar barStyle="dark-content" translucent={true} backgroundColor={"transparent"} />
        <Image style={{ ...styles.img }} source={IMAGES.APP_BG} resizeMode="stretch" />
        <View style={{ ...styles.container}}>

            {/* // Top Header */}
            <View style={{ ...styles.topHeader, justifyContent: "flex-start" }}>
                <TouchableOpacity onPress={() => {
                    navigation.replace("Home1", {response: "No"})
                }}>
                    <Icon name="arrow-back" size={30} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={{ ...FONTS.h1_Bold, fontSize: 25, marginLeft: 15 }}>Snap Sure</Text>
            </View>

            {/* Middle section */}
            <View style={{
                marginTop: "2.6%",
                marginHorizontal: -SIZES.padding,
                height: "100%",
            }}>
                {hasPermission && <Camera
                    style={styles.camera}
                    type={type}
                    ref={cameraRef}
                >
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                );
                            }}>
                            <Text style={styles.text}> Flip </Text>
                        </TouchableOpacity>
                    </View>
                </Camera>}

                {!hasPermission && <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                    <Text style={FONTS.h1_Bold}>We do not have the permission to access your camera. Please do give access.</Text>
                    <TouchableOpacity style={{ backgroundColor: COLORS.secondary, paddingVertical: 8, width: "92%", borderRadius: SIZES.borderRadius }}
                        onPress={requestCameraPermission}>
                        <Text style={{ ...FONTS.h3_Bold, color: COLORS.white }}>Give Access</Text>
                    </TouchableOpacity>
                </View>}

                <View style={{ padding: SIZES.padding }}>
                    {!isTaken && <Btn title="Take Picture" onPress={() => takePicture()} style={{marginTop: 0}}/>}
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ ...FONTS.h5_Bold, color: COLORS.primary }}>This picture will be used to fill in your information.</Text>
                        <Text style={{ ...FONTS.h5_Bold, color: COLORS.primary }}>Please, make sure it is clear.</Text>
                    </View>

                    {isTaken && <View style={styles.cardWrapper}>
                        <Btn onPress={() => cancelPreview()} title="Re-take" style={{ width: "40%" }} />
                        <Btn onPress={onContinueClicked} title="Continue" style={{ width: "40%" }} />
                    </View>}


                    {/* // Loading Screen */}
                    <Loading light={true} isLoading={isLoading} />
                </View>
            </View>
        </View>
    </View>
}