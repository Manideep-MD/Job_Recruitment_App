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
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants/screenNames';
import { widthPercentageToDP } from 'react-native-responsive-screen';

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

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Select a Job Category</Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          Select whether you're seeking employment opportunities or your
          organization requires talented individuals.
        </Text>
      </View>

      <View style={styles.tabsContainer}>
        {tabs &&
          tabs.map(item => {
            const selectedTab = item?.id == tab;
            return (
              <Pressable
                key={item?.id}
                style={[
                  styles.tabItem,
                  {
                    backgroundColor: selectedTab ? 'transparent' : '#ccc',
                    borderColor: selectedTab ? theme.normal : 'transparent',
                  },
                ]}
                onPress={() => handleTabs(item?.id)}>
                <Text style={styles.tabTitle}>{item?.title}</Text>
                <Text style={styles.tabDescription}>{item?.description}</Text>
              </Pressable>
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
      width: widthPercentageToDP('100%'),
      paddingTop: 40,
      alignItems: 'center',
    },
    imageContainer: {
      gap: 10,
      paddingBottom: 20,
    },
    mainImage: {
      width: 63.1,
      height: 88,
    },
    secondImage: {
      width: 33,
      height: 32,
    },
    titleContainer: {
      width: 349,
      height: 45,
    },
    titleText: {
      fontSize: 32,
      fontWeight: '700',
      textAlign:'center'
    },
    descriptionContainer: {
      width: 349,
      height: 69,
      marginTop: 20,
    },
    descriptionText: {
      textAlign: 'center',
      fontSize: 14,
      fontWeight: '500',
      color: theme.grey,
      lineHeight: 18.4,
      letterSpacing: 1,
    },
    tabsContainer: {
      flexDirection: 'row',
      gap: 10,
      paddingTop: 20,
    },
    tabItem: {
      width: widthPercentageToDP('45%'),
      height: 248,
      borderWidth: 1,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    tabTitle: {
      fontSize: 24,
      fontWeight: '700',
      letterSpacing: 1,
      textAlign: 'center',
    },
    tabDescription: {
      fontSize: 14,
      fontWeight: '400',
      letterSpacing: 0,
      width: 157,
      textAlign: 'center',
    },
    button: {
      width: widthPercentageToDP('90%'),
      height: 48,
      backgroundColor: '#1D61E7',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50,
    },
    btnText: {
      color: theme.background,
      fontWeight: '500',
      letterSpacing: -1,
    },
  });
