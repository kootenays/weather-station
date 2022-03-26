import { RouteProps } from 'react-router-dom';
import { DeviceDetailPage, DeviceListPage } from './devices';
import { HomePage } from './home';

export const PrivateRoutes: RouteProps[] = [
  { index: true, element: <HomePage /> },
  { path: 'devices', element: <DeviceListPage /> },
  { path: 'devices/:deviceId', element: <DeviceDetailPage /> },
];

export { PrivateLayout } from './layout';
