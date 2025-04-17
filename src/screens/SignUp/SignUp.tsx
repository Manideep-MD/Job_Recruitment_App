import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ThemeProvider, useCustomTheme} from '../../theme/ThemeContext';
import {ThemeColors} from '../../theme/themeConfig';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ErrorText from '../../components/ErrorText/ErrorText';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants/screenNames';
import {EMAIL_REGEX} from '../../constants/Regex';
import {useAuth} from '../../context/AuthContext';

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
                <Text style={styles.forgotText}>Already have an Account ?</Text>
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignUp;

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      paddingTop: 40,
      alignItems: 'center',
      height: '100%',
    },
    input: {
      width: 327,
      height: 46,
      borderWidth: 1,
      borderRadius: 10,
      paddingRight: 14,
      paddingLeft: 14,
      borderColor: '#6C7278',
      color: theme.text,
    },
    inputContainer: {width: 327, height: 69, gap: 5},
    signInTextContainer: {width: 327, height: 84},
    signInText: {fontSize: 32, fontWeight: 700, verticalAlign: 'middle'},
    mainImage: {width: 63.1, height: 88},
    secondImage: {width: 33, height: 32},
    imageContainer: {gap: 10, paddingBottom: 20},
    inputsContainer: {width: 327, height: 267, gap: 24},
    forgotContainer: {alignItems: 'flex-end', width: 327},
    forgotText: {fontSize: 12, fontWeight: 600, color: '#4D81E7'},
    button: {
      width: 327,
      height: 48,
      backgroundColor: '#1D61E7',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnText: {
      color: theme.background,
      fontWeight: 500,
      letterSpacing: -1,
    },
    label: {
      color: '#6C7278',
    },
    linkText: {
      fontSize: 12,
      fontWeight: 600,
      textAlign: 'center',
    },
  });
