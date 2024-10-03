import {Category} from '@/types/domain';

type UseInfomation = {
  email: string;
  password: string;
};

function validateUser(values: UseInfomation) {
  const errors = {
    email: '',
    password: '',
  };

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
    errors.email = '이메일 형식이 올바르지 않습니다.';
  }
  if (!(values.password.length >= 8 && values.password.length < 20)) {
    errors.password = '비밀번호는 8 ~ 20자 사이로 입력해주세요.';
  }

  return errors;
}

function validateLogin(values: UseInfomation) {
  return validateUser(values);
}

function validateSignup(values: UseInfomation & {passwordConfirm: string}) {
  const errors = validateUser(values);
  const signupErrors = {...errors, passwordConfirm: ''};

  //   const errors = {
  //     email: '',
  //     password: '',
  //     passwordConfirm: '',
  //   };

  //   if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
  //     errors.email = '이메일 형식이 올바르지 않습니다.';
  //   }
  //   if (!(values.password.length >= 8 && values.password.length < 20)) {
  //     errors.password = '비밀번호는 8 ~ 20자 사이로 입력해주세요.';
  //   }

  if (values.password !== values.passwordConfirm) {
    signupErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
  }

  return errors;
}

function validateAddPost(values: {title: string}) {
  const errors = {
    title: '',
    description: '',
  };

  if (values.title.trim() === '') {
    errors.title = '제목은 1~30자 이내로 입력해주세요.';
  }

  return errors;
}

function validateEditProfile(values: {nickname: string}) {
  const errors = {
    nickname: '',
  };

  if (values.nickname.trim() === '') {
    errors.nickname = '닉네임을 입력해주세요.';
  }

  return errors;
}

function validateCategory(values: Category) {
  const errors = {
    RED: '',
    GREEN: '',
    YELLOW: '',
    BLUE: '',
    PURPLE: '',
  };

  return errors;
}

export {
  validateLogin,
  validateSignup,
  validateAddPost,
  validateEditProfile,
  validateCategory,
};
