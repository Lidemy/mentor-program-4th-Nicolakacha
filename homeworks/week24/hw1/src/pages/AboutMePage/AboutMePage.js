import styled from 'styled-components';
import { ReactComponent as Bean } from '../../images/bean.svg';

const Root = styled.div`
  margin: 0 10vw;
  height: calc(100vh - 143px);
`;

const PageWrapper = styled.div`
  width: 600px;
  height: 400px;
  margin: 20px auto 0;
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

export default function AboutMePage() {
  return (
    <Root>
      <PageWrapper>
        <Title>A Simple Blog</Title>
        <Content>
          這是 React SPA 部落格練習～
          <br />
          使用 React Hooks, Styled Components, React Router 6
          <Bean />
        </Content>
      </PageWrapper>
    </Root>
  );
}
