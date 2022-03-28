import { Auth0Client, Auth0ClientOptions } from '@auth0/auth0-spa-js';
import axios, { AxiosError } from 'axios';

// AWS Configurations
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
// Timeout disabled
const API_TIMEOUT = 0;

// Default headers
const defaultHeaders = {
  'Content-Type': 'application/json',
};

export const DEFAULT_AUTH0_OPTIONS: Auth0ClientOptions = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
  client_id: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
  redirect_uri: window.location.origin,
  cacheLocation: 'localstorage',
  useRefreshTokens: true,
};

const client = new Auth0Client(DEFAULT_AUTH0_OPTIONS);

/**
 * Use to request data from the private API
 */
export const PrivateApiClient = axios.create({
  baseURL: API_ENDPOINT,
  timeout: API_TIMEOUT,
  headers: defaultHeaders,
});

// Make sure to get the token each time before making the request
PrivateApiClient.interceptors.request.use(async (config) => {
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

PrivateApiClient.interceptors.response.use(
  undefined,
  async (error: AxiosError) => {
    if (error.isAxiosError) {
      // If the response provided a better error message, use that instead of
      // the default
      if (error.response?.data.message) {
        return Promise.reject(new Error(error.response.data.message));
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Use to request data from the public API
 */
export const PublicApiClient = axios.create({
  baseURL: API_ENDPOINT,
  headers: defaultHeaders,
  timeout: API_TIMEOUT,
});
