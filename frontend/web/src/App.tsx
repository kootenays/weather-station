import { Auth0Provider } from '@auth0/auth0-react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { Pages } from './pages';
import { ApiProvider } from './state';
import { DEFAULT_AUTH0_OPTIONS } from './state/api';
import { ApplicationTheme } from './theme';

function App() {
  return (
    <ApiProvider>
      <BrowserRouter>
        <Auth0Provider
          domain={DEFAULT_AUTH0_OPTIONS.domain}
          clientId={DEFAULT_AUTH0_OPTIONS.client_id}
          redirectUri={DEFAULT_AUTH0_OPTIONS.redirect_uri}
          cacheLocation={DEFAULT_AUTH0_OPTIONS.cacheLocation}
          useRefreshTokens={DEFAULT_AUTH0_OPTIONS.useRefreshTokens}>
          <ThemeProvider theme={ApplicationTheme}>
            <CssBaseline enableColorScheme />
            <Pages />
          </ThemeProvider>
        </Auth0Provider>
      </BrowserRouter>
    </ApiProvider>
  );
}

export default App;
