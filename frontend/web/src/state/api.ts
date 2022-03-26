import { Auth0Client } from '@auth0/auth0-spa-js';
import axios from 'axios';

// AWS Configurations
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
// Timeout disabled
const API_TIMEOUT = 0;

// Default headers
const defaultHeaders = {
  'Content-Type': 'application/json',
};

const client = new Auth0Client({
  domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
  client_id: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
  redirect_uri: window.location.origin,
  cacheLocation: 'localstorage',
  useRefreshTokens: true,
});

/**
 * Use to request data from the private API
 */
export const PrivateApi = axios.create({
  baseURL: API_ENDPOINT,
  timeout: API_TIMEOUT,
  headers: defaultHeaders,
});

// Make sure to get the token each time.
PrivateApi.interceptors.request.use(async (config) => {
  try {
    const tokens = await client.getIdTokenClaims();
    config.headers = {
      ...(config.headers || {}),
      Authorization: `Bearer ${tokens?.__raw}`,
    };
  } catch (error) {
    console.error(error);
  }
  return config;
});

/**
 * Use to request data from the public API
 */
export const PublicApi = axios.create({
  baseURL: API_ENDPOINT,
  headers: defaultHeaders,
  timeout: API_TIMEOUT,
});
