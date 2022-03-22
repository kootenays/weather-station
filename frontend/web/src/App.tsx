import { Sample } from '@klic-weather-station/backend/core/sample';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, Layout, LoginPage, PublicPage, RequireAuth } from './pages';

function App() {
  console.log(Sample.foo());
  return (
    <BrowserRouter>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN || ''}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ''}
        redirectUri={window.location.origin}>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<PublicPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route
              path='/protected'
              element={
                <RequireAuth>
                  <HomePage />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </Auth0Provider>
    </BrowserRouter>
  );
}

export default App;
