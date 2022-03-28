import { RouteProps } from 'react-router-dom';
import {
  CreateDevicePage,
  DeviceDetailPage,
  DeviceListPage,
  GenerateDeviceCertificatesPage,
} from './devices';
import { HomePage } from './home';

export const PrivateRoutes: RouteProps[] = [
  { index: true, element: <HomePage /> },
  { path: 'devices', element: <DeviceListPage /> },
  { path: 'devices/create', element: <CreateDevicePage /> },
  { path: 'devices/certificates', element: <GenerateDeviceCertificatesPage /> },
  { path: 'devices/:deviceId', element: <DeviceDetailPage /> },
];

export { PrivateLayout } from './layout';
