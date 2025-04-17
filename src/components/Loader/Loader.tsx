import React from 'react';
import {View, Text, Modal, ActivityIndicator, StyleSheet} from 'react-native';
import createStyle from './Loader.style';
import {useCustomTheme} from '../../theme/ThemeContext';

const Loader = () => {
  const {theme} = useCustomTheme();
  const styles = createStyle();

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={true}
      onRequestClose={() => {}}>
      <View style={styles.overlay}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={theme.darkActive} />
          <Text style={styles.text}>Please Wait</Text>
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
