import { Route, Routes } from 'react-router-dom';
import { PrivateLayout, PrivateRoutes } from './private';
import { PublicRoutes } from './public';

export const Pages: React.FC = () => {
  return (
    <Routes>
      {PublicRoutes.map((props, index) => (
        <Route key={props.path || index} {...props} />
      ))}
      <Route path='admin' element={<PrivateLayout />}>
        {PrivateRoutes.map((props, index) => (
          <Route key={props.path || index} {...props} />
        ))}
      </Route>
      <Route path='*' element={<div>Unknown page...</div>} />
    </Routes>
  );
};
