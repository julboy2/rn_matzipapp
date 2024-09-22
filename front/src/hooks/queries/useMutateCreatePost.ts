import {createPost} from '@/api';
import queryClient from '@/api/queryClient';
import {queryKeys} from '@/constants';
import {UseMutationCustomOptions} from '@/types/common';
import {Marker} from '@/types/domain';
import {useMutation} from '@tanstack/react-query';

function useMutateCreatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createPost,
    onSuccess: newPost => {
      // 1. 첫번재 방법은 서버에서 다시 데이터를 불러오는 방법
      // queryClient.invalidateQueries({
      //   queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      // });

      // 2. 두번째 방법은 서버에서 다시 데이터를 불러오는 것이 아닌
      // 캐시에 있는 기존의 데이터를 불러오는 방법
      // setQueryData 해당 함수를 사용하면 해다 키에 맞는 데이터를 불러올 수 있다.
      queryClient.setQueryData<Marker[]>(
        [queryKeys.MARKER, queryKeys.GET_MARKERS],
        existingMarkers => {
          const newMarker = {
            id: newPost.id,
            latitude: newPost.latitude,
            longitude: newPost.longitude,
            color: newPost.color,
            score: newPost.score,
          };

          return existingMarkers
            ? [...existingMarkers, newMarker]
            : [newMarker];
        },
      );
    },
    ...mutationOptions,
  });
}

export default useMutateCreatePost;
