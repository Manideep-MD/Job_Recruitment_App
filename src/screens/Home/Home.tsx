import {FlatList, Image, RefreshControl, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useCustomTheme} from '../../theme/ThemeContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fetchJobsList} from '../../api/api';
import Loader from '../../components/Loader/Loader';
import JobCard from '../../components/JobCard/JobCard';
import {RootState} from '../../redux/store/store';
import {useSelector} from 'react-redux';
import {createStyles} from './style';
import {getGreeting} from '../../Utils/timeHelper';
import {TextInput} from 'react-native-gesture-handler';
import CustomFastImage from '../../components/CustomFastImage/CustomFastImage';

const Home = () => {
  const {theme} = useCustomTheme();
  const styles = createStyles(theme);
  const [jobs, setJobs] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredJobs, setFilteredJobs] = useState<any>([]);

  useEffect(() => {
    handleJobsList();
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = jobs?.filter(
      (job: any) =>
        job?.title?.toLowerCase().includes(text.toLowerCase()) ||
        job?.company_name?.toLowerCase().includes(text.toLowerCase()) ||
        job?.posted_time?.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredJobs(filtered);
  };

  const handleJobsList = async () => {
    setLoading(true);
    try {
      const response = await fetchJobsList();
      if (response && response.status === 200) {
        setJobs(response?.data);
        setFilteredJobs(response?.data);
      } else {
        console.log('Error while fetching the data');
      }
    } catch (error: any) {
      console.log(error, 'errorResponse');
      if (error?.response) {
        console.log('Server Error:', error?.response?.data);
      } else if (error?.request) {
        console.error('Network Error: No response received', error?.request);
      } else {
        console.error('Unexpected Error:', error?.message);
      }
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
                <CustomFastImage
                  source={
                    user?.profile_img?.uri
                      ? {uri: user.profile_img.uri}
                      : require('../../assets/images/Frame.png')
                  }
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.headerTextWrapper}>
                <Text style={styles.goodMorningText}>{getGreeting()}</Text>
                {user?.name ? (
                  <Text style={styles.nameText}>{user?.name}</Text>
                ) : (
                  <Text style={styles.nameText}>User</Text>
                )}
              </View>
            </View>
            <View style={styles.notificationIcon}>
              <Ionicons
                name="notifications-outline"
                size={23}
                color={theme.text}
              />
              <View style={styles.indicator}></View>
            </View>
          </View>
        </View>

        <View style={styles.searchFilterWrapper}>
          <View style={styles.searchWrapper}>
            <View style={styles.searchIconWrapper}>
              <AntDesign name="search1" size={24} color={'#BBBBBB'} />
            </View>
            <TextInput
              value={searchQuery}
              onChangeText={handleSearch}
              placeholder="Search jobs..."
              placeholderTextColor={'#BBBBBB'}
              style={styles.searchInput}
            />
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
              tintColor={theme.lightBlueHover}
            />
          }
          keyExtractor={item => item?.id.toString()}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No Data Found</Text>
          }
          data={filteredJobs}
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
