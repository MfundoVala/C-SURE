import React, { useState } from 'react';
import { View, Text, Image, StatusBar, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { COLORS, SIZES, FONTS, IMAGES } from "../constants"
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Card } from "../components"

const styles = StyleSheet.create({
    IDCard: {
        marginTop: 30,
        borderRadius: SIZES.borderRadius,
        backgroundColor: COLORS.black,
        padding: SIZES.padding * 1.5,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: SIZES.padding * 2,
    },

    imgProfile: {
        width: 110,
        height: 110,
        borderRadius: 200,
        borderWidth: 2,
        borderColor: COLORS.white,
        marginRight: 20
    },
    cardWrapper: {
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: 10
    }
})


export default function quoteScreen(props) {

    return <View style={{ width: "100%", height: "100%", marginTop: -20, paddingBottom: 30 }}>

        {/* // Identity Card */}
        <View style={styles.IDCard}>
            <Icon name="account-circle" style={styles.imgProfile} size={110} color={COLORS.white} />
            <View style={{ alignItems: 'center' }}>
                <Text style={{ ...FONTS.h3_Bold, color: COLORS.white }}>Mfundo Cele</Text>
                <Text style={{ ...FONTS.h3_Bold, color: COLORS.accent, fontSize: 64 }}>30</Text>
                <Text style={{ ...FONTS.h3_Bold, color: COLORS.white }}>Years Old</Text>
            </View>
        </View>

        <Text style={{ ...FONTS.h3_Medium, marginVertical: 20 }} >PERSONAL</Text>
        <ScrollView style={{ flex: 1, marginBottom: 0 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: "5%",
                marginBottom: 0
            }}>

            <View style={styles.cardWrapper}>
                <Card icon={IMAGES.email} style={{ width: 80, height: 80, borderRadius: 15 }} />
                <Text style={{ ...FONTS.h5_Medium, marginLeft: 15 }} >Life Cover - R380 pm</Text>
            </View>

            <View style={styles.cardWrapper}>
                <Card icon={IMAGES.email} style={{ width: 80, height: 80, borderRadius: 15 }} />
                <View style={{ marginLeft: 15 }}>
                    <Text style={{ ...FONTS.h5_Medium }} >Dependants - FREE! (Ts & Cs apply)</Text>
                    <Text style={{ ...FONTS.h5_Medium }} >Family - R180 pm (Ts & Cs apply)</Text>
                </View>
            </View>

            <View style={styles.cardWrapper}>
                <Card icon={IMAGES.email} style={{ width: 80, height: 80, borderRadius: 15, backgroundColor: COLORS.accent }} />
                <View style={{ marginLeft: 15 }}>
                    <Text style={{ ...FONTS.h4_Bold }} >Snap a quote</Text>
                    <Text style={{ ...FONTS.h6_Regular }} >Snap a pic if your care to get a quote.</Text>
                </View>
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={null}>
                    <Icon name="photo-camera" size={40} color={COLORS.black} />
                </TouchableOpacity>
            </View>

            <View style={styles.cardWrapper}>
                <Card icon={IMAGES.email} style={{ width: 80, height: 80, borderRadius: 15, backgroundColor: COLORS.accent }} />
                <View style={{ marginLeft: 15 }}>
                    <Text style={{ ...FONTS.h4_Bold }} >Snap a quote</Text>
                    <Text style={{ ...FONTS.h6_Regular }} >Snap a pic if your care to get a quote.</Text>
                </View>
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={null}>
                    <Icon name="photo-camera" size={40} color={COLORS.black} />
                </TouchableOpacity>
            </View>

        </ScrollView>
        <TouchableOpacity style={{alignItems: "center"}}>
            <Text style={{ ...FONTS.h5_Bold }}>Did we get this wrong? <Text style={{ ...FONTS.h4_Bold, color: COLORS.primary }}>Enter your correct age.</Text></Text>
        </TouchableOpacity>

    </View>
}