import {CompoundOption} from '../common/CompoundOption';

interface FeedDetailOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}

function FeedDetailOption({isVisible, hideOption}: FeedDetailOptionProps) {
  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.Background>
        <CompoundOption.Conntainer>
          <CompoundOption.Button isDanger>삭제하기</CompoundOption.Button>
          <CompoundOption.Divider />
          <CompoundOption.Button>수정하기</CompoundOption.Button>
        </CompoundOption.Conntainer>
        <CompoundOption.Conntainer>
          <CompoundOption.Button onPress={hideOption}>
            취소하기
          </CompoundOption.Button>
        </CompoundOption.Conntainer>
      </CompoundOption.Background>
    </CompoundOption>
  );
}

export default FeedDetailOption;
