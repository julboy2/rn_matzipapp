import {deletePost} from '@/api';
import queryClient from '@/api/queryClient';
import {queryKeys} from '@/constants';
import {UseMutationCustomOptions} from '@/types/common';
import {Marker} from '@/types/domain';
import {useMutation} from '@tanstack/react-query';

function useMutateDeletePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: deleteId => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      // 1. 마커를 다시 호출할 수도 있고
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_CALENDAR_POSTS],
      });

      // 2. 삭제를 하면 삭제된 deleteId 를 주는데 deleteId 로 직접 캐시를 업데이트 할수도 있음
      //   queryClient.setQueryData<Marker[]>(
      //     [queryKeys.MARKER, queryKeys.GET_MARKERS],
      //     existingMarkers => {
      //       return existingMarkers?.filter(marker => marker.id !== deleteId);
      //     },
      //   );
    },
    ...mutationOptions,
  });
}

export default useMutateDeletePost;
