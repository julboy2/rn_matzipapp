import {Pressable, StyleSheet, Text, View} from 'react-native';
import MapView, {
  Callout,
  LatLng,
  LongPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {colors, mapNavigations, numbers} from '@/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {useState} from 'react';
import useUserLocation from '@/hooks/useUserLocation';
import usePermission from '@/hooks/usePermission';
import useGetMarkers from '@/hooks/queries/useGetMarkers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import mapStyle from '@/style/mapStyle';
import CustomMarker from '@/components/common/CustomMarker';
import {Alert} from 'react-native';
import {alerts} from '@/constants/messages';
import MarkerModal from '@/components/map/MarkerModal';
import useModal from '@/hooks/useModal';
import useMoveMapView from '@/hooks/useMoveMapView';
import Toast from 'react-native-toast-message';
import useLocationStore from '@/store/useLocationStore';
import useThemeStore from '@/store/UseThemeStore';
import {ThemeMode} from '@/types/common';
import useLegendStorage from '@/hooks/useLegendStorage';
import MapLegend from '@/components/map/MapLegend';
import MarkerFilterOption from '@/components/map/MarkerFilterOption';
import useMarkerFilterStorage from '@/hooks/useMarkerFilterStorage';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function MapHomeScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();

  // 1. 나의 위치를 구함
  // 2. 지도를 그곳으로 이동
  const {userLocation, isUserLocationError} = useUserLocation();
  const {selectLocation, setSelectLocation} = useLocationStore();
  const [markerId, setMarkerId] = useState<number | null>(null);
  const markerModal = useModal();
  const filterOption = useModal();
  const markerFilter = useMarkerFilterStorage();

  const {data: markers = []} = useGetMarkers({
    select: markerFilter.transformFilteredMarker,
  });
  const {mapRef, moveMapView, handleChangeDelta} = useMoveMapView();
  const legend = useLegendStorage();

  usePermission('LOCATION');

  // 마커를 클릭했을때 위치이동
  const handlePressMarker = (id: number, coordinate: LatLng) => {
    moveMapView(coordinate);
    setMarkerId(id);
    markerModal.show();
  };

  const handleLongPressMapView = ({nativeEvent}: LongPressEvent) => {
    setSelectLocation(nativeEvent.coordinate);
    console.log(
      `selectLocation: ${nativeEvent.coordinate.latitude} ,${nativeEvent.coordinate.longitude}`,
    );
  };

  const handlePressAddPost = () => {
    if (!selectLocation) {
      return Alert.alert(
        alerts.NOT_SELECTED_LOCATION.TITLE,
        alerts.NOT_SELECTED_LOCATION.DESCRIPTION,
      );
    }

    navigation.navigate(mapNavigations.ADD_POST, {
      location: selectLocation,
    });

    setSelectLocation(null);
  };

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      Toast.show({
        type: 'error',
        text1: '위치 권한을 허용해주세요.',
        position: 'bottom',
      });
      return;
    }

    moveMapView(userLocation);
  };

  const handlePressSearch = () => {
    navigation.navigate(mapNavigations.SEARCH_LOCATION);
  };

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}
        customMapStyle={mapStyle}
        onLongPress={handleLongPressMapView}
        onRegionChangeComplete={handleChangeDelta} // 마지막 지도 확대시 확대값 저장
        region={{
          ...userLocation,
          ...numbers.INITIAL_DELTA,
        }}>
        {markers.map(({id, color, score, ...coordinate}) => (
          <CustomMarker
            key={id}
            color={color}
            score={score}
            coordinate={coordinate}
            onPress={() => handlePressMarker(id, coordinate)}
          />
        ))}

        {selectLocation && (
          <Callout>
            <Marker coordinate={selectLocation} />
          </Callout>
        )}
      </MapView>
      <Pressable
        style={[styles.drawerButton, {top: inset.top || 20}]}
        onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" color={colors[theme].WHITE} size={25} />
      </Pressable>
      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={handlePressAddPost}>
          <MaterialIcons name="add" color={colors[theme].WHITE} size={25} />
        </Pressable>
        <Pressable style={styles.mapButton} onPress={handlePressSearch}>
          <Ionicons name="search" color={colors[theme].WHITE} size={25} />
        </Pressable>
        <Pressable style={styles.mapButton} onPress={filterOption.show}>
          <Ionicons
            name="options-outline"
            color={colors[theme].WHITE}
            size={25}
          />
        </Pressable>
        <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
          <MaterialIcons
            name="my-location"
            color={colors[theme].WHITE}
            size={25}
          />
        </Pressable>
      </View>

      <MarkerModal
        markerId={markerId}
        isVisible={markerModal.isVisible}
        hide={markerModal.hide}
      />
      <MarkerFilterOption
        isVisible={filterOption.isVisible}
        hideOption={filterOption.hide}
      />
      {legend.isVisible && <MapLegend />}
    </>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerButton: {
      position: 'absolute',
      left: 0,
      paddingVertical: 10,
      paddingHorizontal: 12,
      backgroundColor: colors[theme].PINK_700,
      borderTopRightRadius: 50,
      borderBottomRightRadius: 50,
      shadowColor: colors[theme].UNCHANGE_BLACK,
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.5,
      elevation: 4,
    },
    buttonList: {
      position: 'absolute',
      bottom: 30,
      right: 15,
    },
    mapButton: {
      backgroundColor: colors[theme].PINK_700,
      marginVertical: 5,
      height: 48,
      width: 48,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      shadowColor: colors[theme].UNCHANGE_BLACK,
      shadowOffset: {width: 1, height: 2},
      shadowOpacity: 0.5,
      elevation: 2,
    },
  });

export default MapHomeScreen;
