import styled from 'styled-components';
import { ReactComponent as Bean } from '../../images/bean.svg';

const Root = styled.div`
  margin: 0 10vw;
  height: calc(100vh - 133px);
`;

const Container = styled.div`
  max-width: 600px;
  height: 400px;
  margin: 50px auto 0;
  padding: 20px;
  background: rgba(210, 210, 210, 0.4);
  text-align: center;
  transition: all linear 0.2s;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  &:hover {
    transition: all linear 0.2s;
    box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.5);
  }
`;

const Title = styled.h1`
  font-size: 36px;
`;

const Content = styled.div`
  display: flex
  justify-content: center;
`;

const BeanWrapper = styled.div`
  transform: translateX(4%);
`

export default function AboutMePage() {
  return (
    <Root>
      <Container>
        <Title>A Simple Blog</Title>
        <Content>
          利用 React 實作 SPA 部落格～
          <br />
          <BeanWrapper><Bean /></BeanWrapper> 
        </Content>
      </Container>
    </Root>
  );
}
