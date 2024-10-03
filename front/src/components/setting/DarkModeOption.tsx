import useThemeStorage from '@/hooks/useThemeStorage';
import {CompoundOption} from '../common/CompoundOption';
import {useColorScheme} from 'react-native';

interface DarkModeOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}

function DarkModeOption({isVisible, hideOption}: DarkModeOptionProps) {
  const systemDefault = useColorScheme();
  const {themem, isSystem, setMode, setSystem} = useThemeStorage();
  const handlePressLight = () => {
    setMode('light');
    setSystem(false);
    hideOption();
  };

  const handlePressDark = () => {
    setMode('dark');
    setSystem(false);
    hideOption();
  };

  const handlePressSystem = () => {
    setMode(systemDefault ?? 'light');
    setSystem(true);
    hideOption();
  };

  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.Background>
        <CompoundOption.Conntainer>
          <CompoundOption.Button
            onPress={handlePressLight}
            isChecked={isSystem === false && themem === 'light'}>
            라이트 모드
          </CompoundOption.Button>
          <CompoundOption.Divider />
          <CompoundOption.Button
            onPress={handlePressDark}
            isChecked={isSystem === false && themem === 'dark'}>
            다크 모드
          </CompoundOption.Button>
          <CompoundOption.Divider />
          <CompoundOption.Button
            onPress={handlePressSystem}
            isChecked={isSystem === true}>
            시스템 기본값 모드
          </CompoundOption.Button>
        </CompoundOption.Conntainer>
        <CompoundOption.Conntainer>
          <CompoundOption.Button onPress={hideOption}>
            취소
          </CompoundOption.Button>
        </CompoundOption.Conntainer>
      </CompoundOption.Background>
    </CompoundOption>
  );
}

export default DarkModeOption;
