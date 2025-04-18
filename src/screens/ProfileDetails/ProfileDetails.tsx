import {Text, TextInput, TouchableOpacity, View, Image} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';
import {saveProfile} from '../../redux/reducers/userReducer';
import {useCustomTheme} from '../../theme/ThemeContext';
import {EMAIL_REGEX, MOBILE_REGEX} from '../../constants/Regex';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants/screenNames';
import {SET_PROFILE} from '../../redux/reducers/tokenReducer';
import {dateFormatter} from '../../Utils/dateFormatHelper';
import {createStyles} from './style';

interface FormValues {
  name: string;
  dob: string;
  email: string;
  mobile: string;
  gender: string;
  countryCode: string;
  profile_img: {
    uri: string;
    type: string;
    name: string;
  } | null;
}

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

const ProfileDetails: React.FC = ({route}: any) => {
  const {theme} = useCustomTheme();
  const styles = createStyles(theme);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const navigation = useNavigation<any>();
  const routeScreen = route?.params?.routeName;

  const pickImage = async (
    setFieldValue: (field: string, value: any) => void,
  ) => {
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
        name: image.path.split('/').pop() ?? 'profile.jpg',
      });
    } catch (error: any) {
      if (error.code === 'E_PICKER_CANCELLED') {
        console.log('User cancelled image picker');
      } else {
        console.error('Image picker error:', error);
      }
    }
  };

  const handleDetails = (values: FormValues) => {
    dispatch(saveProfile(values));
    dispatch(SET_PROFILE(true));
    if (routeScreen === 'profile') {
      navigation.navigate(SCREENS.BOTTOM_TAB);
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: SCREENS.BOTTOM_TAB}],
      });
    }
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
                <Text style={styles.errorText}>
                  {errors.profile_img as string}
                </Text>
              )}

              <TextInput
                placeholder="Enter your name"
                value={values.name}
                onChangeText={handleChange('name')}
                placeholderTextColor={theme.borderColor}
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
                <Text style={styles.errorText}>{errors.dob as string}</Text>
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
                placeholderTextColor={theme.borderColor}
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
                  placeholderTextColor={theme.borderColor}
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
                  style={{flex: 1,color:theme.text}}>
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
                    backgroundColor: isButtonEnabled
                      ? theme.buttonColor
                      : theme.lightgrey,
                  },
                ]}
                onPress={handleSubmit as any}
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
