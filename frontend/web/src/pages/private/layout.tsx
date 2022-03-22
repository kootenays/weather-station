import { useAuth0 } from '@auth0/auth0-react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';

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

export const PrivateLayout: React.FC = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading in wrapper...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }
  // Redirect them to the /login page, but save the current location they were
  // trying to go to when they were redirected. This allows us to send them
  // along to that page after they login, which is a nicer user experience
  // than dropping them off on the home page.
  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

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
};
