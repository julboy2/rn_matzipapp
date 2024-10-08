import {LatLng} from 'react-native-maps';
import {create} from 'zustand';

interface LocationStore {
  moveLocation: LatLng | null;
  selectLocation: LatLng | null;
  setMoveLocation: (location: LatLng) => void;
  setSelectLocation: (location: LatLng) => void;
}

const useLocationStore = create<LocationStore>(set => ({
  moveLocation: null,
  selectLocation: null,
  setMoveLocation: (moveLocation: LatLng) => {
    set(state => ({...state, moveLocation}));
  },
  setSelectLocation: (selectLocation: LatLng) => {
    set(state => ({...state, selectLocation}));
  },
}));

export default useLocationStore;
