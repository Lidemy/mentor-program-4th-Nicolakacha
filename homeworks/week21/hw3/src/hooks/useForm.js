import { useState } from 'react';

export default function useForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('');
  const [source, setSource] = useState('');
  const [advice, setAdvice] = useState('');

  const [hasName, setHasName] = useState();
  const [hasType, setHasType] = useState();
  const [hasSource, setHasSource] = useState();
  const [emailIsCorrect, setEmailIsCorrect] = useState();
  const [phoneIsCorrect, setPhoneIsCorrect] = useState();

  const checkEmail = (email) => {
    const regexForEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!regexForEmail.test(email)) {
      hasError = true;
      return setEmailIsCorrect(false);
    }
    setEmailIsCorrect(true);
  };

  const checkPhone = (phone) => {
    const regexForPhone = /^09\d{2}-?\d{3}-?\d{3}$/;
    if (!regexForPhone.test(phone)) {
      hasError = true;
      return setPhoneIsCorrect(false);
    }
    setPhoneIsCorrect(true);
  };

  const handleInputChange = (setValue) => (e) => {
    setValue(e.target.value);
  };

  const formDataObject = {
    name,
    email,
    phone,
    type,
    source,
    advice,
  };

  let hasError = false;

  const checkDataValidity = () => {
    if (name === '') {
      hasError = true;
      setHasName(false);
    } else {
      setHasName(true);
    }

    if (type === '') {
      hasError = true;
      setHasType(false);
    } else {
      setHasType(true);
    }

    if (source === '') {
      hasError = true;
      setHasSource(false);
    } else {
      setHasSource(true);
    }

    checkEmail(email);
    checkPhone(phone);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    checkDataValidity();
    if (!hasError) {
      alert(JSON.stringify(formDataObject));
    }
  };

  return {
    handleInputChange,
    handleSubmitForm,
    hasName,
    hasType,
    hasSource,
    emailIsCorrect,
    phoneIsCorrect,
    setName,
    setEmail,
    setPhone,
    setType,
    setSource,
    setAdvice,
  };
}
