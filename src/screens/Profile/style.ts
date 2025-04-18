import {StyleSheet} from 'react-native';
import {ThemeColors} from '../../theme/themeConfig';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      width: '100%',
      height: '100%',
      gap: 30,
      backgroundColor: theme.background,
    },
    premiumCard: {
      width: wp('90%'),
      height: 80,
      borderRadius: 12,
      backgroundColor: theme.darkBlueHover,
      padding: 15,
    },
    premiumTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.background,
    },
    premiumSubtitle: {
      fontSize: 14,
      fontWeight: 400,
      color: theme.cardText,
    },
    sectionsWrapper: {
      width: wp('100%'),
      height: 376,
      alignItems:'center'
    },
    section: {
      gap: 10,
    },
    sectionHeader: {
      width: wp('90%'),
      height: 24,
      justifyContent: 'center',
    },
    sectionHeaderText: {
      fontSize: 18,
      fontWeight: 700,
      verticalAlign: 'middle',
      color: theme.text,
    },
    sectionContent: {
      width: wp('90%'),
      height: 168,
    },
    itemRow: {
      width: wp('90%'),
      height: 56,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    itemLeft: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
    },
    itemText: {
      fontSize: 16,
      fontWeight: '400',
    },
    logoutButton: {
      // paddingTop: hp('5%'),
      width: '30%',
      height: 40,
    },
    logoutText: {
      color: theme.lightgrey,
      fontSize: 16,
      fontWeight: '400',
      textAlign: 'center',
    },
  });
