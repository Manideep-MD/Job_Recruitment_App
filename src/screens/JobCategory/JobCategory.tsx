import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useCustomTheme} from '../../theme/ThemeContext';
import {ThemeColors} from '../../theme/themeConfig';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants/screenNames';

const tabs = [
  {
    id: 1,
    title: 'Find a Job',
    description: 'I want to find a job',
  },
  {
    id: 2,
    title: 'Find an Employee',
    description: 'I want to find employees',
  },
];

const JobCategory = () => {
  const {theme} = useCustomTheme();
  const styles = createStyles(theme);
  const [tab, setTab] = useState(2);
  const navigation = useNavigation<any>();

  const handleTabs = (id: any) => {
    setTab(id);
  };

  const handleSubmit = () => {
    navigation.navigate(SCREENS.EXPERTISE);
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
      <View style={{width: 349, height: 45}}>
        <Text style={{fontSize: 32, fontWeight: 700}}>
          Select a Job Category
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
            letterSpacing: 1,
          }}>
          Select whether you're seeking employment opportunities or your
          organization requires talented individuals.
        </Text>
      </View>
      <View style={{flexDirection: 'row', gap: 20, paddingTop: 20}}>
        {tabs &&
          tabs.map(item => {
            const selectedTab = item?.id == tab;
            return (
              <>
                <Pressable
                  style={{
                    width: 176,
                    height: 248,
                    borderWidth: 1,
                    borderRadius: 8,
                    backgroundColor: selectedTab ? 'transparent' : '#ccc',
                    borderColor: selectedTab ? theme.normal : 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 10,
                  }}
                  onPress={() => handleTabs(item?.id)}>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      letterSpacing: 1,
                      textAlign: 'center',
                    }}>
                    {item?.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      letterSpacing: 0,
                      width: 157,
                      textAlign: 'center',
                    }}>
                    {item?.description}
                  </Text>
                </Pressable>
              </>
            );
          })}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.btnText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default JobCategory;

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
  });
