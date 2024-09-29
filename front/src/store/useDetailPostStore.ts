/**
 *  게시글 상세 정보를 관리하는 store
 *  게시글을 수정 했을때 상태를 관리하기위해 사용
 */

import {ResponsePost} from '@/api';
import {create} from 'zustand';

interface DetailPostState {
  detailPost: ResponsePost | null;
  setDetailPost: (detailPost: ResponsePost) => void;
}

const useDetailStore = create<DetailPostState>(set => ({
  detailPost: null,
  setDetailPost: (detailPost: ResponsePost) => {
    set({detailPost});
  },
}));

export default useDetailStore;
