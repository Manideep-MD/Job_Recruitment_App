import {
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useCustomTheme} from '../../theme/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants/screenNames';
import { createStyles } from './style';

interface TabItem {
  id: number;
  title: string;
  description: string;
}

const tabs: TabItem[] = [
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

const JobCategory: React.FC = () => {
  const {theme} = useCustomTheme();
  const styles = createStyles(theme);
  const [tab, setTab] = useState<number>(2);
  const navigation = useNavigation<any>();

  const handleTabs = (id: number) => {
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
        {tabs.map(item => {
          const selectedTab = item.id === tab;
          return (
            <Pressable
              key={item.id}
              style={[
                styles.tabItem,
                {
                  backgroundColor: selectedTab ? 'transparent' : '#ccc',
                  borderColor: selectedTab
                    ? theme.lightBlueHover
                    : 'transparent',
                },
              ]}
              onPress={() => handleTabs(item.id)}>
              <Text style={styles.tabTitle}>{item.title}</Text>
              <Text style={styles.tabDescription}>{item.description}</Text>
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


