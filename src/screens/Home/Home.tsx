import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useCustomTheme} from '../../theme/ThemeContext';
import {ThemeColors} from '../../theme/themeConfig';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fetchJobsList} from '../../api/api';
import Loader from '../../components/Loader/Loader';
import JobCard from '../../components/JobCard/JobCard';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {RootState} from '../../redux/store/store';
import {useSelector} from 'react-redux';

const Home = () => {
  const {theme} = useCustomTheme();
  const styles = createStyles(theme);
  const [jobs, setJobs] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    handleJobsList();
  }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Exit App', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true; // prevents default behavior of back button
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const handleJobsList = async () => {
    setLoading(true);
    try {
      const response = await fetchJobsList();
      if (response && response.status == 200) {
        console.log(response, 'respo0--------------->');
        console.log(response.data, 'data------------->');
        setJobs(response?.data);
      } else {
        console.log('Error while fetching the data');
      }
    } catch (error) {
      console.log(error, 'error----------->');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await handleJobsList();
    } catch (error) {
      console.log(error, 'refresh error');
    } finally {
      setRefreshing(false);
    }
  };

  const renderJobs = useCallback(({item}: {item: any}) => {
    return (
      <View style={styles.jobCardWrapper}>
        <JobCard item={item} />
      </View>
    );
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View>
          <View style={styles.headerWrapper}>
            <View style={styles.headerLeft}>
              <View>
                {user?.profile_img ? (
                  <Image
                    source={{uri: user.profile_img.uri}}
                    style={styles.profileImage}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/Frame.png')}
                    style={styles.profileImage}
                    resizeMode="cover"
                  />
                )}
              </View>
              <View style={styles.headerTextWrapper}>
                <Text style={styles.goodMorningText}>Good Morning</Text>
                {user?.name ? (
                  <Text style={styles.nameText}>{user?.name}</Text>
                ) : (
                  <Text style={styles.nameText}>Jackson James</Text>
                )}
              </View>
            </View>
            <View style={styles.notificationIcon}></View>
          </View>
        </View>

        <View style={styles.searchFilterWrapper}>
          <View style={styles.searchWrapper}>
            <View style={styles.searchIconWrapper}>
              <AntDesign name="search1" size={24} color={'#ccc'} />
            </View>
          </View>
          <View style={styles.filterWrapper}>
            <AntDesign name="filter" size={30} color={theme.text} />
          </View>
        </View>

        <View>
          <Image
            source={require('../../assets/images/Frame116.png')}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.recommendationsHeader}>
          <Text style={styles.recommendationsTitle}>Recommendations</Text>
          <Text style={styles.seeAllText}>See All</Text>
        </View>
      </View>

      <View style={styles.jobsListWrapper}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#3270E9"
            />
          }
          keyExtractor={item => item?.id.toString()}
          data={jobs}
          renderItem={renderJobs}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      </View>

      {loading && <Loader />}
    </>
  );
};

export default Home;

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center',
      gap: 20,
      paddingTop: 20,
    },
    headerWrapper: {
      // maxWidth:372,
      width: wp('95%'),
      height: 48,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    headerLeft: {
      width: 174,
      height: 48,
      flexDirection: 'row',
    },
    profileImage: {
      width: 48,
      height: 48,
      borderRadius: 100,
    },
    headerTextWrapper: {
      width: 174,
      height: 48,
    },
    goodMorningText: {
      fontSize: 16,
      fontWeight: '400',
      letterSpacing: 1,
      textAlign: 'center',
    },
    nameText: {
      fontSize: 17,
      fontWeight: '700',
      letterSpacing: 1,
      textAlign: 'center',
    },
    notificationIcon: {
      width: 32,
      height: 32,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: '#ccc',
    },
    searchFilterWrapper: {
      flexDirection: 'row',
      gap: 10,
    },
    searchWrapper: {
      width: wp('80%'),
      height: 40,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: '#ccc',
      justifyContent: 'center',
    },
    searchIconWrapper: {
      width: 50,
      height: 35,
      borderRightWidth: 1,
      borderColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
    },
    filterWrapper: {
      width: 40,
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bannerImage: {
      width: wp('95%'),
      height: 140,
      borderRadius: 8,
    },
    recommendationsHeader: {
      width: wp('90%'),
      height: 40,
      borderBottomWidth: 1,
      borderColor: '#ccc',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    recommendationsTitle: {
      fontSize: 16,
      fontWeight: '700',
      letterSpacing: 1,
    },
    seeAllText: {
      fontSize: 16,
      fontWeight: '700',
      letterSpacing: 1,
      color: '#3270E9',
    },
    jobsListWrapper: {
      alignItems: 'center',
      paddingTop: 20,
    },
    flatListContent: {
      paddingBottom: '80%',
    },
    jobCardWrapper: {
      marginBottom: 20,
    },
  });
