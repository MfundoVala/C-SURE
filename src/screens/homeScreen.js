import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StatusBar, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { COLORS, SIZES, FONTS, IMAGES } from "../constants"
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Card, Btn } from "../components"
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import QuoteScreen from './quoteScreen';

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
    }
})


export default function HomeScreen({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);

    function QuoteModal() {

        const cameraRef = useRef();
        const [hasPermission, setHasPermission] = useState(null);
        const [type, setType] = useState(Camera.Constants.Type.front);
        const [isPreview, setIsPreview] = useState(false);
        const [isDetected, setIsDetected] = useState(false);
        const [countDown, setCountDown] = useState(5)
        const [pageTitle, setPageTitle] = useState("Snap a quote")
        const [showPage, setShowPage] = useState(1)
        const [data, setData] = useState(null)

        async function requestCameraPermission() {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        function init() {
            setIsPreview(false)
            setIsDetected(false)
            setCountDown(5)
            setShowPage(1)
        }

        const onContinueClicked = () => {
            init();
            setPageTitle('Your quote')
            setShowPage(2)
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
            setIsDetected(true);

            let intervalID = setInterval(() => {
                setCountDown(prev => {

                    if (prev - 1 === 0) {
                        clearInterval(intervalID)
                    }

                    return prev - 1
                })

            }, 1000)


            setTimeout(async () => {

                if (cameraRef.current) {
                    const options = { quality: 1, base64: true };
                    const data = await cameraRef.current.takePictureAsync(options);
                    const source = data.base64;

                    setData(data.uri)

                    if (source) {
                        setIsPreview(true);
                        await cameraRef.current.pausePreview();
                    }
                }
            }, 4000)
        }

        const styles2 = {
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
        }

        return <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
                init();
            }}
        >
            <View style={{ width: "100%", height: "100%" }}>
                <StatusBar barStyle="dark-content" translucent={true} backgroundColor={"transparent"} />
                <Image style={{...styles.img, marginTop: -38}} source={IMAGES.APP_BG} resizeMode="stretch" />
                <View style={{ ...styles.container, paddingTop: 0 }}>

                    {/* // Top Header */}
                    <View style={{ ...styles.topHeader, justifyContent: "flex-start" }}>
                        <TouchableOpacity onPress={() => {
                            setModalVisible(false)
                            init();
                        }}>
                            <Icon name="arrow-back" size={30} color={COLORS.black} />
                        </TouchableOpacity>
                        <Text style={{ ...FONTS.h1_Bold, fontSize: 25, marginLeft: 15 }}>{pageTitle}</Text>
                    </View>

                    {/* Middle section */}
                    <View style={{
                        marginTop: "2.6%",
                        marginHorizontal: -SIZES.padding,
                        height: "100%",
                    }}>
                        {showPage === 1 && hasPermission && <Camera
                            style={styles2.camera}
                            type={type}
                            ref={cameraRef}
                            faceDetectorSettings={{
                                mode: FaceDetector.FaceDetectorMode.accurate
                            }}
                            onFacesDetected={!isPreview ? () => takePicture() : null}
                        >
                            <View style={styles2.buttonContainer}>
                                <TouchableOpacity
                                    style={styles2.button}
                                    onPress={() => {
                                        setType(
                                            type === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back
                                        );
                                    }}>
                                    <Text style={styles2.text}> Flip </Text>
                                </TouchableOpacity>
                            </View>
                        </Camera>}

                        {showPage === 1 && !hasPermission && <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                            <Text style={FONTS.h1_Bold}>We do not have the permission to access your camera. Please do give access.</Text>
                            <TouchableOpacity style={{ backgroundColor: COLORS.secondary, paddingVertical: 8, width: "92%", borderRadius: SIZES.borderRadius }}
                                onPress={requestCameraPermission}>
                                <Text style={{ ...FONTS.h3_Bold, color: COLORS.white }}>Give Access</Text>
                            </TouchableOpacity>
                        </View>}

                        <View style={{ padding: SIZES.padding }}>
                            {isDetected && <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ ...FONTS.h5_Regular, color: COLORS.primary }}>Your face has been detected.</Text>
                                <Text style={{ ...FONTS.h5_Regular, color: COLORS.primary }}>Please stand still, the picture will be take in {countDown} seconds</Text>
                            </View>}

                            {countDown === 0 && <View style={styles.cardWrapper}>
                                <Btn onPress={() => cancelPreview()} title="Re-take" style={{ width: "40%" }} />
                                <Btn onPress={onContinueClicked} title="Continue" style={{ width: "40%" }} />
                            </View>}


                            {/* // Showing quote screen */}
                            {showPage === 2 && <QuoteScreen data={data} />}
                        </View>
                    </View>



                </View>
            </View>
        </Modal>
    }


    return <><View style={{ width: "100%", height: "100%" }}>
        <StatusBar barStyle="dark-content" translucent={true} backgroundColor={"transparent"} />
        <Image style={styles.img} source={IMAGES.APP_BG} resizeMode="stretch" />
        <View style={styles.container}>

            {/* // Top Header */}
            <View style={styles.topHeader}>
                <Text style={{ ...FONTS.h1_Bold, fontSize: 30, marginRight: 15 }}>Snap a quote</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Icon name="photo-camera" size={40} color={COLORS.black} />
                </TouchableOpacity>
            </View>

            {/* // Identity Card */}
            <View style={styles.IDCard}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                    <Icon name="account-circle" style={styles.imgProfile} size={80} color={COLORS.black} />
                    <Text style={{ ...FONTS.h3_Bold, color: COLORS.white, marginLeft: 10 }}>Mfundo Cele</Text>
                </View>
                <Text style={{ ...FONTS.h3_Regular, color: COLORS.white }}>{"Welcome back "} <Text style={{ ...FONTS.h3_Bold, color: COLORS.white }}>Sizwe.</Text></Text>
                <Text style={{ ...FONTS.h3_Regular, color: COLORS.white, marginBottom: 10 }}>{"Sure is nice to C you again!"}</Text>

                <Image style={styles.palmImg} source={IMAGES.palm} resizeMode="contain" />
            </View>

            <ScrollView style={{ flex: 1, marginBottom: 0 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: "10%",
                    marginBottom: 0
                }}>
                {/* // Personal Section */}
                <Text style={{ ...FONTS.h3_Medium, marginVertical: 20 }} >PERSONAL</Text>
                <View style={styles.cardWrapper}>
                    <View>
                        <Card icon={IMAGES.google} />
                        <Text style={{ ...FONTS.h3_Medium, alignSelf: 'center', marginTop: 5 }}>Me</Text>
                    </View>
                    <View>
                        <Card icon={IMAGES.google} />
                        <Text style={{ ...FONTS.h3_Medium, alignSelf: 'center', marginTop: 5 }}>My Family</Text>
                    </View>
                </View>

                {/* // Stuff Section */}
                <Text style={{ ...FONTS.h3_Medium, marginVertical: 20 }} >STUFF</Text>
                <View style={styles.cardWrapper}>
                    <View>
                        <Card icon={IMAGES.google} style={{ backgroundColor: COLORS.accent }} />
                        <Text style={{ ...FONTS.h3_Medium, alignSelf: 'center', marginTop: 5 }}>My Vehicles</Text>
                        <Text style={{ ...FONTS.h4_Regular, alignSelf: 'center' }}>2017 Mercedes X class</Text>
                    </View>
                    <View>
                        <Card icon={IMAGES.google} style={{ backgroundColor: COLORS.accent }} />
                        <Text style={{ ...FONTS.h3_Medium, alignSelf: 'center', marginTop: 5 }}>My Cellphones</Text>
                        <Text style={{ ...FONTS.h4_Regular, alignSelf: 'center' }}>Samsung galaxy S10...</Text>
                    </View>
                </View>
            </ScrollView>

        </View>
    </View>

        {/* // Quote Screen */}
        {QuoteModal()}
    </>
}