import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useCustomTheme} from '../../theme/ThemeContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants/screenNames';
import {ThemeColors} from '../../theme/themeConfig';

const Welcome = () => {
  const {theme} = useCustomTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<any>();

  const handleEnter = () => {
    navigation.navigate(SCREENS.LOGIN);
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/Welcome.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <TouchableOpacity style={styles.welcomeButton} onPress={handleEnter}>
        <Text style={styles.enterText}>ENTER</Text>
        <AntDesign name="right" size={24} color={theme.background} />
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {position: 'relative'},
    image: {
      width: '100%',
      height: '100%',
    },
    welcomeButton: {
      width: '80%',
      height: 55,
      position: 'absolute',
      top: '55%',
      left: '10%',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.background,
      flexDirection: 'row',
      paddingLeft: 13,
      alignItems: 'center',
      paddingRight: 13,
    },
    enterText: {
      fontSize: 24,
      fontWeight: 400,
      color: theme.background,
      letterSpacing: 1.5,
    },
  });
