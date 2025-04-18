import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useCustomTheme} from '../../theme/ThemeContext';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ErrorText from '../../components/ErrorText/ErrorText';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants/screenNames';
import {EMAIL_REGEX} from '../../constants/Regex';
import {useAuth} from '../../context/AuthContext';
import Loader from '../../components/Loader/Loader';
import {createStyles} from './style';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .matches(EMAIL_REGEX, 'Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(4, 'Password too short')
    .required('Password is required'),
});

const SignUp = () => {
  const {theme} = useCustomTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<any>();

  const {SignUp, loading} = useAuth();

  const handleLogin = async (values: {email: string; password: string}) => {
    try {
      const response = await SignUp(values?.email, values?.password);
      if (response) {
        console.log('User signed up:', response.user);
        navigation.navigate(SCREENS.LOGIN);
      }
    } catch (error: any) {
      console.log(error, 'error---->');
      if (error?.response) {
        console.log('Server Error:', error?.response?.data);
      } else if (error?.request) {
        console.error('Network Error: No response received', error?.request);
      } else {
        console.error('Unexpected Error:', error?.message);
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/Ellipse.png')}
            style={styles.secondImage}
            resizeMode="cover"
          />
          <Image
            source={require('../../assets/images/Vector.png')}
            style={styles.mainImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.signInTextContainer}>
          <Text style={styles.signInText}>Create your Account</Text>
        </View>
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={SignInSchema}
          onSubmit={values => handleLogin(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.inputsContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <View style={{gap: 2}}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    placeholderTextColor={theme.borderColor}
                    value={values.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {touched?.email && errors?.email && (
                    <ErrorText text={errors?.email} />
                  )}
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View style={{gap: 2}}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    secureTextEntry
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    placeholderTextColor={theme.borderColor}
                    value={values.password}
                  />
                  {touched?.password && errors?.password && (
                    <ErrorText text={errors?.password} />
                  )}
                </View>
              </View>
              <TouchableOpacity style={styles.forgotContainer}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.btnText}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate(SCREENS.LOGIN)}>
                <Text style={styles.linkText}>
                  <Text style={styles.forgotText}>
                    Already have an Account ?
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
      {loading && <Loader />}
    </>
  );
};

export default SignUp;
