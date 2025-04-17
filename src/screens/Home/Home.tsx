import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import {useCustomTheme} from '../../theme/ThemeContext';
import {ThemeColors} from '../../theme/themeConfig';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const jobs = [
  {
    id: 1,
    image: '',
    title: 'Sunshine Productions',
    rating: 4,
    description:
      'We are in need of a professional commercial model who is 180 cm tall and has a fair complexion and loves to dance and sing along with confidence.',
    header: 'Commercial Model',
    location: 'Mumbai',
    jobtype: 'full-time',
    salary: '50-55',
    time: '30',
    date: '09/05/2024',
  },
  {
    id: 2,
    image: '',
    title: 'Sunshine Productions',
    rating: 4,
    description:
      'We are in need of a professional commercial model who is 180 cm tall and has a fair complexion and loves to dance and sing along with confidence.',
    header: 'Commercial Model',
    location: 'Mumbai',
    jobtype: 'full-time',
    salary: '50-55',
    time: '30',
    date: '09/05/2024',
  },
  {
    id: 3,
    image: '',
    title: 'Sunshine Productions',
    rating: 4,
    description:
      'We are in need of a professional commercial model who is 180 cm tall and has a fair complexion and loves to dance and sing along with confidence.',
    header: 'Commercial Model',
    location: 'Mumbai',
    jobtype: 'full-time',
    salary: '50-55',
    time: '30',
    date: '09/05/2024',
  },
  {
    id: 5,
    image: '',
    title: 'Sunshine Productions',
    rating: 4,
    description:
      'We are in need of a professional commercial model who is 180 cm tall and has a fair complexion and loves to dance and sing along with confidence.',
    header: 'Commercial Model',
    location: 'Mumbai',
    jobtype: 'full-time',
    salary: '50-55',
    time: '30',
    date: '09/05/2024',
  },
  {
    id: 6,
    image: '',
    title: 'Sunshine Productions',
    rating: 4,
    description:
      'We are in need of a professional commercial model who is 180 cm tall and has a fair complexion and loves to dance and sing along with confidence.',
    header: 'Commercial Model',
    location: 'Mumbai',
    jobtype: 'full-time',
    salary: '50-55',
    time: '30',
    date: '09/05/2024',
  },
];

const Home = () => {
  const {theme} = useCustomTheme();
  const styles = createStyles(theme);

  const renderJobs = useCallback(({item}: {item: any}) => {
    return (
      <View style={{marginBottom: 20}}>
        <View
          style={{
            width: 372,
            height: 222,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#E4E5E8',
            gap: 8,
            paddingLeft: 10,
          }}>
          <View
            style={{
              width: 240,
              height: 44,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{width: 44, height: 44}}></View>
            <View style={{width: 170, height: 44}}>
              <Text
                style={{fontSize: 14, fontWeight: 400, textAlign: 'center'}}>
                {item?.title}
              </Text>
            </View>
          </View>
          <View>
            <Text style={{fontSize: 16, fontWeight: 500}}>{item?.header}</Text>
          </View>
          <View
            style={{
              width: 300,
              height: 22,
              flexDirection: 'row',
              gap: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
              }}>
              <EvilIcons name="location" size={16} color={theme.grey} />
              <Text>{item?.location}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
              }}>
              <Ionicons name="time-outline" size={16} color={theme.grey} />
              <Text>{item?.jobtype}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
              }}>
              <Foundation name="dollar" size={22} color={theme.grey} />
              <Text>{item?.salary}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
              }}>
              <MaterialIcons name="date-range" size={22} color={theme.grey} />
              <Text>{item?.time}</Text>
            </View>
          </View>
          <View>
            <Text style={{fontSize: 14, fontWeight: 400, width: 340}}>
              {item?.description}
            </Text>
          </View>
          <View style={{alignItems: 'flex-end', width: 372, paddingRight: 16}}>
            <Text style={{fontSize: 12, fontWeight: 500, color: '#3975EA'}}>
              {item?.date}
            </Text>
          </View>
        </View>
      </View>
    );
  }, []);

  return (
    <>
      <View
        style={{width: '100%', alignItems: 'center', gap: 20, paddingTop: 20}}>
        <View>
          <View
            style={{
              width: 372,
              height: 48,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: 174,
                height: 48,
                flexDirection: 'row',
              }}>
              <View>
                <Image
                  source={require('../../assets/images/Frame.png')}
                  style={{width: 48, height: 48, borderRadius: 100}}
                  resizeMode="cover"
                />
              </View>
              <View style={{width: 174, height: 48}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    letterSpacing: 1,
                    textAlign: 'center',
                  }}>
                  Good Morning
                </Text>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    letterSpacing: 1,
                    textAlign: 'center',
                  }}>
                  Jackson James
                </Text>
              </View>
            </View>
            <View
              style={{
                width: 32,
                height: 32,
                borderWidth: 1,
                borderRadius: 8,
                borderColor: '#ccc',
              }}></View>
          </View>
        </View>
        <View style={{flexDirection: 'row', gap: 10}}>
          <View
            style={{
              width: 328,
              height: 40,
              borderWidth: 1,
              borderRadius: 8,
              borderColor: '#ccc',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: 50,
                height: 35,
                borderRightWidth: 1,
                borderColor: '#ccc',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AntDesign name="search1" size={24} color={'#ccc'} />
            </View>
          </View>
          <View
            style={{
              width: 40,
              height: 40,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AntDesign name="filter" size={30} color={theme.text} />
          </View>
        </View>

        <View>
          <Image
            source={require('../../assets/images/Frame116.png')}
            style={{width: 372, height: 140}}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            width: 372,
            height: 40,
            borderBottomWidth: 1,
            borderColor: '#ccc',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 16, fontWeight: 700, letterSpacing: 1}}>
            Recommendations
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: 1,
              color: '#3270E9',
            }}>
            See All
          </Text>
        </View>
      </View>
      <View style={{alignItems: 'center', paddingTop: 20}}>
        <FlatList
          keyExtractor={item => item?.id.toString()}
          data={jobs}
          renderItem={renderJobs}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: '80%',
          }}
        />
      </View>
    </>
  );
};

export default Home;

const createStyles = (theme: ThemeColors) => StyleSheet.create({});
