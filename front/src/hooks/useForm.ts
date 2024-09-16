import {useEffect, useState} from 'react';

interface UseFormProps<T> {
  initailValue: T;
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({initailValue, validate}: UseFormProps<T>) {
  const [values, setValues] = useState(initailValue);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChanteText = (name: keyof T, text: string) => {
    setValues({
      ...values,
      [name]: text,
    });
  };

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const getTextInputProps = (name: keyof T) => {
    const value = values[name];
    const onChangeText = (Text: string) => handleChanteText(name, Text);
    const onBlur = () => handleBlur(name);

    return {value, onChangeText, onBlur};
  };

  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [validate, values]);

  return {values, errors, touched, getTextInputProps};
}

export default useForm;
