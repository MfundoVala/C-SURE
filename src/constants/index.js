import COLORS from "./color"
import Start_BG from "../../assets/images/Start_BG.jpg"
import Logo from "../../assets/images/logo.png"
import LOGIN_BG from "../../assets/images/LOGIN_BG.jpg"
import APP_BG from "../../assets/images/APP_BG.jpg"
import google from "../../assets/images/google.png"
import meta from "../../assets/images/meta.png"
import email from "../../assets/images/email.png"
import palm from "../../assets/images/palm.png"

const IMAGES = {
    Start_BG,
    Logo,
    LOGIN_BG,
    google,
    meta,
    email,
    APP_BG,
    palm
}

const SIZES = {
    padding: 19,
    borderRadius: 25,
    h1: 36,
    h2: 23,
    h3: 20,
    h4: 18,
    h5: 16,
    h6: 14
}

const SHADOW = {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 10,
}

const FONTS = {
    h1_Bold: {fontSize: SIZES.h1, fontFamily: "RobotoBold"}, 
    h1_ExtraBold: {fontSize: SIZES.h1, fontFamily: "RobotoExtraBold"}, 
    h1_Light: {fontSize: SIZES.h1, fontFamily: "RobotoLight"}, 
    h1_Medium: {fontSize: SIZES.h1, fontFamily: "RobotoMedium"}, 
    h1_Regular: {fontSize: SIZES.h1, fontFamily: "RobotoRegular"}, 
    h2_Bold: {fontSize: SIZES.h2, fontFamily: "RobotoBold"}, 
    h2_ExtraBold: {fontSize: SIZES.h2, fontFamily: "RobotoExtraBold"}, 
    h2_Light: {fontSize: SIZES.h2, fontFamily: "RobotoLight"}, 
    h2_Medium: {fontSize: SIZES.h2, fontFamily: "RobotoMedium"}, 
    h2_Regular: {fontSize: SIZES.h2, fontFamily: "RobotoRegular"}, 
    h3_Bold: {fontSize: SIZES.h3, fontFamily: "RobotoBold"}, 
    h3_ExtraBold: {fontSize: SIZES.h3, fontFamily: "RobotoExtraBold"}, 
    h3_Light: {fontSize: SIZES.h3, fontFamily: "RobotoLight"}, 
    h3_Medium: {fontSize: SIZES.h3, fontFamily: "RobotoMedium"}, 
    h3_Regular: {fontSize: SIZES.h3, fontFamily: "RobotoRegular"}, 
    h4_Bold: {fontSize: SIZES.h4, fontFamily: "RobotoBold"}, 
    h4_ExtraBold: {fontSize: SIZES.h4, fontFamily: "RobotoExtraBold"}, 
    h4_Light: {fontSize: SIZES.h4, fontFamily: "RobotoLight"}, 
    h4_Medium: {fontSize: SIZES.h4, fontFamily: "RobotoMedium"}, 
    h4_Regular: {fontSize: SIZES.h4, fontFamily: "RobotoRegular"}, 
    h5_Bold: {fontSize: SIZES.h5, fontFamily: "RobotoBold"}, 
    h5_ExtraBold: {fontSize: SIZES.h5, fontFamily: "RobotoExtraBold"}, 
    h5_Light: {fontSize: SIZES.h5, fontFamily: "RobotoLight"}, 
    h5_Medium: {fontSize: SIZES.h5, fontFamily: "RobotoMedium"}, 
    h5_Regular: {fontSize: SIZES.h5, fontFamily: "RobotoRegular"}, 
    h6_Bold: {fontSize: SIZES.h6, fontFamily: "RobotoBold"}, 
    h6_ExtraBold: {fontSize: SIZES.h6, fontFamily: "RobotoExtraBold"}, 
    h6_Light: {fontSize: SIZES.h6, fontFamily: "RobotoLight"}, 
    h6_Medium: {fontSize: SIZES.h6, fontFamily: "RobotoMedium"}, 
    h6_Regular: {fontSize: SIZES.h6, fontFamily: "RobotoRegular"}, 
}

export {COLORS, SIZES, FONTS, SHADOW, IMAGES}

