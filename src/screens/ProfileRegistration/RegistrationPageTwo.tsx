import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  InteractionManager,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {useCustomTheme} from '../../theme/ThemeContext';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {ThemeColors} from '../../theme/themeConfig';
import ErrorText from '../../components/ErrorText/ErrorText';
import {useNavigation} from '@react-navigation/native';
import CustomModal from '../../components/CustomModal/CustomModal';
import {ProfileService} from '../../api/ProfileService';
import Loader from '../../components/Loader/Loader';
import {useAtom} from 'jotai';
import {profileDropDown} from '../../molecules/profileDropDown.atom';
import {TOAST_TYPE, toaster} from '../../Utils/toastUtil';
import {BASE_URL} from '../../api/apiService';

const RegistrationPageTwo = ({route}: any) => {
  const {theme} = useCustomTheme();
  const styles = createStyles(theme);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<any>();
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [profileDetails, setProfileDetails] = useState<any>({});
  const [userData, setUserData] = useState<any>({});
  const [dropdownDetails] = useAtom(profileDropDown);
  const pujasDropdownRef: any = useRef(null);
  const deityDropdownRef: any = useRef(null);
  const [registerErrors, setRegisterErrors] = useState<any>({
    street_address: '',
    country: '',
    state: '',
    city: '',
    zip_code: '',
    favorite_deities: '',
    pujas: '',
    language: '',
  });
  const [states, setStates] = useState<any>([]);
  const [cities, setCities] = useState<any>([]);

  const pujaIds = profileDetails?.puja_of_intrest?.map(puja => puja?.id) || [];
  const deityIds = profileDetails?.fav_deity?.map(deity => deity?.id) || [];

  const formatBirthTime = (time: string) => {
    return time ? time.slice(0, 5) : '';
  };

  useEffect(() => {
    if (route?.params?.profile) {
      setProfileDetails(route?.params?.profile);
    }
    if (route?.params?.userData) {
      setUserData(route?.params?.userData);
    }

    if (route?.params?.profile?.country?.id) {
      fetchStates(route?.params?.profile?.country?.id);
    }

    if (route?.params?.profile?.state?.id) {
      fetchCities(route?.params?.profile?.state?.id);
    }
  }, []);

  const initialValues = {
    street_address: profileDetails?.street_address || '',
    country:
      dropdownDetails?.country?.find(
        item => item?.id === profileDetails?.country?.id,
      )?.id || '',
    state:
      states?.find(item => item?.id === profileDetails?.state?.id)?.id || '',
    city: cities?.find(item => item?.id === profileDetails?.city?.id)?.id || '',
    zip_code: profileDetails?.zip_code || '',
    favorite_deities: Array.isArray(deityIds) ? deityIds : [],
    pujas: Array.isArray(pujaIds) ? pujaIds : [],
  };

  console.log('intii--->>', initialValues);

  const validationSchema = Yup.object({
    street_address: Yup.string(),
    country: Yup.string(),
    state: Yup.string(),
    city: Yup.string(),
    zip_code: Yup.string(),
    favorite_deities: Yup.array(),
    pujas: Yup.array(),
    language: Yup.string(),
  });

  const handleCancel = () => {
    setAlertVisible(true);
  };

  const handleConfirm = () => {
    setAlertVisible(false);
    navigation.navigate('register');
  };

  const handleClose = () => {
    setAlertVisible(false);
  };

  const fetchStates = async (countryId: any) => {
    console.log('countryId------------', countryId);
    setLoading(true);
    let payload = {
      country_id: countryId,
    };
    try {
      const response = await ProfileService?.getProfileStates(payload);
      if (response && response.status === 200) {
        if (response?.data) {
          console.log(response?.data, 'ssssssssssss');
          setStates(response?.data?.states || []);
        }
      } else {
        console.log('Error: fetch failed');
      }
    } catch (error: any) {
      console.error('Error while fetching data:', error?.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async (stateId: any) => {
    let payload = {
      state_id: stateId,
    };
    try {
      console.log(stateId, 'lllllllllllllll');
      setLoading(true);
      const response = await ProfileService?.getProfileCities(payload);
      if (response && response.status === 200) {
        if (response?.data) {
          setCities(response?.data?.cities || []);
        }
      } else {
        console.log('Error: fetch failed');
      }
    } catch (error: any) {
      console.error('Error while fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (values: any) => {
    console.log(values, 'values----------->');
    const profileImage = userData?.profile_img
      ? {
          name: 'Profile Image',
          uri: `${BASE_URL}${userData?.profile_img}`,
          type: 'image/png',
        }
      : null;

    let payload = new FormData();

    userData?.profile_img && payload.append('profile_img', profileImage);
    userData?.first_name && payload.append('first_name', userData?.first_name);
    userData?.last_name && payload.append('last_name', userData?.last_name);
    profileDetails?.mobile_number &&
      payload.append('mobile_number', profileDetails?.mobile_number);
    profileDetails?.gender && payload.append('gender', profileDetails?.gender);
    profileDetails?.date_of_birth &&
      payload.append('date_of_birth', profileDetails?.date_of_birth);
    profileDetails?.birth_time &&
      payload.append('birth_time', formatBirthTime(profileDetails?.birth_time));
    profileDetails?.birth_place &&
      payload.append('birth_place', profileDetails?.birth_place);
    userData?.email && payload.append('email', userData?.email);
    profileDetails?.gotra && payload.append('gotra', profileDetails?.gotra);
    profileDetails?.marital_status &&
      payload.append('marital_status', profileDetails?.marital_status);
    profileDetails?.marriage_anniversary &&
      payload.append(
        'marriage_anniversary',
        profileDetails?.marriage_anniversary,
      );
    profileDetails?.profession &&
      payload.append('profession', profileDetails?.profession);
    userData?.whatsapp_number &&
      payload.append('whatsapp_number', userData?.whatsapp_number);
    profileDetails?.push_notifications &&
      payload.append('push_notifications', profileDetails?.push_notifications);
    profileDetails?.whatsapp_msgs &&
      payload.append('whatsapp_msgs', profileDetails?.whatsapp_msgs);
    profileDetails?.email_notifications &&
      payload.append(
        'email_notifications',
        profileDetails?.email_notifications,
      );

    values?.street_address &&
      payload.append('street_address', values?.street_address);
    values?.country && payload.append('country', values?.country);
    values?.state && payload.append('state', values?.state);
    values?.city && payload.append('city', values?.city);
    values?.zip_code && payload.append('zip_code', values?.zip_code);
    if (values?.favorite_deities && values?.favorite_deities?.length > 0) {
      values?.favorite_deities?.forEach(deity => {
        payload.append('fav_deity', deity);
      });
    }

    if (values?.pujas && values?.pujas?.length > 0) {
      values?.pujas?.forEach(puja => {
        payload.append('puja_of_intrest', puja);
      });
    }

    try {
      setLoading(true);
      const response = await ProfileService?.editProfileDetails(payload);
      if (response && response.status === 200) {
        navigation.navigate('MainDrawer');

        toaster({isFor: TOAST_TYPE.SUCCESS, text: response?.data?.Message});
      } else {
        console.log('Error: update failed');
      }
    } catch (error: any) {
      console.log('Error while posting data:', error?.response?.data);
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
      <CustomHeader title="Complete your profile" />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => handleRegister(values)}
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
              <View style={styles.inputContainer}>
                <View style={styles.inputFieldsContainer}>
                  <View>
                    <Text style={styles.inputTitle}>Street Address</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange('street_address')}
                      onBlur={handleBlur('street_address')}
                      value={values.street_address}
                      placeholder="Enter your complete address"
                      placeholderTextColor={theme.cardDescription}
                    />
                    {registerErrors?.street_address && (
                      <ErrorText text={registerErrors?.street_address} />
                    )}
                    {touched?.street_address && errors?.street_address && (
                      <ErrorText text={errors?.street_address} />
                    )}
                  </View>

                  <View>
                    <Text style={styles.inputTitle}>Country</Text>
                    <Dropdown
                      style={styles.countryDropdown}
                      data={dropdownDetails?.country}
                      labelField="name"
                      valueField="id"
                      placeholder="Select Country"
                      placeholderStyle={styles.placeHolderText}
                      value={values.country}
                      selectedTextStyle={{color: theme.text}}
                      itemTextStyle={{color: theme.text}}
                      onChange={item => {
                        setFieldValue('country', item?.id);
                        fetchStates(item?.id);
                      }}
                      activeColor={theme.blueColor + '20'}
                      search
                      searchPlaceholder="Search..."
                      inputSearchStyle={{color: theme.text}}
                      renderItem={item => (
                        <View style={{padding: 10}}>
                          <Text style={{color: theme.text}}>{item?.name}</Text>
                        </View>
                      )}
                    />
                    {registerErrors?.country && (
                      <ErrorText text={registerErrors?.country} />
                    )}
                    {touched?.country && errors?.country && (
                      <ErrorText text={errors?.country} />
                    )}
                  </View>

                  <View>
                    <Text style={styles.inputTitle}>State</Text>
                    <Dropdown
                      style={styles.countryDropdown}
                      data={states}
                      labelField="name"
                      valueField="id"
                      placeholder="Select State"
                      placeholderStyle={styles.placeHolderText}
                      value={values.state}
                      selectedTextStyle={{color: theme.text}}
                      itemTextStyle={{color: theme.text}}
                      disable={states.length === 0}
                      onChange={(item: any) => {
                        setFieldValue('state', item?.id);
                        fetchCities(item?.id);
                      }}
                      activeColor={theme.blueColor + '20'}
                      search
                      searchPlaceholder="Search..."
                      inputSearchStyle={{color: theme.text}}
                      renderItem={item => (
                        <View style={{padding: 10}}>
                          <Text style={{color: theme.text}}>{item?.name}</Text>
                        </View>
                      )}
                    />
                    {registerErrors?.state && (
                      <ErrorText text={registerErrors?.state} />
                    )}
                    {touched?.state && errors?.state && (
                      <ErrorText text={errors?.state} />
                    )}
                  </View>
                  <View>
                    <Text style={styles.inputTitle}>City</Text>
                    <Dropdown
                      style={styles.countryDropdown}
                      data={cities}
                      labelField="name"
                      valueField="id"
                      placeholder="Select City"
                      placeholderStyle={styles.placeHolderText}
                      value={values.city}
                      selectedTextStyle={{color: theme.text}}
                      onChange={item => setFieldValue('city', item?.id)}
                      itemTextStyle={{color: theme.text}}
                      disable={cities.length == 0}
                      activeColor={theme.blueColor + '20'}
                      search
                      searchPlaceholder="Search..."
                      inputSearchStyle={{color: theme.text}}
                      renderItem={item => (
                        <View style={{padding: 10}}>
                          <Text style={{color: theme.text}}>{item?.name}</Text>
                        </View>
                      )}
                    />
                    {registerErrors?.city && (
                      <ErrorText text={registerErrors?.city} />
                    )}
                    {touched?.city && errors?.city && (
                      <ErrorText text={errors?.city} />
                    )}
                  </View>

                  <View>
                    <Text style={styles.inputTitle}>Zip Code</Text>
                    <TextInput
                      style={styles.countryDropdown}
                      onChangeText={handleChange('zip_code')}
                      onBlur={handleBlur('zip_code')}
                      value={values.zip_code}
                      placeholder="Enter your zip code"
                      placeholderTextColor={theme.cardDescription}
                    />
                    {touched?.zip_code && errors?.zip_code && (
                      <ErrorText text={errors?.zip_code} />
                    )}
                  </View>

                  <View>
                    <Text style={styles.inputTitle}>Favorite Deities</Text>
                    <MultiSelect
                      ref={deityDropdownRef}
                      style={styles.countryDropdown}
                      data={dropdownDetails?.fav_deity || []}
                      labelField="name"
                      valueField="id"
                      placeholder="Select Deity"
                      placeholderStyle={styles.placeHolderText}
                      value={values?.favorite_deities ?? []}
                      selectedTextStyle={{color: theme.text}}
                      itemTextStyle={{color: theme.text}}
                      maxSelect={5}
                      onChange={item => {
                        console.log('item-->>>>', item);
                        setFieldValue('favorite_deities', item);
                        if (deityDropdownRef?.current) {
                          deityDropdownRef?.current?.close();
                        }
                      }}
                    />

                    {registerErrors?.favorite_deities && (
                      <ErrorText text={registerErrors?.favorite_deities} />
                    )}

                    {touched?.favorite_deities && errors?.favorite_deities && (
                      <ErrorText text={errors?.favorite_deities} />
                    )}
                  </View>

                  <View>
                    <Text style={styles.inputTitle}>Puja</Text>
                    <MultiSelect
                      ref={pujasDropdownRef}
                      style={styles.countryDropdown}
                      data={dropdownDetails?.puja_of_intrest || []}
                      labelField="puja_short_name"
                      valueField="id"
                      placeholder="Select Puja"
                      placeholderStyle={styles.placeHolderText}
                      value={values?.pujas ?? []}
                      selectedTextStyle={{color: theme.text}}
                      itemTextStyle={{color: theme.text}}
                      maxSelect={5}
                      onChange={item => {
                        setFieldValue('pujas', item);
                        if (pujasDropdownRef?.current) {
                          pujasDropdownRef?.current?.close();
                        }
                      }}
                    />

                    {registerErrors?.pujas && (
                      <ErrorText text={registerErrors?.pujas} />
                    )}

                    {touched?.pujas && errors?.pujas && (
                      <ErrorText text={errors?.pujas} />
                    )}
                  </View>
                </View>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    onPress={handleCancel}
                    style={styles.submitButton}>
                    <Text style={styles.submitText}>CANCEL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.submitButton}>
                    <Text style={styles.submitText}>SAVE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
      <CustomModal
        alertVisible={alertVisible}
        handleCancel={handleClose}
        handleConfirm={handleConfirm}
        title="Changes will not be saved"
        description="Are you sure ?"
      />
      {loading && <Loader />}
    </>
  );
};

export default RegistrationPageTwo;

export const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: widthPercentageToDP('100%'),
      backgroundColor: theme.background,
    },
    inputContainer: {
      width: '100%',
      justifyContent: 'space-between',
      height: '100%',
    },
    inputFieldsContainer: {padding: 10, gap: 15},
    submitText: {
      color: theme.background,
      fontWeight: 'bold',
      letterSpacing: 1,
    },
    inputTitle: {
      color: theme.text,
      fontWeight: 'bold',
    },
    input: {
      borderBottomWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      color: theme.text,
      height: 40,
    },
    dropdown: {
      borderBottomWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      color: theme.text,
      height: 40,
    },

    selectedItemsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 8,
    },
    selectedItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#e0e0e0',
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 16,
      marginRight: 8,
      marginBottom: 8,
      gap: 5,
    },
    selectedItemText: {
      color: theme.text,
      fontSize: 14,
    },
    removeButton: {
      color: '#ff0000',
      fontSize: 16,
      marginLeft: 8,
    },
    submitButton: {
      borderRadius: 5,
      padding: 10,
      marginVertical: 5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.blueColor,
      width: widthPercentageToDP('42%'),
    },
    directionRow: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    placeHolderText: {
      color: theme.cardDescription,
      fontSize: 14,
    },
    countryDropdown: {
      width: '100%',
      borderBottomWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      height: 40,
      backgroundColor: theme.background,
    },
    buttonsContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: '#ECEAE7',
      borderColor: theme.cardDescription,
      height: 70,
    },
  });
