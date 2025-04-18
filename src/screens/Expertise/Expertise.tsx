import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useCustomTheme} from '../../theme/ThemeContext';
import {ThemeColors} from '../../theme/themeConfig';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants/screenNames';
import {Checkbox} from 'react-native-ui-lib';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const Expertise = () => {
  const {theme} = useCustomTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<any>();
  const [business, setBusiness] = useState(false);
  const [communication, setCommunication] = useState(false);
  const [design, setDesign] = useState(false);
  const [development, setDevelopment] = useState(false);

  const handleSubmit = () => {
    navigation.navigate(SCREENS.PROFILE_DETAILS,{routeName:'expertise'});
  };

  return (
    <View style={styles.container}>
      <View style={{width: 349, height: 84}}>
        <Text style={{fontSize: 32, fontWeight: 700, textAlign: 'center'}}>
          What is your field of expertise ?
        </Text>
      </View>
      <View style={{width: 349, height: 69, marginTop: 20}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 14,
            fontWeight: 500,
            color: theme.grey,
            lineHeight: 18.4,
          }}>
          please select your field of expertise (up to 2)
        </Text>
      </View>
      <View style={{padding: 10}}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={business}
            onValueChange={setBusiness}
            color="#1F81B9"
            label="Business"
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={communication}
            onValueChange={setCommunication}
            color="#1F81B9"
            label="Communication"
          />
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox
            value={design}
            onValueChange={setDesign}
            color="#1F81B9"
            label="Design"
          />
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox
            value={development}
            onValueChange={setDevelopment}
            color="#1F81B9"
            label="Development"
            labelStyle={{
              fontSize: 12.92,
              fontWeight: 400,
            }}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.btnText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Expertise;

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      paddingTop: 40,
      alignItems: 'center',
      height: '100%',
    },
    mainImage: {width: 63.1, height: 88},
    secondImage: {width: 33, height: 32},
    imageContainer: {gap: 10, paddingBottom: 20},
    button: {
      width: 327,
      height: 48,
      backgroundColor: '#1D61E7',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 70,
    },
    btnText: {
      color: theme.background,
      fontWeight: 500,
      letterSpacing: -1,
    },

    checkboxContainer: {
      marginBottom: 30,
      width: widthPercentageToDP('90%'),
      height: 36,
      borderWidth: 1,
      borderColor: '#DDDDDD',
      justifyContent: 'center',
      paddingLeft: 10,
      borderRadius: 6.89,
    },
    label: {
      marginLeft: 8,
      fontSize: 16,
    },
  });
