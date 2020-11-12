import './App.css';
import useForm from './hooks/useForm';
import Form from './components/Form';

function App() {
  const {
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
  } = useForm();

  return (
    <Form
      handleInputChange={handleInputChange}
      handleSubmitForm={handleSubmitForm}
      hasName={hasName}
      hasType={hasType}
      hasSource={hasSource}
      emailIsCorrect={emailIsCorrect}
      phoneIsCorrect={phoneIsCorrect}
      setName={setName}
      setEmail={setEmail}
      setPhone={setPhone}
      setType={setType}
      setSource={setSource}
      setAdvice={setAdvice}
    />
  );
}

export default App;
