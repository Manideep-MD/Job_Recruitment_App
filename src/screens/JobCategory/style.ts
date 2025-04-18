import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {ThemeColors} from '../../theme/themeConfig';
import {StyleSheet} from 'react-native';

export const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      width: wp('100%'),
      paddingTop: 40,
      alignItems: 'center',
    },
    imageContainer: {
      gap: 10,
      paddingBottom: 20,
    },
    mainImage: {
      width: 63.1,
      height: 88,
    },
    secondImage: {
      width: 33,
      height: 32,
    },
    titleContainer: {
      width: 349,
      height: 45,
    },
    titleText: {
      fontSize: 32,
      fontWeight: 700,
      textAlign: 'center',
      color: theme.text,
    },
    descriptionContainer: {
      width: 349,
      height: 69,
      marginTop: 20,
    },
    descriptionText: {
      textAlign: 'center',
      fontSize: 14,
      fontWeight: '500',
      color: theme.grey,
      lineHeight: 18.4,
      letterSpacing: 1,
    },
    tabsContainer: {
      flexDirection: 'row',
      gap: 10,
      paddingTop: 20,
    },
    tabItem: {
      width: wp('45%'),
      height: 248,
      borderWidth: 1,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    tabTitle: {
      fontSize: 24,
      fontWeight: '700',
      letterSpacing: 1,
      textAlign: 'center',
      color: theme.text,
    },
    tabDescription: {
      fontSize: 14,
      fontWeight: '400',
      letterSpacing: 0,
      width: 157,
      textAlign: 'center',
      color: theme.grey,
    },
    button: {
      width: wp('90%'),
      height: 48,
      backgroundColor: '#1D61E7',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50,
    },
    btnText: {
      color: theme.background,
      fontWeight: '500',
      letterSpacing: -1,
    },
  });
