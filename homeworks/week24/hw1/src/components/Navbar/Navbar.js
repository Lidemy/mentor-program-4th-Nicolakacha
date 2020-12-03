import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MEDIA_QUERY_MD } from '../../constants/breakpoint';
import styled from 'styled-components';
import {
  logout,
  selectUserId,
  selectIsUserLoading,
} from '../../redux/userSlice';

const NavbarContainer = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.5);
  padding: 0px 5vw;
  background: white;
  flex-direction: column;
  ${MEDIA_QUERY_MD} {
    height: 64px;
    flex-direction: row;
  }
`;

const NavbarList = styled.div`
  display: flex;
`;

const Brand = styled(Link)`
  font-size: 32px;
  color: #017a75;
  margin-top: 10px;
  -webkit-tap-highlight-color: transparent;
  ${MEDIA_QUERY_MD} {
    margin-top: 0px;
  }
`;

const Nav = styled(NavLink)`
  display: flex;
  margin: 0 6px;
  align-items: center;
  height: 64px;
  -webkit-tap-highlight-color: transparent;
  ${MEDIA_QUERY_MD} {
    margin: 0 30px;
  }
`;

const Logout = styled.a`
  display: flex;
  align-items: center;
  margin: 0 6px;
  height: 64px;
  ${MEDIA_QUERY_MD} {
    margin: 0 30px;
  }
`;

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);
  const isUserloading = useSelector(selectIsUserLoading);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/react-blog');
  };

  return (
    <NavbarContainer>
      <Brand to="/react-blog" children="React Blog" />
      <NavbarList>
        <Nav to="/react-blog/about-me" children="關於我" />
        <Nav to="/react-blog/posts" children="文章列表" />
        {isUserloading ? (
          <Nav to="/" children="檢查登入資訊中" />
        ) : (
          <>
            {userId && <Nav to="/react-blog/new-post" children="發表文章" />}
            {userId && <Logout onClick={handleLogout} children="登出" />}
            {!userId && <Nav to="/react-blog/login" children="登入" />}
            {!userId && <Nav to="/react-blog/register" children="註冊" />}
          </>
        )}
      </NavbarList>
    </NavbarContainer>
  );
}
