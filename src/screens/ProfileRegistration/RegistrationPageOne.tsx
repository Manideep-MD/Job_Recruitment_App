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
import DocumentPicker from 'react-native-document-picker'; // Import the correct picker
import ErrorText from '../../components/ErrorText/ErrorText';

// Form Validation Schema
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, 'Name can only contain letters')
    .required('Name is required'),
  dob: Yup.date().required('Date of birth is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  mobile: Yup.string()
    .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
  gender: Yup.string().required('Gender is required'),
});

const ProfileForm = () => {
  const [open, setOpen] = useState(false);

  const handleFileUpload = async (setFieldValue: any, field: any) => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images], // Only images allowed
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

  return (
    <Formik
      initialValues={{
        name: '',
        dob: '',
        email: '',
        mobile: '',
        gender: '',
        countryCode: '+91',
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        console.log('Form Submitted', values);
        // Handle form submit
      }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => handleFileUpload(setFieldValue, 'profile_img')}>
            {values?.profile_img ? (
              <Image
                source={{uri: values?.profile_img?.uri}}
                style={styles.previewProfileImage}
              />
            ) : (
              <Image
                source={{
                  uri: 'https://img.freepik.com/premium-photo/default-male-user-icon-blank-profile-image-green-background-profile-picture-icon_962764-98397.jpg?w=826',
                }}
                style={styles.avatar}
              />
            )}
            <TouchableOpacity
              style={styles.profilePictureEditIcon}
              onPress={() => handleFileUpload(setFieldValue, 'profile_img')}>
              <Text style={{color: '#000', fontSize: 18}}>📷</Text> {/* Replace with camera icon */}
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Rest of the form fields */}

          <TextInput
            placeholder="Enter your name"
            value={values.name}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            style={styles.input}
          />
          {errors.name && touched.name && (
            <View style={styles.errorContainer}>
              <ErrorText text={errors?.name} />
            </View>
          )}

          {/* DOB Picker */}
          <TouchableOpacity style={styles.input} onPress={() => setOpen(true)}>
            <Text style={{color: values.dob ? '#000' : '#999'}}>
              {values.dob
                ? new Date(values.dob).toDateString()
                : 'Select Date of Birth'}
            </Text>
          </TouchableOpacity>
          {errors.dob && touched.dob && (
            <View style={styles.errorContainer}>
              <ErrorText text={errors?.dob} />
            </View>
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

          {/* Other form fields */}

          {/* Continue Button */}
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor:
                  Object.keys(errors).length === 0 &&
                  Object.values(values).every(v => v)
                    ? '#6B4EFF'
                    : '#ccc',
              },
            ]}
            onPress={handleSubmit as any}
            disabled={
              Object.keys(errors).length > 0 ||
              !Object.values(values).every(v => v)
            }>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default ProfileForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    gap: 10,
    backgroundColor: '#fff',
    width: widthPercentageToDP('100%'),
  },
  errorContainer: {paddingLeft: 12},
  input: {
    width: widthPercentageToDP('90%'),
    height: 44,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  profileButton: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
  },
  previewProfileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'cover',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ccc',
  },
  profilePictureEditIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
  },
  button: {
    width: widthPercentageToDP('90%'),
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
