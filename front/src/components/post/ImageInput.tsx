import {colors} from '@/constants';
import useThemeStore from '@/store/UseThemeStore';
import {ThemeMode} from '@/types/common';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Iconicons from 'react-native-vector-icons/Ionicons';

interface ImageInputProps {
  onChange: () => void;
}

function ImageInput({onChange}: ImageInputProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <Pressable
      onPress={onChange}
      style={({pressed}) => [
        pressed && styles.imageInputPressed,
        styles.imageInput,
      ]}>
      <Iconicons
        name="camera-outline"
        size={20}
        color={colors[theme].GRAY_500}
      />
      <Text style={styles.inputText}>사진 추가</Text>
    </Pressable>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    imageInput: {
      borderWidth: 1.5,
      borderStyle: 'dotted',
      borderColor: colors[theme].GRAY_300,
      height: 70,
      width: 70,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
    },
    imageInputPressed: {
      opacity: 0.5,
    },
    inputText: {
      fontSize: 12,
      color: colors[theme].GRAY_500,
    },
  });

export default ImageInput;
