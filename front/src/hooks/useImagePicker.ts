import {ImageUri} from '@/types/domain';
import {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import useMutateImages from './queries/useMutateImages';
import {getFormDataImages} from '@/utils';
import {Alert} from 'react-native';
import Toast from 'react-native-toast-message';

interface ImagePickerProps {
  initialImages: ImageUri[];
  mode?: 'single' | 'multiple';
  onSettled?: () => void;
}

function useImagePicker({
  initialImages = [],
  mode = 'multiple',
  onSettled,
}: ImagePickerProps) {
  const [imageUris, setImageUris] = useState(initialImages);
  const uploadImages = useMutateImages();

  const addImageUris = (uris: string[]) => {
    if (imageUris.length + uris.length > 5) {
      Alert.alert('이미지 개수 초과', '추가 가능한 이미지는 최대 5개 입니다.');
      return;
    }
    setImageUris(prev => [...prev, ...uris.map(uri => ({uri}))]);
  };

  const replaceImageUri = (uris: string[]) => {
    if (uris.length > 1) {
      Alert.alert('이미지 개수 초과', '추가 가능한 이미지는 최대 1개 입니다.');
      return;
    }

    setImageUris([...uris.map(uri => ({uri}))]);
  };

  const deleteImageUri = (uri: string) => {
    const newImageUris = imageUris.filter(image => image.uri !== uri);
    setImageUris(newImageUris);
  };

  const changeImageUrisOrder = (fromIndex: number, toIndex: number) => {
    const copyImageUris = [...imageUris];
    const [removedImage] = copyImageUris.splice(fromIndex, 1);
    copyImageUris.splice(toIndex, 0, removedImage);
    setImageUris(copyImageUris);
  };

  const handleChange = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: mode === 'multiple' ? 5 : 1,
      cropperChooseText: '완료',
      cropperCancelText: '취소',
    })
      .then(images => {
        const formData = getFormDataImages(images);

        uploadImages.mutate(formData, {
          onSuccess: data =>
            mode === 'multiple' ? addImageUris(data) : replaceImageUri(data),
          onSettled: () => onSettled && onSettled(),
        });
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          Toast.show({
            type: 'error',
            text1: '갤러리 열 수 없어요',
            text2: '권한을 허용했는지 확인해주세요',
            position: 'bottom',
          });
        }
      });
  };

  return {
    imageUris,
    handleChange,
    delete: deleteImageUri,
    changeOrder: changeImageUrisOrder,
  };
}

export default useImagePicker;
