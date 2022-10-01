import { Outlet, Link } from "react-router-dom";

const Layout = ({ setUser }) => {

  let handleSignOut = (e) => {
    setUser({});
    // document.getElementById('signInDiv').hidden = false;
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Reading RainForest</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/messages">Messages</Link>
          </li>
          <li>
            <Link to="/trades">Trades</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
        <button className='signOutBtn' onClick={handleSignOut} > Sign Out </button>
      </nav>
      <Outlet />
    </>
  )
};

export default Layout;