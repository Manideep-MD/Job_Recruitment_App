import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {ThemeColors} from '../../theme/themeConfig';
import {StyleSheet} from 'react-native';

export const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center',
      gap: 20,
      paddingTop: 20,
    },
    headerWrapper: {
      // maxWidth:372,
      width: wp('95%'),
      height: 48,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    headerLeft: {
      width: 174,
      height: 48,
      flexDirection: 'row',
      gap: 15,
    },
    profileImage: {
      width: 48,
      height: 48,
      borderRadius: 100,
    },
    headerTextWrapper: {
      width: 174,
      height: 48,
    },
    goodMorningText: {
      fontSize: 16,
      fontWeight: 400,
      letterSpacing: 1,
      color: theme.borderColor,
    },
    nameText: {
      fontSize: 17,
      fontWeight: 700,
      letterSpacing: 1,
      color: theme.text,
    },
    notificationIcon: {
      width: 32,
      height: 32,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: theme.borderColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchFilterWrapper: {
      flexDirection: 'row',
      gap: 10,
    },
    searchWrapper: {
      width: wp('83%'),
      height: 40,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: theme.borderColor,
      // justifyContent: 'center',
      backgroundColor: '#F0F0F0',
      flexDirection: 'row',
    },
    searchIconWrapper: {
      width: 50,
      height: 37,
      borderRightWidth: 1,
      borderColor: theme.borderColor,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F0F0F0',
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
    filterWrapper: {
      width: 40,
      height: 40,
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F0F0F0',
    },
    bannerImage: {
      width: wp('95%'),
      height: 140,
      borderRadius: 8,
    },
    recommendationsHeader: {
      width: wp('90%'),
      height: 40,
      borderBottomWidth: 1,
      borderColor: theme.borderColor,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    recommendationsTitle: {
      fontSize: 16,
      fontWeight: '700',
      letterSpacing: 1,
      color: theme.text,
    },
    seeAllText: {
      fontSize: 16,
      fontWeight: 700,
      letterSpacing: 1,
      color: theme.lightBlueHover,
    },
    jobsListWrapper: {
      alignItems: 'center',
      paddingTop: 20,
    },
    flatListContent: {
      paddingBottom: heightPercentageToDP(43),
    },
    jobCardWrapper: {
      marginBottom: 20,
    },
    emptyText: {
      fontSize: 18,
      color: 'gray',
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchInput: {
      width: '85%',
      borderRadius: 8,
      color: theme.text,
      paddingLeft: 10,
    },
  });
