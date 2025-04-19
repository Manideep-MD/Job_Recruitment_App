import {StyleSheet} from 'react-native';
import {ThemeColors} from '../../theme/themeConfig';

export const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      paddingTop: 40,
      alignItems: 'center',
      height: '100%',
    },
    input: {
      width: 327,
      height: 46,
      borderWidth: 1,
      borderRadius: 10,
      paddingRight: 14,
      paddingLeft: 14,
      borderColor: theme.borderColor,
      color: theme.text,
    },
    inputContainer: {width: 327, height: 69, gap: 5},
    signInTextContainer: {width: 327, height: 84},
    signInText: {
      fontSize: 32,
      fontWeight: 700,
      verticalAlign: 'middle',
      color: theme.text,
    },
    mainImage: {width: 63.1, height: 88},
    secondImage: {width: 33, height: 32},
    imageContainer: {gap: 10, paddingBottom: 20},
    inputsContainer: {width: 327, height: 267, gap: 30},
    forgotContainer: {alignItems: 'flex-end', width: 327},
    forgotText: {fontSize: 12, fontWeight: 600, color: theme.lightBlue},
    button: {
      width: 327,
      height: 48,
      backgroundColor: theme.buttonColor,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnText: {
      color: theme.background,
      fontWeight: 500,
      letterSpacing: -1,
    },
    label: {
      color: theme.cardDescriptionText,
    },
    linkText: {
      fontSize: 12,
      fontWeight: 600,
      textAlign: 'center',
    },
  });
