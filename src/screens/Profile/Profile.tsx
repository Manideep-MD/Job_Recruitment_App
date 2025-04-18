import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ThemeColors} from '../../theme/themeConfig';
import {useCustomTheme} from '../../theme/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {useAuth} from '../../context/AuthContext';
import Loader from '../../components/Loader/Loader';
import {SCREENS} from '../../constants/screenNames';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {clearProfile} from '../../redux/reducers/userReducer';
import {clearJobs} from '../../redux/reducers/savedJobsReducer';
import {SET_PROFILE} from '../../redux/reducers/tokenReducer';

const Profile = () => {
  const {theme} = useCustomTheme();
  const styles = createStyles(theme);
  const {logout, loading} = useAuth();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logout();
    dispatch(clearJobs());
    dispatch(clearProfile());
    dispatch(SET_PROFILE(false));
    navigation.navigate(SCREENS.LOGIN)
  };

  const NavigateProfile = () => {
    navigation.navigate(SCREENS.PROFILE_DETAILS,{routeName:'profile'});
  };

  return (
    <>
      <CustomHeader title={'Settings'} />
      <View style={styles.container}>
        <View style={styles.premiumCard}>
          <Text style={styles.premiumTitle}>Premium Membership</Text>
          <Text style={styles.premiumSubtitle}>Upgrade for more features</Text>
        </View>

        <View style={styles.sectionsWrapper}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>Account</Text>
            </View>

            <View style={styles.sectionContent}>
              <TouchableOpacity
                style={styles.itemRow}
                onPress={NavigateProfile}>
                <View style={styles.itemLeft}>
                  <Ionicons name="person-outline" size={24} />
                  <Text style={[styles.itemText, {color: theme.text}]}>
                    Profile
                  </Text>
                </View>
                <AntDesign name="right" size={20} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.itemRow}>
                <View style={styles.itemLeft}>
                  <Feather name="lock" size={20} />
                  <Text style={[styles.itemText, {color: theme.text}]}>
                    Password
                  </Text>
                </View>
                <AntDesign name="right" size={20} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.itemRow}>
                <View style={styles.itemLeft}>
                  <Ionicons name="notifications-outline" size={24} />
                  <Text style={[styles.itemText, {color: theme.text}]}>
                    Notifications
                  </Text>
                </View>
                <AntDesign name="right" size={24} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>More</Text>
            </View>

            <TouchableOpacity style={styles.itemRow}>
              <View style={styles.itemLeft}>
                <FontAwesome name="star-o" size={20} />
                <Text style={[styles.itemText, {color: theme.text}]}>
                  Rate & Review
                </Text>
              </View>
              <AntDesign name="right" size={20} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.itemRow}>
              <View style={styles.itemLeft}>
                <AntDesign name="questioncircleo" size={20} />
                <Text style={[styles.itemText, {color: theme.text}]}>Help</Text>
              </View>
              <AntDesign name="right" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

    </>
  );
};

export default Profile;

const createStyles = (theme: ThemeColors) =>
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
      backgroundColor: '#6B4EFF',
      padding: 15,
    },
    premiumTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.background,
    },
    premiumSubtitle: {
      fontSize: 14,
      fontWeight: '400',
      color: '#E7E7FF',
    },
    sectionsWrapper: {
      width: wp('100%'),
      height: 376,
    },
    section: {
      gap: 10,
    },
    sectionHeader: {
      width: wp('100%'),
      height: 24,
      justifyContent: 'center',
      paddingLeft: 17,
    },
    sectionHeaderText: {
      fontSize: 18,
      fontWeight: '700',
      verticalAlign: 'middle',
      color: theme.text,
    },
    sectionContent: {
      width: wp('100%'),
      height: 168,
    },
    itemRow: {
      width: wp('100%'),
      height: 56,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
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
      paddingTop: heightPercentageToDP('5%'),
    },
    logoutText: {
      color: '#979C9E',
      fontSize: 16,
      fontWeight: '400',
      textAlign: 'center',
    },
  });
