import axios from 'axios';
import {useEffect, useState} from 'react';
import Config from 'react-native-config';
import {LatLng} from 'react-native-maps';
import useDebounce from './useDebounce';

type Meta = {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
  same_name: {
    region: string[];
    keyword: string;
    selected_region: string;
  };
};

export type RegionInfo = {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code: string;
  category_group_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
  place_url: string;
  distance: string;
};

type RegionResponse = {
  meta: Meta;
  documents: RegionInfo[];
};

function useSearchLocation(keyword: string, location: LatLng) {
  const [regionInfo, setRegionInfo] = useState<RegionInfo[]>();
  const [pageParam, setPageParam] = useState(1);

  // keword 를 계속 입력할 때마다 요청이 가기 때문에 디바운스 처리 (맨끝 keyword 만 가져오게처리)
  const debouncedSearchText = useDebounce(keyword, 600);

  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get<RegionResponse>(
          `https://dapi.kakao.com/v2/local/search/keyword.json?query=${debouncedSearchText}&y=${location.latitude}&x=${location.longitude}&page=${pageParam}`,
          {
            headers: {
              Authorization: `KakaoAK ${Config.KAKAO_REST_API_KEY}`,
            },
          },
        );
        setRegionInfo(data.documents);
      } catch (error) {
        setRegionInfo([]);
      }
    })();

    debouncedSearchText === '' && setPageParam(1);
  }, [debouncedSearchText, location]);

  return {regionInfo};
}

export default useSearchLocation;
