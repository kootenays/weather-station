import { useAuth0 } from '@auth0/auth0-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

function AuthStatus() {
  let { isAuthenticated, user, logout } = useAuth0();

  if (!isAuthenticated) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {user?.name}!{' '}
      <button
        onClick={() => {
          logout({ returnTo: window.location.origin });
        }}>
        Sign out
      </button>
    </p>
  );
}

export function Layout() {
  return (
    <div>
      <AuthStatus />
      <ul>
        <li>
          <Link to='/'>Public Page</Link>
        </li>
        <li>
          <Link to='/admin'>Protected Page</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}
