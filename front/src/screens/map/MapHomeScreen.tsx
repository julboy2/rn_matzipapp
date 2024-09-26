import {Pressable, StyleSheet, Text, View} from 'react-native';
import useAuth from '@/hooks/queries/useAuth';
import MapView, {
  Callout,
  LatLng,
  LongPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {colors, mapNavigations} from '@/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {useRef, useState} from 'react';
import useUserLocation from '@/hooks/useUserLocation';
import usePermission from '@/hooks/usePermission';
import useGetMarkers from '@/hooks/queries/useGetMarkers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import mapStyle from '@/style/mapStyle';
import CustomMarker from '@/components/CustomMarker';
import {Alert} from 'react-native';
import {alerts} from '@/constants/messages';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function MapHomeScreen() {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();

  const mapRef = useRef<MapView | null>(null);
  // 1. 나의 위치를 구함
  // 2. 지도를 그곳으로 이동
  const {userLocation, isUserLocationError} = useUserLocation();

  const [selectLocation, setSelectLocation] = useState<LatLng | null>();
  const {data: markers = []} = useGetMarkers();

  usePermission('LOCATION');

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
      return;
    }

    mapRef.current?.animateToRegion({
      latitude: userLocation?.latitude,
      longitude: userLocation?.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
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
        region={{
          ...userLocation,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {markers.map(({id, color, score, ...coordinate}) => (
          <CustomMarker
            key={id}
            color={color}
            score={score}
            coordinate={coordinate}
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
        <Ionicons name="menu" color={colors.WHITE} size={25} />
      </Pressable>
      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={handlePressAddPost}>
          <MaterialIcons name="add" color={colors.WHITE} size={25} />
        </Pressable>
        <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
          <MaterialIcons name="my-location" color={colors.WHITE} size={25} />
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerButton: {
    position: 'absolute',
    left: 0,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.PINK_700,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    elevation: 5,
  },
  buttonList: {
    position: 'absolute',
    bottom: 30,
    right: 15,
  },
  mapButton: {
    backgroundColor: colors.PINK_700,
    marginVertical: 5,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.5,
    elevation: 2,
  },
});

export default MapHomeScreen;
