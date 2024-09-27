import {colors} from '@/constants';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Iconicons from 'react-native-vector-icons/Ionicons';

interface ImageInputProps {
  onChange: () => void;
}

function ImageInput({onChange}: ImageInputProps) {
  return (
    <Pressable
      onPress={onChange}
      style={({pressed}) => [
        pressed && styles.imageInputPressed,
        styles.imageInput,
      ]}>
      <Iconicons name="camera-outline" size={20} color={colors.GRAY_500} />
      <Text style={styles.inputText}>사진 추가</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageInput: {
    borderWidth: 1.5,
    borderStyle: 'dotted',
    borderColor: colors.GRAY_300,
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
    color: colors.GRAY_500,
  },
});

export default ImageInput;
