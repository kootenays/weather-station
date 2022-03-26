import { Auth0Provider } from '@auth0/auth0-react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { Pages } from './pages';
import { ApplicationTheme } from './theme';

function App() {
  return (
    <BrowserRouter>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN || ''}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ''}
        redirectUri={window.location.origin}
        cacheLocation='localstorage'
        useRefreshTokens>
        <ThemeProvider theme={ApplicationTheme}>
          <CssBaseline enableColorScheme />
          <Pages />
        </ThemeProvider>
      </Auth0Provider>
    </BrowserRouter>
  );
}

export default App;
