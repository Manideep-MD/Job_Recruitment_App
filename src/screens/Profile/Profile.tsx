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

const Profile = () => {
  const {theme} = useCustomTheme();
  const styles = createStyles(theme);
  const {logout, loading} = useAuth();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logout();
  };
  return (
    <>
      <CustomHeader title={'Settings'} />
      <View
        style={{
          alignItems: 'center',
          width: '100%',
          height: '100%',
          gap: 30,
          backgroundColor: theme.background,
        }}>
        <View
          style={{
            width: 347,
            height: 80,
            borderRadius: 12,
            backgroundColor: '#6B4EFF',
            padding: 15,
          }}>
          <Text
            style={{fontSize: 18, fontWeight: 700, color: theme.background}}>
            Premium Membership
          </Text>
          <Text style={{fontSize: 14, fontWeight: 400, color: '#E7E7FF'}}>
            Upgrade for more features
          </Text>
        </View>
        <View style={{width: 375, height: 376, marginTop: 40}}>
          <View style={{width: 375, height: 246, gap: 10}}>
            <View
              style={{
                width: 375,
                height: 24,
                justifyContent: 'center',
                paddingLeft: 17,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  verticalAlign: 'middle',
                }}>
                Account
              </Text>
            </View>
            <View style={{width: 375, height: 168}}>
              <View
                style={{
                  width: 375,
                  height: 56,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  padding: 10,
                }}>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <Ionicons name="person-outline" size={24} />
                  <Text
                    style={{fontSize: 16, fontWeight: 400, color: theme.text}}>
                    Profile
                  </Text>
                </View>
                <AntDesign name="right" size={24} />
              </View>
              <View
                style={{
                  width: 375,
                  height: 56,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  padding: 10,
                }}>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <Feather name="lock" size={24} />
                  <Text
                    style={{fontSize: 16, fontWeight: 400, color: theme.text}}>
                    Password
                  </Text>
                </View>
                <AntDesign name="right" size={24} />
              </View>
              <View
                style={{
                  width: 375,
                  height: 56,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  padding: 10,
                }}>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <Ionicons name="notifications-outline" size={24} />
                  <Text
                    style={{fontSize: 16, fontWeight: 400, color: theme.text}}>
                    Notifications
                  </Text>
                </View>
                <AntDesign name="right" size={24} />
              </View>
            </View>
          </View>
          <View style={{width: 375, height: 148, gap: 10}}>
            <View
              style={{
                width: 375,
                height: 24,
                justifyContent: 'center',
                paddingLeft: 17,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  verticalAlign: 'middle',
                }}>
                More
              </Text>
            </View>
            <View
              style={{
                width: 375,
                height: 56,
                justifyContent: 'space-between',
                flexDirection: 'row',
                padding: 10,
              }}>
              <View style={{flexDirection: 'row', gap: 10}}>
                <FontAwesome name="star-o" size={24} />
                <Text
                  style={{fontSize: 16, fontWeight: 400, color: theme.text}}>
                  Rate & Review
                </Text>
              </View>
              <AntDesign name="right" size={24} />
            </View>
            <View
              style={{
                width: 375,
                height: 56,
                justifyContent: 'space-between',
                flexDirection: 'row',
                padding: 10,
              }}>
              <View style={{flexDirection: 'row', gap: 10}}>
                <AntDesign name="questioncircleo" size={24} />
                <Text
                  style={{fontSize: 16, fontWeight: 400, color: theme.text}}>
                  Help
                </Text>
              </View>
              <AntDesign name="right" size={24} />
            </View>
          </View>
        </View>
        <TouchableOpacity style={{paddingTop: 60}} onPress={handleLogout}>
          <Text
            style={{
              color: '#979C9E',
              fontSize: 16,
              fontWeight: 400,
              textAlign: 'center',
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      {loading && <Loader />}
    </>
  );
};

export default Profile;

const createStyles = (theme: ThemeColors) => StyleSheet.create({});
