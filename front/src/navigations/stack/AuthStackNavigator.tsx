import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import {authNavigations} from '@/constants/navigations';
import SignupScreen from '@/screens/auth/SignupScreen';
import KakaoLoginScreen from '@/screens/auth/KakaoLoginScreen';
import useThemeStore from '@/store/UseThemeStore';
import {colors} from '@/constants';

export type AuthStackParamList = {
  [authNavigations.AUTH_HOME]: undefined;
  [authNavigations.LOGIN]: undefined;
  [authNavigations.SIGNUP]: undefined;
  [authNavigations.KAKAO]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  const {theme} = useThemeStore();

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: colors[theme].WHITE},
        headerStyle: {
          backgroundColor: colors[theme].GRAY_200,
          shadowColor: colors[theme].WHITE,
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: colors[theme].BLACK,
      }}>
      <Stack.Screen
        name={authNavigations.AUTH_HOME}
        component={AuthHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={authNavigations.LOGIN}
        component={LoginScreen}
        options={{title: '로그인'}}
      />
      <Stack.Screen
        name={authNavigations.SIGNUP}
        component={SignupScreen}
        options={{title: '회원가입'}}
      />
      <Stack.Screen
        name={authNavigations.KAKAO}
        component={KakaoLoginScreen}
        options={{title: '카카오 로그인'}}
      />
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;
