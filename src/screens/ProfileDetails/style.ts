import {StyleSheet} from 'react-native';
import {ThemeColors} from '../../theme/themeConfig';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 50,
      gap: 20,
      backgroundColor: theme.background,
      width: wp('100%'),
    },
    input: {
      width: wp('90%'),
      height: 44,
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: 8,
      justifyContent: 'center',
      paddingHorizontal: 10,
      marginTop: 10,
      color:theme.text
    },
    mobileContainer: {
      width: wp('90%'),
      height: 44,
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: 8,
      overflow: 'hidden',
      marginTop: 10,
    },
    countryCodeInput: {
      width: 70,
      height: '100%',
      borderRightWidth: 1,
      borderRightColor: theme.borderColor,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
      color:theme.text
    },
    mobileInput: {
      flex: 1,
      paddingHorizontal: 10,
      color:theme.text
    },
    button: {
      width: wp('90%'),
      height: 48,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: theme.background,
      fontWeight: '500',
      letterSpacing: -1,
    },
    errorText: {
      color: 'red',
      fontSize: 12,
      alignSelf: 'flex-start',
      marginLeft: 20,
    },
    profileButton: {
      marginBottom: 10,
      position: 'relative',
    },
    previewProfileImage: {
      width: 90,
      height: 90,
      borderRadius: 60,
      backgroundColor: '#eee',
    },
    profilePictureEditIcon: {
      position: 'absolute',
      bottom: 0,
      right: 5,
      backgroundColor: theme.background,
      borderRadius: 15,
      padding: 5,
      elevation: 5,
    },
    cameraIconText: {
      fontSize: 16,
    },
  });
