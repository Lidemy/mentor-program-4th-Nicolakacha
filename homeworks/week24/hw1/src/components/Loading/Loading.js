import styled from 'styled-components';
import { ReactComponent as Bean } from '../../images/bean.svg';

const LoadingWrapper = styled.div`
  padding-top: 150px;
  margin: 0 auto;
  text-align: center;
`;

export default function Loading() {
  return (
    <LoadingWrapper>
      <Bean />
    </LoadingWrapper>
  );
}
