import { RouteProps } from 'react-router-dom';
import { HomePage } from './home';

export const PrivateRoutes: RouteProps[] = [
  { index: true, element: <HomePage /> },
];

export { PrivateLayout } from './layout';
