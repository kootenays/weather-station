import { useAuth0 } from '@auth0/auth0-react';
import { useLocation, useNavigate } from 'react-router-dom';

export function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  let from = (location.state as any)?.from?.pathname || '/';

  return (
    (!isAuthenticated && (
      <div>
        <p>You must log in to view the page at {from}</p>

        <button
          onClick={() =>
            loginWithRedirect({
              redirectUri: `${window.location.origin}${from}`,
            })
          }>
          Log in
        </button>
      </div>
    )) ||
    null
  );
}
