import {getCalendarPosts, ResponseCalendarPost} from '@/api';
import {queryKeys} from '@/constants';
import {UseQueryCustomOptions} from '@/types/common';
import {keepPreviousData, useQuery} from '@tanstack/react-query';

function useGetCalendarPosts(
  year: number,
  month: number,
  queryOptions?: UseQueryCustomOptions<ResponseCalendarPost>,
) {
  return useQuery({
    queryFn: () => getCalendarPosts(year, month),
    queryKey: [queryKeys.POST, queryKeys.GET_CALENDAR_POSTS, year, month],
    placeholderData: keepPreviousData, // 이전 데이터를 유지하고 싶을 때 사용 (화면이 깜빡거림을 방지하기위해 사용)
    ...queryOptions,
  });
}

export default useGetCalendarPosts;
