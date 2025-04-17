import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  Pressable,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {useCustomTheme} from '../../theme/ThemeContext';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Dropdown} from 'react-native-element-dropdown';
import {ThemeColors} from '../../theme/themeConfig';
import DatePicker from 'react-native-date-picker';
import DocumentPicker from 'react-native-document-picker';
import CameraIcon from 'react-native-vector-icons/Entypo';
import ErrorText from '../../components/ErrorText/ErrorText';
import {EMAIL_REGEX, MOBILE_REGEX, ONLY_LETTERS} from '../../constants/Regex';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import CustomImage, {
  CustomImageTypes,
} from '../../components/CustomImage/CustomImage';
import {useAtom, useSetAtom} from 'jotai';
import {ProfileService} from '../../api/ProfileService';
import Loader from '../../components/Loader/Loader';
import {changeHttpToHttps} from '../../Utils/ProtocolConvertor';
import {profileDropDown} from '../../molecules/profileDropDown.atom';
import {TOAST_TYPE, toaster} from '../../Utils/toastUtil';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomCheckBox from '@components/CustomCheckBox/CustomCheckBox';

const genderOptions = [
  {label: 'Male', value: 'Male'},
  {label: 'Female', value: 'Female'},
  {label: 'Other', value: 'Other'},
];

const maritalStatusOptions = [
  {label: 'Single', value: 'Single'},
  {label: 'Married', value: 'Married'},
  {label: 'Divorced', value: 'Divorced'},
];

const RegistrationPageOne = () => {
  const {theme} = useCustomTheme();
  const styles = createStyles(theme);
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<any>(new Date());
  const [openDate, setOpenDate] = useState<boolean>(false);
  const [marriageDate, setMarriageDate] = useState<any>(new Date());
  const [dropdownDetails, setDropdownDetails] = useState<any>();
  const [profileDetails, setProfileDetails] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [registerErrors, setRegisterErrors] = useState<any>({
    profile_img: '',
    mobile_number: '',
    first_name: '',
    last_name: '',
    gender: '',
    birth_date: '',
    birth_time: '',
    birth_place: '',
    email: '',
    gotra: '',
    marital_status: '',
    profession: '',
    marriage_anniversary: '',
    whatsapp_number: '',
  });
  const setProfileDropdown = useSetAtom(profileDropDown);
  const navigation = useNavigation<any>();

  const formattedProfessionData = dropdownDetails?.profession?.map(item => ({
    label: item,
    value: item,
  }));
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchAllData();
    }, []),
  );

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [profileResponse, dropdownResponse] = await Promise.allSettled([
        ProfileService.getProfileDetails(),
        ProfileService.getProfileDropdownDetails(),
      ]);

      if (profileResponse.status === 'fulfilled') {
        console.log(profileResponse.value?.data?.data, 'Profile Response');
        setProfileDetails(profileResponse.value?.data?.data);
      } else {
        console.error('Profile request failed:', profileResponse.reason);
      }

      if (dropdownResponse.status === 'fulfilled') {
        console.log(dropdownResponse.value, 'Dropdown Response');
        setProfileDropdown(dropdownResponse.value?.data);
        setDropdownDetails(dropdownResponse.value?.data);
      } else {
        console.error('Dropdown request failed:', dropdownResponse.reason);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    profile_img: profileDetails?.profile_img
      ? {
          name: 'Profile Image',
          uri: changeHttpToHttps(profileDetails?.profile_img),
          type: 'image/png',
        }
      : null,
    mobile_number: dropdownDetails?.mobile_number || '',
    first_name: profileDetails?.first_name || '',
    last_name: profileDetails?.last_name || '',
    gender: profileDetails?.gender || '',
    birth_date: profileDetails?.date_of_birth || '',
    birth_time: profileDetails?.birth_time || '',
    birth_place: profileDetails?.birth_place || '',
    email: profileDetails?.email || '',
    gotra: profileDetails?.gotra || '',
    marital_status: profileDetails?.marital_status || '',
    profession: profileDetails?.profession || '',
    marriage_anniversary: profileDetails?.marriage_anniversary || '',
    whatsapp_number: profileDetails?.whatsapp_number || '',
    push_notifications: profileDetails?.push_notifications || true,
    whatsapp_msgs: profileDetails?.whatsapp_msgs || true,
    email_notifications: profileDetails?.email_notifications || true,
  };

  const validationSchema = Yup.object({
    mobile_number: Yup.string(),
    first_name: Yup.string().matches(ONLY_LETTERS, 'Invalid first name'),
    last_name: Yup.string().matches(ONLY_LETTERS, 'Invalid last name'),
    gender: Yup.string(),
    birth_date: Yup.string(),
    birth_time: Yup.string(),
    birth_place: Yup.string(),
    email: Yup.string()
      .matches(EMAIL_REGEX, 'Invalid email id')
      .required('Email is required'),
    gotra: Yup.string(),
    marital_status: Yup.string(),
    profession: Yup.string(),
    whatsapp_number: Yup.string().matches(
      MOBILE_REGEX,
      'Phone number must be 10 digits',
    ),
    marriage_anniversary: Yup.string(),
    push_notifications: Yup.boolean(),
    whatsapp_msgs: Yup.boolean(),
    email_notifications: Yup.boolean(),
  });

  const handleFileUpload = async (setFieldValue: any, field: any) => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });

      setFieldValue(field, {
        name: res[0].name,
        uri: res[0].uri,
        type: res[0].type,
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker');
      } else {
        console.error('DocumentPicker Error:', err);
      }
    }
  };

  const handleRegister = async (values: any) => {
    console.log(values, 'values----------->');

    let payload = new FormData();

    values?.profile_img &&
      payload.append('profile_img', {
        uri: values?.profile_img.uri,
        name: values?.profile_img.name,
        type: values?.profile_img.type,
      });
    values?.first_name && payload.append('first_name', values?.first_name);
    values?.last_name && payload.append('last_name', values?.last_name);
    values?.email && payload.append('email', values?.email);
    values?.gender && payload.append('gender', values?.gender);
    values?.birth_date && payload.append('date_of_birth', values?.birth_date);
    values?.birth_place && payload.append('birth_place', values?.birth_place);
    values?.birth_time && payload.append('birth_time', values?.birth_time);
    values?.gotra && payload.append('gotra', values?.gotra);
    values?.marital_status &&
      payload.append('marital_status', values?.marital_status);
    values?.marriage_anniversary &&
      payload.append('marriage_anniversary', values?.marriage_anniversary);
    values?.profession && payload.append('profession', values?.profession);
    values?.whatsapp_number &&
      payload.append('whatsapp_number', values?.whatsapp_number);
    values?.push_notifications &&
      payload.append('push_notifications', values?.push_notifications);
    values?.whatsapp_msgs &&
      payload.append('whatsapp_msgs', values?.whatsapp_msgs);
    values?.email_notifications &&
      payload.append('email_notifications', values?.email_notifications);

    try {
      setLoading(true);
      const response = await ProfileService?.postProfileDetails(payload);
      if (response && response.status === 201) {
        navigation.navigate('registerTwo', {
          profile: response?.data?.data,
          userData: response?.data?.user_data,
        });
        console.log(response?.data, 'Registration Successful');
        toaster({isFor: TOAST_TYPE.SUCCESS, text: response?.data?.Message});
      } else {
        console.log('Error: Registration failed');
      }
    } catch (error: any) {
      console.log('Error while posting data:', error?.response?.data);
      setRegisterErrors(error?.response?.data);
      if (error?.response) {
        console.log('Server Error:', error?.response?.data);
      } else if (error?.request) {
        console.error('Network Error: No response received', error?.request);
      } else {
        console.error('Unexpected Error:', error?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (values: any) => {
    console.log(values, 'values----------->');

    let payload = new FormData();

    values?.profile_img &&
      payload.append('profile_img', {
        uri: values?.profile_img.uri,
        name: values?.profile_img.name,
        type: values?.profile_img.type,
      });
    values?.first_name && payload.append('first_name', values?.first_name);
    values?.last_name && payload.append('last_name', values?.last_name);
    values?.mobile_number &&
      payload.append('mobile_number', values?.mobile_number);
    values?.gender && payload.append('gender', values?.gender);
    values?.birth_date && payload.append('date_of_birth', values?.birth_date);
    values?.birth_time && payload.append('birth_time', values?.birth_time);
    values?.birth_place && payload.append('birth_place', values?.birth_place);
    values?.email && payload.append('email', values?.email);
    values?.gotra && payload.append('gotra', values?.gotra);
    values?.marital_status &&
      payload.append('marital_status', values?.marital_status);
    values?.marriage_anniversary &&
      payload.append('marriage_anniversary', values?.marriage_anniversary);
    values?.profession && payload.append('profession', values?.profession);
    values?.whatsapp_number &&
      payload.append('whatsapp_number', values?.whatsapp_number);
    values?.push_notifications &&
      payload.append('push_notifications', values?.push_notifications);
    values?.whatsapp_msgs &&
      payload.append('whatsapp_msgs', values?.whatsapp_msgs);
    values?.email_notifications &&
      payload.append('email_notifications', values?.email_notifications);

    if (profileDetails?.fav_deity?.length > 0) {
      profileDetails?.fav_deity.map(deity => {
        payload.append('fav_deity', deity?.id);
      });
    }

    if (profileDetails?.puja_of_intrest?.length > 0) {
      profileDetails?.puja_of_intrest.map(puja => {
        payload.append('puja_of_intrest', puja?.id);
      });
    }

    console.log(payload, 'payyyyyyy');
    try {
      setLoading(true);
      const response = await ProfileService?.editProfileDetails(payload);
      if (response && response.status === 200) {
        console.log(response?.data, 'Registration Successful');
        navigation.navigate('registerTwo', {
          profile: response?.data?.data,
          userData: response?.data?.user_data,
        });
        toaster({isFor: TOAST_TYPE.SUCCESS, text: response?.data?.Message});
      } else {
        console.log('Error: Registration failed');
      }
    } catch (error: any) {
      setRegisterErrors(error?.response?.data);
      toaster({
        isFor: TOAST_TYPE.ERROR,
        text: 'Something went wrong. Try again !',
      });
      if (error?.response) {
        console.log('Server Error:', error?.response?.data);
      } else if (error?.request) {
        console.error('Network Error: No response received', error?.request);
      } else {
        console.error('Unexpected Error:', error?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CustomHeader title={'Complete your profile'} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values =>
              profileDetails?.id
                ? handleUpdateProfile(values)
                : handleRegister(values)
            }
            enableReinitialize>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              touched,
              errors,
            }) => (
              <>
                <View style={styles.inputFields}>
                  <View style={styles.inputContainer}>
                    <TouchableOpacity
                      style={styles.profileButton}
                      onPress={() =>
                        handleFileUpload(setFieldValue, 'profile_img')
                      }>
                      {values?.profile_img ? (
                        // <CustomImage
                        //   source={values?.profile_img?.uri}
                        //   baseUrlIncluded={true}
                        //   style={styles.previewProfileImage}
                        //   imageType={CustomImageTypes.PRODUCT}
                        // />
                        <Image
                          source={{uri: values?.profile_img?.uri}}
                          style={styles.previewProfileImage}
                        />
                      ) : (
                        <CustomImage
                          source={
                            'https://img.freepik.com/premium-photo/default-male-user-icon-blank-profile-image-green-background-profile-picture-icon_962764-98397.jpg?w=826'
                          }
                          baseUrlIncluded={true}
                          style={styles.avatar}
                          imageType={CustomImageTypes.PRODUCT}
                        />
                      )}
                      <TouchableOpacity
                        style={styles.profilePictureEditIcon}
                        onPress={() =>
                          handleFileUpload(setFieldValue, 'profile_img')
                        }>
                        <CameraIcon
                          name="camera"
                          size={13}
                          color={theme.blueColor}
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={styles.inputTitle}>First Name</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange('first_name')}
                      onBlur={handleBlur('first_name')}
                      value={values.first_name}
                      placeholder="Enter your first name"
                      placeholderTextColor={theme.cardDescription}
                    />
                    {registerErrors?.first_name ? (
                      <ErrorText text={registerErrors?.first_name} />
                    ) : touched?.first_name && errors?.first_name ? (
                      <ErrorText text={errors?.first_name} />
                    ) : null}
                  </View>

                  <View>
                    <Text style={styles.inputTitle}>Last Name</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange('last_name')}
                      onBlur={handleBlur('last_name')}
                      value={values.last_name}
                      placeholder="Enter your last name"
                      placeholderTextColor={theme.cardDescription}
                    />
                    {registerErrors?.last_name ? (
                      <ErrorText text={registerErrors?.last_name} />
                    ) : touched?.last_name && errors?.last_name ? (
                      <ErrorText text={errors?.last_name} />
                    ) : null}
                  </View>

                  <View>
                    <Text style={styles.inputTitle}>Mobile Number</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="phone-pad"
                      onChangeText={handleChange('mobile_number')}
                      onBlur={handleBlur('mobile_number')}
                      value={values.mobile_number}
                      placeholder="Enter your mobile number"
                      editable={false}
                    />
                    {registerErrors?.mobile_number ? (
                      <ErrorText text={registerErrors?.mobile_number} />
                    ) : touched?.mobile_number && errors?.mobile_number ? (
                      <ErrorText text={errors?.mobile_number} />
                    ) : null}
                  </View>

                  <View style={styles.directionRow}>
                    <View>
                      <Text style={styles.inputTitle}>Gender</Text>
                      <Dropdown
                        style={styles.genderDropdown}
                        data={genderOptions}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Gender"
                        placeholderStyle={styles.placeHolderText}
                        value={values.gender}
                        selectedTextStyle={{color: theme.text}}
                        onChange={item => setFieldValue('gender', item.value)}
                      />
                      {registerErrors?.gender ? (
                        <ErrorText text={registerErrors?.gender} />
                      ) : touched?.gender && errors?.gender ? (
                        <ErrorText text={errors?.gender} />
                      ) : null}
                    </View>
                    <View>
                      <Text style={styles.inputTitle}>Birth Date</Text>
                      <TouchableOpacity
                        style={styles.genderDropdown}
                        onPress={() => setOpen(true)}>
                        <Text
                          style={{
                            color: values.birth_date
                              ? theme.text
                              : theme.cardDescription,
                          }}>
                          {values.birth_date
                            ? values.birth_date
                            : 'Select Birth Date'}
                        </Text>
                      </TouchableOpacity>
                      {registerErrors?.birth_date ? (
                        <ErrorText text={registerErrors?.birth_date} />
                      ) : touched?.birth_date && errors?.birth_date ? (
                        <ErrorText text={errors?.birth_date} />
                      ) : null}
                    </View>
                  </View>

                  <DatePicker
                    modal
                    open={open}
                    date={date}
                    mode="date"
                    onConfirm={selectedDate => {
                      setOpen(false);
                      setDate(selectedDate);
                      const formattedDate = selectedDate
                        .toLocaleDateString('en-GB')
                        .split('/')
                        .join('/');

                      setFieldValue('birth_date', formattedDate);
                    }}
                    onCancel={() => setOpen(false)}
                  />

                  <View>
                    <Text style={styles.inputTitle}>Birth Time</Text>
                    <TouchableOpacity
                      onPress={() => setTimePickerVisibility(true)}>
                      <TextInput
                        style={styles.input}
                        value={values.birth_time}
                        editable={false}
                        placeholder="Select your birth time"
                        placeholderTextColor={theme.cardDescription}
                        pointerEvents="none"
                      />
                    </TouchableOpacity>

                    <DateTimePickerModal
                      isVisible={isTimePickerVisible}
                      mode="time"
                      is24Hour={false}
                      display="spinner"
                      onConfirm={date => {
                        const formattedTime = moment(date).format('hh:mm A');
                        handleChange('birth_time')(formattedTime);
                        setTimePickerVisibility(false);
                      }}
                      onCancel={() => setTimePickerVisibility(false)}
                    />

                    {registerErrors?.birth_time ? (
                      <ErrorText text={registerErrors?.birth_time} />
                    ) : touched?.birth_time && errors?.birth_time ? (
                      <ErrorText text={errors?.birth_time} />
                    ) : null}
                  </View>

                  <View>
                    <Text style={styles.inputTitle}>Birth Place</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange('birth_place')}
                      onBlur={handleBlur('birth_place')}
                      value={values.birth_place}
                      placeholder="Enter your birth place"
                      placeholderTextColor={theme.cardDescription}
                    />
                    {registerErrors?.birth_place ? (
                      <ErrorText text={registerErrors?.birth_place} />
                    ) : touched?.birth_place && errors?.birth_place ? (
                      <ErrorText text={errors?.birth_place} />
                    ) : null}
                  </View>

                  <View style={styles.otherContainer}>
                    <View>
                      <Text style={styles.inputTitle}>Email</Text>
                      <TextInput
                        style={styles.input}
                        keyboardType="email-address"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        placeholder="Enter your email address"
                        placeholderTextColor={theme.cardDescription}
                      />
                      {registerErrors?.email ? (
                        <ErrorText text={registerErrors?.email} />
                      ) : touched?.email && errors?.email ? (
                        <ErrorText text={errors?.email} />
                      ) : null}
                    </View>

                    <View>
                      <Text style={styles.inputTitle}>Gotra</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={handleChange('gotra')}
                        onBlur={handleBlur('gotra')}
                        value={values.gotra}
                        placeholder="Enter your gotra"
                        placeholderTextColor={theme.cardDescription}
                      />
                      {registerErrors?.gotra ? (
                        <ErrorText text={registerErrors?.gotra} />
                      ) : touched?.gotra && errors?.gotra ? (
                        <ErrorText text={errors?.gotra} />
                      ) : null}
                    </View>
                    <View>
                      <Text style={styles.inputTitle}>Marital Status</Text>
                      <Dropdown
                        style={styles.dropdown}
                        data={maritalStatusOptions}
                        labelField="label"
                        valueField="value"
                        placeholder="Marital Status"
                        value={values.marital_status}
                        selectedTextStyle={{color: theme.text}}
                        placeholderStyle={styles.placeHolderText}
                        itemTextStyle={{color: theme.text}}
                        onChange={item =>
                          setFieldValue('marital_status', item.value)
                        }
                      />
                      {registerErrors?.marital_status ? (
                        <ErrorText text={registerErrors?.marital_status} />
                      ) : touched?.marital_status && errors?.marital_status ? (
                        <ErrorText text={errors?.marital_status} />
                      ) : null}
                    </View>

                    <View>
                      <Text style={styles.inputTitle}>Profession</Text>
                      <Dropdown
                        style={styles.dropdown}
                        data={formattedProfessionData ?? []}
                        labelField="label"
                        valueField="value"
                        placeholder="Profession"
                        placeholderStyle={styles.placeHolderText}
                        selectedTextStyle={{color: theme.text}}
                        itemTextStyle={{color: theme.text}}
                        value={values.profession}
                        search
                        searchPlaceholder="Search..."
                        inputSearchStyle={{color: theme.text}}
                        onChange={item =>
                          setFieldValue('profession', item.value)
                        }
                      />
                      {registerErrors?.profession ? (
                        <ErrorText text={registerErrors?.profession} />
                      ) : touched?.profession && errors?.profession ? (
                        <ErrorText text={errors?.profession} />
                      ) : null}
                    </View>

                    <View>
                      <Text style={styles.inputTitle}>
                        Marriage Anniversary
                      </Text>
                      <TouchableOpacity
                        style={styles.marriageInput}
                        onPress={() => setOpenDate(true)}>
                        <Text
                          style={{
                            color: values.marriage_anniversary
                              ? theme.text
                              : theme.cardDescription,
                          }}>
                          {values.marriage_anniversary
                            ? values.marriage_anniversary
                            : 'Select Anniversary Date'}
                        </Text>
                      </TouchableOpacity>
                      {registerErrors?.marriage_anniversary ? (
                        <ErrorText
                          text={registerErrors?.marriage_anniversary}
                        />
                      ) : touched?.marriage_anniversary &&
                        errors?.marriage_anniversary ? (
                        <ErrorText text={errors?.marriage_anniversary} />
                      ) : null}

                      <DatePicker
                        modal
                        open={openDate}
                        date={marriageDate}
                        mode="date"
                        onConfirm={selectedDate => {
                          setOpenDate(false);
                          setMarriageDate(selectedDate);
                          const formattedDate = selectedDate
                            .toLocaleDateString('en-GB')
                            .split('/')
                            .join('/');

                          setFieldValue('marriage_anniversary', formattedDate);
                        }}
                        onCancel={() => setOpenDate(false)}
                      />
                    </View>

                    <View>
                      <Text style={styles.inputTitle}>WhatsApp Number</Text>
                      <TextInput
                        style={styles.input}
                        keyboardType="phone-pad"
                        onChangeText={handleChange('whatsapp_number')}
                        onBlur={handleBlur('whatsapp_number')}
                        value={values.whatsapp_number}
                        placeholder="Enter your alternate number"
                        placeholderTextColor={theme.cardDescription}
                      />
                      {registerErrors?.whatsapp_number ? (
                        <ErrorText text={registerErrors?.whatsapp_number} />
                      ) : touched?.whatsapp_number &&
                        errors?.whatsapp_number ? (
                        <ErrorText text={errors?.whatsapp_number} />
                      ) : null}
                    </View>
                    <View>
                      <View style={{paddingLeft: 5}}>
                        <Text style={styles.inputTitle}>
                          ○ Handle Your Notifications
                        </Text>
                      </View>
                      <CustomCheckBox
                        value={values.push_notifications}
                        handleChange={(value: boolean) => {
                          setFieldValue('push_notifications', value);
                        }}
                        label={'Mobile Notifications'}
                      />
                      <CustomCheckBox
                        value={values.whatsapp_msgs}
                        handleChange={(value: boolean) => {
                          setFieldValue('whatsapp_msgs', value);
                        }}
                        label={`What's App Messages`}
                      />
                      <CustomCheckBox
                        value={values.email_notifications}
                        handleChange={(value: boolean) => {
                          setFieldValue('email_notifications', value);
                        }}
                        label={'Email Notifications'}
                      />
                    </View>
                  </View>
                </View>
                <View style={{position: 'relative', top: 30}}>
                  <Text style={styles.footerInfo}>
                    Your data is safe with us{'\n'}
                  </Text>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.submitButton}>
                    <Text style={styles.submitText}>SAVE & CONTINUE</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
      {loading && <Loader />}
    </>
  );
};

export default RegistrationPageOne;

export const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: widthPercentageToDP('100%'),
      marginBottom: 60,
      backgroundColor: theme.background,
    },
    inputContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 15,
    },
    inputFields: {padding: 10, gap: 10},
    inputTitle: {
      color: theme.text,
      fontWeight: 'bold',
    },
    otherText: {fontSize: 16, paddingBottom: 20, color: theme.text},
    otherContainer: {
      paddingTop: 8,
      gap: 13,
    },
    footerInfo: {
      textAlign: 'center',
      letterSpacing: 1,
      lineHeight: 18,
      fontSize: 14,
      color: theme.cardDescription,
    },
    input: {
      borderBottomWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      color: theme.text,
      height: 40,
    },
    marriageInput: {
      borderBottomWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingBottom: 10,
      paddingTop: 10,
      marginVertical: 5,
      color: theme.text,
    },
    dropdown: {
      borderBottomWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      color: theme.text,
      height: 40,
    },
    genderDropdown: {
      width: widthPercentageToDP('46%'),
      borderBottomWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingBottom: 10,
      paddingTop: 10,
      marginVertical: 5,
      backgroundColor: theme.background,
      color: theme.text,
    },
    datePicker: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingBottom: 10,
      paddingTop: 10,
      marginVertical: 5,
      justifyContent: 'center',
      backgroundColor: theme.background,
    },
    errorText: {
      color: 'red',
      fontSize: 12,
      marginTop: 4,
    },
    profileButton: {
      width: 120,
      height: 120,
      borderWidth: 1,
      borderRadius: 60,
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
      borderColor: theme.borderColor,
      position: 'relative',
    },
    avatar: {
      width: 110,
      height: 110,
      borderRadius: 60,
      backgroundColor: theme.background,
    },
    profilePictureEditIcon: {
      borderColor: theme.text,
      borderRadius: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      position: 'absolute',
      right: 17,
      bottom: 16,
      backgroundColor: theme.background,
      width: 25,
      height: 25,
      borderWidth: 0.3,
    },
    previewProfileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    submitButton: {
      borderRadius: 5,
      padding: 10,
      marginVertical: 5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.blueColor,
      width: '95%',
      height: 55,
    },
    directionRow: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    submitText: {
      color: theme.background,
      fontWeight: 'bold',
      letterSpacing: 1,
    },
    placeHolderText: {
      color: theme.cardDescription,
      fontSize: 14,
    },
    buttonContainer: {
      width: widthPercentageToDP('100%'),
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 50,
      height: 80,
      backgroundColor: '#ECEAE7',
      borderColor: theme.cardDescription,
      position: 'relative',
      bottom: -60,
    },
  });
