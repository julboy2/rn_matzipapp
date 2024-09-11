import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import InputField from '../../components/InputField';

function LoginScreen() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const handleChangeEmail = (text: string) => {
  //   setEmail(text);
  // };

  // const handleChangePassword = (text: string) => {
  //   setPassword(text);
  // };

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const handleChanteText = (name: string, text: string) => {
    setValues({
      ...values,
      [name]: text,
    });
  };

  const handleBlur = (name: string) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          error="이메일을 입력하세요"
          inputMode="email"
          touched={touched.email}
          value={values.email}
          onChangeText={text => handleChanteText('email', text)}
          onBlur={() => handleBlur('email')}
        />
        <InputField
          placeholder="비밀번호"
          error="비밀번호를 입력하세요"
          secureTextEntry
          touched={touched.password}
          value={values.password}
          onChangeText={text => handleChanteText('password', text)}
          onBlur={() => handleBlur('password')}
        />
      </View>
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
  },
});

export default LoginScreen;