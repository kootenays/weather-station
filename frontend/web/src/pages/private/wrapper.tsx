import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthStatus } from '../public/home';
import { Layout } from './layout';

export const PrivateRouteWrapper: React.FC = () => {
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
    console.log('here');
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return <Layout />;
};
