import { StyleSheet } from "react-native";
import { ThemeColors } from "../../theme/themeConfig";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      paddingTop: 40,
      alignItems: 'center',
      height: '100%',
    },
    titleContainer: {width: 349, height: 84},
    labelText: {
      fontSize: 12.92,
      fontWeight: '400',
    },
    subHeading: {
      textAlign: 'center',
      fontSize: 14,
      fontWeight: '500',
      color: theme.grey,
      lineHeight: 18.4,
    },
    expertText: {
      fontSize: 32,
      fontWeight: '700',
      textAlign: 'center',
      color: theme.text,
    },
    headerContainer: {width: 349, height: 69, marginTop: 20},
    button: {
      width: 327,
      height: 48,
      backgroundColor: theme.buttonColor,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 70,
    },
    btnText: {
      color: theme.background,
      fontWeight: '500',
      letterSpacing: -1,
    },
    checkboxContainer: {
      marginBottom: 30,
      width: wp('90%'),
      height: 36,
      borderWidth: 1,
      borderColor: '#DDDDDD',
      justifyContent: 'center',
      paddingLeft: 10,
      borderRadius: 6.89,
    },
    label: {
      marginLeft: 8,
      fontSize: 16,
    },
  });
