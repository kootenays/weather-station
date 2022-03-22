import { RouteProps } from 'react-router-dom';
import { HomePage } from './home';
import { LoginPage } from './login';

export const PublicRoutes: RouteProps[] = [
  { path: '/', element: <HomePage /> },
  { path: 'login', element: <LoginPage /> },
];
