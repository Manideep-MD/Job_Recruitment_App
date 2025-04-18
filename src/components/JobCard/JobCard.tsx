import React, {useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useCustomTheme} from '../../theme/ThemeContext';
import StarRating from 'react-native-star-rating-widget';
import {useDispatch, useSelector} from 'react-redux';
import {removeJob, saveJob} from '../../redux/reducers/savedJobsReducer';
import {RootState} from '../../redux/store/store';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {ThemeColors} from '../../theme/themeConfig';
import CustomFastImage from '../CustomFastImage/CustomFastImage';

interface JobItem {
  id: number;
  image: string;
  title: string;
  rating: number;
  description: string;
  header: string;
  location: string;
  jobtype: string;
  salary: string;
  time: string;
  date: string;
}

interface JobCardProps {
  item: JobItem;
}

const JobCard: React.FC<JobCardProps> = ({item}) => {
  const {theme} = useCustomTheme();
  const styles = createStyle(theme);
  const dispatch = useDispatch();

  const savedJobs = useSelector((state: RootState) => state.savedJobs.jobs);
  const isSaved = savedJobs.find(job => job.id === item.id);

  const handleBookmarkToggle = () => {
    if (isSaved) {
      dispatch(removeJob({id: item.id}));
    } else {
      dispatch(saveJob(item));
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerContainer}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.imageWrapper}>
            <CustomFastImage
              source={{uri: item?.image}}
              style={styles.image}
              resizeMode="center"
            />
          </View>
          <View style={styles.titleContainer}>
            <Text
              style={styles.titleText}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item?.title}
            </Text>
            <StarRating
              rating={item?.rating}
              onChange={() => {}}
              starSize={20}
              enableSwiping={false}
              enableHalfStar={false}
              color="gold"
            />
          </View>
        </View>
        <TouchableOpacity onPress={handleBookmarkToggle}>
          {isSaved ? (
            <FontAwesome
              name="bookmark"
              size={30}
              color={theme.lightBlueHover}
            />
          ) : (
            <FontAwesome name="bookmark-o" size={30} color={theme.text} />
          )}
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.headerText}>{item?.header}</Text>
      </View>

      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <EvilIcons name="location" size={16} color={theme.grey} />
          <Text style={styles.font}>{item?.location}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={16} color={theme.grey} />
          <Text style={styles.font}>{item?.jobtype}</Text>
        </View>
        <View style={styles.detailItem}>
          <Foundation name="dollar" size={22} color={theme.grey} />
          <Text style={styles.font}>{item?.salary}</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialIcons name="date-range" size={22} color={theme.grey} />
          <Text style={styles.font}>{item?.time} min ago</Text>
        </View>
      </View>

      <View>
        <Text style={styles.descriptionText}>{item?.description}</Text>
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{item?.date}</Text>
      </View>
    </View>
  );
};

export default React.memo(JobCard);

const createStyle = (theme: ThemeColors) =>
  StyleSheet.create({
    cardContainer: {
      width: wp('90%'),
      // height: 234,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.borderColor,
      gap: 8,
      padding: 10,
    },
    font: {
      color: theme.borderColor,
    },
    headerContainer: {
      width: wp('82%'),
      height: 44,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    imageWrapper: {
      width: 44,
      height: 44,
    },
    image: {
      width: 44,
      height: 44,
    },
    titleContainer: {
      width: 170,
      height: 44,
      gap: 8,
    },
    titleText: {
      fontSize: 14,
      fontWeight: 400,
      paddingLeft: 10,
      color: theme.text,
    },
    headerText: {
      fontSize: 16,
      fontWeight: 500,
      color: theme.borderColor,
    },
    detailsRow: {
      width: 300,
      height: 22,
      flexDirection: 'row',
      gap: 10,
    },
    detailItem: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5,
    },
    timeAgoText: {
      fontSize: 12,
    },
    descriptionText: {
      fontSize: 14,
      fontWeight: '400',
      width: wp('80%'),
      color: theme.borderColor,
    },
    dateContainer: {
      alignItems: 'flex-end',
      width: wp('89%'),
      paddingRight: 16,
    },
    dateText: {
      fontSize: 12,
      fontWeight: '500',
      color: theme.darkBlue,
    },
  });
