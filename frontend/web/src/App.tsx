import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PublicRoutes, PrivateRouteWrapper, PrivateRoutes } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN || ''}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ''}
        redirectUri={window.location.origin}
        cacheLocation='localstorage'
        useRefreshTokens>
        <Routes>
          {PublicRoutes.map((props, index) => (
            <Route key={props.path || index} {...props} />
          ))}
          <Route path='admin' element={<PrivateRouteWrapper />}>
            {PrivateRoutes.map((props, index) => (
              <Route key={props.path || index} {...props} />
            ))}
          </Route>
          <Route path='*' element={<div>Unknown page...</div>} />
        </Routes>
      </Auth0Provider>
    </BrowserRouter>
  );
}

export default App;
