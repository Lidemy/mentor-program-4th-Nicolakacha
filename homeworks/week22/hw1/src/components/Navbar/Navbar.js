import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../utils';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  height: 64px;
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
`;

const NavbarList = styled.div`
  display: flex;
`;

const Brand = styled(Link)`
  font-size: 32px;
  color: #017a75;
`;

const Nav = styled(NavLink)`
  display: flex;
  align-items: center;
  margin: 0 30px;
  height: 64px;
`;

const Logout = styled.a`
  display: flex;
  align-items: center;
  margin: 0 30px;
  height: 64px;
`;

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    setAuthToken('');
    setUser(null);
    alert('登出成功');
    navigate('/react-blog');
  };
  return (
    <NavbarContainer>
      <Brand to="/react-blog" children="React Blog" />
      <NavbarList>
        <Nav to="/react-blog/about-me" children="關於我" />
        <Nav to="/react-blog/posts" children="文章列表" />
        {localStorage.token ? (
          <>
            {user && <Nav to="/react-blog/new-post" children="發佈文章" />}
            {user && <Logout onClick={handleLogout} children="登出" />}
          </>
        ) : (
          <>
            {!user && <Nav to="/react-blog/login" children="登入" />}
            {!user && <Nav to="/react-blog/register" children="註冊" />}
          </>
        )}
      </NavbarList>
    </NavbarContainer>
  );
}
