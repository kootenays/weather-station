import { DevicesApi } from './api';
import { Context } from './context';

export const ApiProvider: React.FC = ({ children }) => {
  return (
    <Context.Provider value={{ Devices: DevicesApi }}>
      {children}
    </Context.Provider>
  );
};
