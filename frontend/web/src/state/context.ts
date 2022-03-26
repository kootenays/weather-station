import { createContext, useContext } from 'react';
import { DevicesApi } from './api';

type DevicesApiContext = typeof DevicesApi;

const DEFAULT_DEVICES_CONTEXT: DevicesApiContext = {
  create: async () => null,
  list: async () => [],
  listData: async () => [],
};

type ApiContext = { Devices: DevicesApiContext };

export const DEFAULT_API_CONTEXT: ApiContext = {
  Devices: DEFAULT_DEVICES_CONTEXT,
};

export const Context = createContext<ApiContext>(DEFAULT_API_CONTEXT);

export const useApi = () => {
  const context = useContext<ApiContext>(Context);
  if (!context) {
    console.warn('Only call useApi inside of an ApiProvider');
    return context;
  }
  return context;
};

export const useDevicesApi = () => {
  const context = useApi();
  if (!context) return context;
  return context.Devices;
};
