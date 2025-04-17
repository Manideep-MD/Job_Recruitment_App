import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useCustomTheme} from '../../theme/ThemeContext';
import {ThemeColors} from '../../theme/themeConfig';

const Expertise = () => {
  const {theme} = useCustomTheme();
  const styles = createStyles(theme);
  return (
    <View>
      <Text>Expertise</Text>
    </View>
  );
};

export default Expertise;

const createStyles = (theme: ThemeColors) => StyleSheet.create({
    
});
