import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useCustomTheme} from '../../theme/ThemeContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants/screenNames';

const Welcome = () => {
  const {theme} = useCustomTheme();
  // const styles = createStyles(theme);
  const navigation = useNavigation<any>();

  const handleEnter = () => {
    navigation.navigate(SCREENS.LOGIN);
  };
  return (
    <View style={{position: 'relative'}}>
      <Image
        source={require('../../assets/images/Welcome.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <TouchableOpacity
        style={{
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
        }}
        onPress={handleEnter}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 400,
            color: theme.background,
            letterSpacing: 1.5,
          }}>
          ENTER
        </Text>
        <AntDesign name="right" size={24} color={theme.background} />
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
