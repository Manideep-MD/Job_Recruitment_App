import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';
import {saveProfile} from '../../redux/reducers/userReducer';
import {ThemeColors} from '../../theme/themeConfig';
import {useCustomTheme} from '../../theme/ThemeContext';
import {EMAIL_REGEX, MOBILE_REGEX} from '../../constants/Regex';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants/screenNames';
import {SET_PROFILE} from '../../redux/reducers/tokenReducer';
import {dateFormatter} from '../../Utils/dateFormatHelper';

// Form Validation Schema
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, 'Name can only contain letters')
    .required('Name is required'),
  dob: Yup.date().required('Date of birth is required'),
  email: Yup.string()
    .matches(EMAIL_REGEX, 'Invalid email')
    .required('Email is required'),
  mobile: Yup.string()
    .matches(MOBILE_REGEX, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
  gender: Yup.string().required('Gender is required'),
  profile_img: Yup.object().required('Profile Image is required'),
});

const ProfileDetails = () => {
  const {theme} = useCustomTheme();
  const styles = createStyles(theme);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const navigation = useNavigation<any>();

  const pickImage = async setFieldValue => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        compressImageQuality: 0.8,
      });

      setFieldValue('profile_img', {
        uri: image.path,
        type: image.mime,
        name: image.path.split('/').pop(),
      });
    } catch (error) {
      if (error.code === 'E_PICKER_CANCELLED') {
        console.log('User cancelled image picker');
      } else {
        console.error('Image picker error:', error);
      }
    }
  };

  const handleDetails = (values: any) => {
    console.log(values, 'values---------->');
    dispatch(saveProfile(values));
    dispatch(SET_PROFILE(true));
    navigation.navigate(SCREENS.BOTTOM_TAB);
  };


  return (
    <>
      <CustomHeader title={user?.name ? 'Profile' : 'Complete Profile'} />
      <Formik
        enableReinitialize
        initialValues={{
          name: user.name || '',
          dob: user.dob || '',
          email: user.email || '',
          mobile: user.mobile || '',
          gender: user.gender || '',
          countryCode: user.countryCode || '+91',
          profile_img: user.profile_img || null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleDetails}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
          isValid,
        }) => {
          const isFormFilled =
            values.name &&
            values.dob &&
            values.email &&
            values.mobile &&
            values.gender &&
            values.profile_img;

          const isButtonEnabled = isValid && isFormFilled;

          return (
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.profileButton}
                onPress={() => pickImage(setFieldValue)}>
                {values.profile_img ? (
                  <Image
                    source={{uri: values.profile_img.uri}}
                    style={styles.previewProfileImage}
                  />
                ) : (
                  <Image
                    source={{
                      uri: 'https://img.freepik.com/premium-photo/default-male-user-icon-blank-profile-image-green-background-profile-picture-icon_962764-98397.jpg?w=826',
                    }}
                    style={styles.previewProfileImage}
                  />
                )}
                <View style={styles.profilePictureEditIcon}>
                  <Feather name="edit" color={theme.text} size={15} />
                </View>
              </TouchableOpacity>
              {errors.profile_img && touched.profile_img && (
                <Text style={styles.errorText}>{errors.profile_img}</Text>
              )}

              <TextInput
                placeholder="Enter your name"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                style={styles.input}
              />
              {errors.name && touched.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}

              <TouchableOpacity
                style={styles.input}
                onPress={() => setOpen(true)}>
                <Text style={{color: values.dob ? '#000' : '#999'}}>
                  {values.dob
                    ? dateFormatter(values.dob)
                    : 'Select Date of Birth'}
                </Text>
              </TouchableOpacity>
              {errors.dob && touched.dob && (
                <Text style={styles.errorText}>{errors.dob}</Text>
              )}
              <DatePicker
                modal
                mode="date"
                open={open}
                date={values.dob ? new Date(values.dob) : new Date()}
                onConfirm={date => {
                  setOpen(false);
                  setFieldValue('dob', date.toISOString());
                }}
                onCancel={() => setOpen(false)}
              />

              <TextInput
                placeholder="Enter your email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType="email-address"
                style={styles.input}
              />
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <View style={styles.mobileContainer}>
                <TextInput
                  value={values.countryCode}
                  editable={false}
                  style={styles.countryCodeInput}
                />
                <TextInput
                  placeholder="Mobile number"
                  value={values.mobile}
                  onChangeText={handleChange('mobile')}
                  onBlur={handleBlur('mobile')}
                  keyboardType="phone-pad"
                  style={styles.mobileInput}
                  maxLength={10}
                />
              </View>
              {errors.mobile && touched.mobile && (
                <Text style={styles.errorText}>{errors.mobile}</Text>
              )}

              <View style={styles.input}>
                <Picker
                  selectedValue={values.gender}
                  onValueChange={itemValue =>
                    setFieldValue('gender', itemValue)
                  }
                  style={{flex: 1}}>
                  <Picker.Item label="Select Gender" value="" />
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Female" value="female" />
                  <Picker.Item label="Other" value="other" />
                </Picker>
              </View>
              {errors.gender && touched.gender && (
                <Text style={styles.errorText}>{errors.gender}</Text>
              )}

              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: isButtonEnabled ? '#1D61E7' : '#ccc',
                  },
                ]}
                onPress={handleSubmit}
                disabled={!isButtonEnabled}>
                <Text style={styles.buttonText}>Save Profile</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </Formik>
    </>
  );
};

export default ProfileDetails;

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 50,
      gap: 10,
      backgroundColor: theme.background,
      width: widthPercentageToDP('100%'),
    },
    input: {
      width: widthPercentageToDP('90%'),
      height: 44,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      justifyContent: 'center',
      paddingHorizontal: 10,
      marginTop: 10,
    },
    mobileContainer: {
      width: widthPercentageToDP('90%'),
      height: 44,
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      overflow: 'hidden',
      marginTop: 10,
    },
    countryCodeInput: {
      width: 70,
      height: '100%',
      borderRightWidth: 1,
      borderRightColor: '#ccc',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    mobileInput: {
      flex: 1,
      paddingHorizontal: 10,
    },
    button: {
      width: widthPercentageToDP('90%'),
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
