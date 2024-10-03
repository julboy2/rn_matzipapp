import {getPosts, ResponsePost} from '@/api';
import {queryKeys} from '@/constants';
import {ResponseError} from '@/types/common';
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

function useGetInfinitePosts(
  queryOptions?: UseInfiniteQueryOptions<
    ResponsePost[],
    ResponseError,
    // ResponsePost[][],
    InfiniteData<ResponsePost[], number>,
    ResponsePost[],
    QueryKey,
    number
  >,
) {
  // useInfiniteQuery 는 useQuery 와 비슷하지만 페이징을 지원합니다.
  // suspense를 사용하기위해 useSuspenseInfiniteQuery 로변경
  return useSuspenseInfiniteQuery({
    queryFn: ({pageParam}) => getPosts(pageParam),
    queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
    // throwOnError: true,  // ErrorBoundary 를 위해 사용, useSuspenseInfiniteQuery 에서는 기본적으로 사용하기때메 주석

    // select: data => data.pages, // 만약 이렇게 사용하면  , 3번째 인자를 ResponsePost[][] 이렇게 반환하면 된다.
    // data 를 리턴하려면 InfiniteData<ResponsePost[], number>, 이렇게 사용하면 된다.
    // select: data => data.pages, 를 안쓰면 data 로 반환환다
    ...queryOptions,
  });
}

export default useGetInfinitePosts;
