import React, {useCallback} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';
import {JobItem} from '../../redux/reducers/savedJobsReducer';
import JobCard from '../../components/JobCard/JobCard';
import CustomHeader from '../../components/CustomHeader/CustomHeader';

const Saved: React.FC = () => {
  const savedJobs = useSelector((state: RootState) => state.savedJobs.jobs);

  const renderJobCard = useCallback(({item}: {item: JobItem}) => {
    return <JobCard item={item} />;
  }, []);

  return (
    <>
      <CustomHeader title={'Saved Jobs'} />
      <View style={styles.container}>
        {savedJobs.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No saved jobs yet!</Text>
          </View>
        ) : (
          <FlatList
            data={savedJobs}
            renderItem={renderJobCard}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </>
  );
};

export default Saved;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
});
