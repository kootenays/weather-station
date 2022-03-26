import { RouteProps } from 'react-router-dom';
import { DeviceListPage } from './devices';
import { HomePage } from './home';

export const PrivateRoutes: RouteProps[] = [
  { index: true, element: <HomePage /> },
  { path: 'devices', element: <DeviceListPage /> },
];

export { PrivateLayout } from './layout';
