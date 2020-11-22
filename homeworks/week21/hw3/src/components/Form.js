import styled from 'styled-components';

const Form = styled.form`
  position: relative;
  border: 0.5px solid #eef;
  margin: 120px auto;
  padding: 54px 40px;
  box-sizing: border-box;
  max-width: 645px;
  height: 1095px;
  background-color: #fff;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  &::before {
    position: absolute;
    border-top: 8px solid #fad312;
    content: '';
    width: 645px;
    top: -8px;
    right: 1px;
    z-index: 2;
  }
`;

const FormHead = styled.div`
  margin-bottom: 30px;
`;

const FormNotice = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: #e74149;
`;

const FormTitle = styled.h1``;

const FormDescription = styled.p``;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  align-items: start;
  font-size: 20px;
`;

const NecessaryInputGroup = styled(InputGroup)`
  & label:first-of-type:after {
    content: ' *';
    color: #e74149;
  }
`;

const RadioInputGroup = styled(NecessaryInputGroup)`
  & label ~ label {
    margin-bottom: 0px;
    line-height: 2em;
    font-size: 14px;
  }
  & label input {
    margin-right: 10px;
    width: 12px;
  }
`;

const InputTitle = styled.label`
  margin-bottom: 15px;
`;

const InputSubtitle = styled.h3``;
const InputContent = styled.input``;
const OptionGroup = styled.label``;
const Option = styled.input``;
const SubmitButton = styled.button``;

const RemindMessage = styled.div`
  color: red;
  font-size: 14px;
  position: absolute;
  bottom: -20px;
`;

export default function form({
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
}) {
  return (
    <Form>
      <FormHead>
        <FormTitle>新拖延運動報名表單</FormTitle>
        <FormDescription>
          活動日期：2020/12/10 ~ 2020/12/11
          <br />
          活動地點：台北市大安區新生南路二段1號
        </FormDescription>
        <FormNotice>* 必填</FormNotice>
      </FormHead>

      <NecessaryInputGroup>
        <InputTitle>暱稱</InputTitle>
        <InputContent
          name="name"
          type="text"
          placeholder="您的回答"
          onChange={handleInputChange(setName)}
        />
        {hasName === false && <RemindMessage>請輸入暱稱</RemindMessage>}
      </NecessaryInputGroup>

      <NecessaryInputGroup>
        <InputTitle>電子郵件</InputTitle>
        <InputContent
          name="email"
          type="text"
          placeholder="您的電子郵件"
          onChange={handleInputChange(setEmail)}
        />
        {emailIsCorrect === false && <RemindMessage>請輸入正確的電子郵件</RemindMessage>}
      </NecessaryInputGroup>

      <NecessaryInputGroup>
        <InputTitle>手機號碼</InputTitle>
        <InputContent
          name="phone"
          type="text"
          placeholder="您的手機號碼"
          onChange={handleInputChange(setPhone)}
        />
        {phoneIsCorrect === false && <RemindMessage>請輸入正確的手機號碼</RemindMessage>}
      </NecessaryInputGroup>

      <RadioInputGroup>
        <InputTitle>報名類型</InputTitle>
        <OptionGroup>
          <Option
            name="type"
            type="radio"
            value="1"
            onChange={handleInputChange(setType)}
          />
          躺在床上用想像力實作
        </OptionGroup>
        <OptionGroup>
          <Option
            name="type"
            type="radio"
            value="2"
            onChange={handleInputChange(setType)}
          />
          趴在地上滑手機找現成的
        </OptionGroup>
        {hasType === false && <RemindMessage>請輸入您的報名類型</RemindMessage>}
      </RadioInputGroup>

      <NecessaryInputGroup>
        <InputTitle>怎麼知道這個活動的？</InputTitle>
        <InputContent
          name="source"
          type="text"
          placeholder="您的回答"
          onChange={handleInputChange(setSource)}
        />
        {hasSource === false && (
          <RemindMessage>請告訴我們您是怎麼知道這個活動的</RemindMessage>
        )}
      </NecessaryInputGroup>

      <InputGroup>
        <InputTitle>其他 </InputTitle>
        <InputSubtitle>對活動的一些建議</InputSubtitle>
        <InputContent
          name="advice"
          type="text"
          placeholder="您的回答"
          onChange={handleInputChange(setAdvice)}
        />
      </InputGroup>

      <SubmitButton onClick={handleSubmitForm}>提交</SubmitButton>
      <FormNotice>請勿透過表單送出您的密碼。</FormNotice>
    </Form>
  );
}
