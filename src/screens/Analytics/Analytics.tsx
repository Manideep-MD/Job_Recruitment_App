// screens/Analytics/Analytics.tsx
import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {ThemeColors} from '../../theme/themeConfig';
import {useCustomTheme} from '../../theme/ThemeContext';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import CustomFastImage from '../../components/CustomFastImage/CustomFastImage';

const Analytics = () => {
  const {theme} = useCustomTheme();
  const styles = createStyles(theme);

  return (
    <>
      <CustomHeader title="Analysis" />
      <View style={styles.container}>
        <CustomFastImage
          source={require('../../assets/images/lineChart.png')}
          style={styles.chartImage}
          resizeMode="cover"
        />

        <CustomFastImage
          source={require('../../assets/images/barChart.png')}
          style={styles.barImage}
          resizeMode="contain"
        />
      </View>
    </>
  );
};

export default Analytics;

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      backgroundColor: theme.background,
      paddingTop: 10,
      height: '100%',
      paddingBottom: 90,
    },
    chartImage: {
      width: widthPercentageToDP('95%'),
      height: 387.5,
      marginBottom: 20,
      borderRadius: 10,
    },
    barImage: {width: '95%', height: 300},
  });
