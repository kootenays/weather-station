import { useAuth0 } from '@auth0/auth0-react';

export function AuthStatus() {
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

export const HomePage: React.FC = () => {
  return (
    <div>
      This is the home page.
      <AuthStatus />
    </div>
  );
};
