import FeedList from '@/components/FeedList';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

function FeedHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FeedList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedHomeScreen;
