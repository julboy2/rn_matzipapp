import React, {useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import InputField from '@/components/common/InputField';
import CustomButton from '@/components/common/CustomButton';
import useForm from '@/hooks/useForm';
import {validateLogin} from '@/utils';
import useAuth from '@/hooks/queries/useAuth';
import Toast from 'react-native-toast-message';
import {errorMessages} from '@/constants/messages';

function LoginScreen() {
  // 방법 1.
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const handleChangeEmail = (text: string) => {
  //   setEmail(text);
  // };

  // const handleChangePassword = (text: string) => {
  //   setPassword(text);
  // };

  // 방법 2.
  // const [values, setValues] = useState({
  //   email: '',
  //   password: '',
  // });

  // const [touched, setTouched] = useState({
  //   email: false,
  //   password: false,
  // });

  // const handleChanteText = (name: string, text: string) => {
  //   setValues({
  //     ...values,
  //     [name]: text,
  //   });
  // };

  // const handleBlur = (name: string) => {
  //   setTouched({
  //     ...touched,
  //     [name]: true,
  //   });
  // };

  const passwordRef = useRef<TextInput | null>(null);
  const {loginMutation} = useAuth();

  const login = useForm({
    initailValue: {email: '', password: ''},
    validate: validateLogin,
  });

  const handleSubmit = () => {
    loginMutation.mutate(login.values, {
      onError: error =>
        Toast.show({
          type: 'error',
          text1: error.response?.data.message || errorMessages.UNEXPECT_ERROR,
          position: 'bottom',
          visibilityTime: 2000,
        }),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          error={login.errors.email}
          inputMode="email"
          touched={login.touched.email}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          // value={values.email}
          // onChangeText={text => handleChanteText('email', text)}
          // onBlur={() => handleBlur('email')}
          {...login.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          error={login.errors.password}
          secureTextEntry
          touched={login.touched.password}
          returnKeyType="join"
          blurOnSubmit={false}
          onSubmitEditing={handleSubmit}
          // value={values.password}
          // onChangeText={text => handleChanteText('password', text)}
          // onBlur={() => handleBlur('password')}
          {...login.getTextInputProps('password')}
        />
      </View>
      <CustomButton
        label="로그인"
        variant="filled"
        size="large"
        onPress={handleSubmit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default LoginScreen;
