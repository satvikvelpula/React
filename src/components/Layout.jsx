import { Link, Outlet } from 'react-router';
import { useUserContext } from '../hooks/contextHooks';
import { useEffect } from 'react';

const Layout = () => {

  const { user, handleAutoLogin } = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }, []);
  
  return (  
    <div>
      <nav className="navbar">
        <h1 className="logo">MyApp</h1>

        {/*         <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/upload">Upload</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>*/}

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>

          {user ? (
            <>
              <li>{user.username}</li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/logout">Logout</Link></li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>


      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
