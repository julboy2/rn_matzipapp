import {FlatList, StyleSheet, Text, View} from 'react-native';
import FeedItem from './FeedItem';
import {useState} from 'react';
import useGetInfiniteFavoritePosts from '@/hooks/queries/useGetInfiniteFavoritePosts';

function FeedFavoriteList() {
  const {
    data: posts,
    fetchNextPage, // 다음 페이지를 가져오는 함수
    hasNextPage, // 다음 페이지가 있는지 확인하는 함수
    isFetchingNextPage, // 다음 페이지를 가져오고 있는 상태인지 확인하는 함수
    refetch, // 다시 가져오는 함수
  } = useGetInfiniteFavoritePosts();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleRefresh = async () => {
    // 위로끌어당겼을때 상태값을 true로 변경
    setIsRefreshing(true);

    await refetch(); // 다시 가져오는 함수
    setIsRefreshing(false);
  };

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // FlatList (데이터의 길이가 정해져 있지 않을때) 를 사용하여 무한 스크롤링을 구현한다.
  // ScrollView (데이터의 길이가 정해져 있을때) 데이터가 많지않을때 사용한다.

  return (
    <FlatList
      data={posts?.pages.flat()}
      renderItem={({item}) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      ListEmptyComponent={
        <View>
          <Text style={{textAlign: 'center'}}>즐겨찾기한 장소가 없습니다.</Text>
        </View>
      }
      contentContainerStyle={styles.contentContainer}
      onEndReached={handleEndReached} // 스크롤이 끝에 도달했을때 호출되는 함수
      onEndReachedThreshold={0.5} // onEndReached 함수가 호출되는 시점을 결정하는 값 (바닥에 완전히 닫기전에 가져오기위해)
      refreshing={isRefreshing} // 새로고침을 했을때
      onRefresh={handleRefresh} // 새로고침을 했을때 (스크롤을 아래로 끌어당겼을때) 호출되는 함수
      scrollIndicatorInsets={{right: 1}} // 스크롤바의 위치를 조정하는 속성 (가끔 버그로 인해 사용)
      indicatorStyle="black" // 스크롤바의 색상을 결정하는 속성
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
});

export default FeedFavoriteList;
