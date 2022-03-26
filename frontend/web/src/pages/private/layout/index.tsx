import { useAuth0 } from '@auth0/auth0-react';
import {
  DashboardRounded,
  DeviceHubRounded,
  DoubleArrowRounded,
  MenuOpenRounded,
} from '@mui/icons-material';
import { Divider, List } from '@mui/material';
import { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AppBar } from './app-bar';
import { Container, Drawer, MainContainer } from './drawer';
import { ListItem } from './list-item';
import { ListItemBrand } from './list-item-brand';
import { ListItemNav } from './list-item-nav';

export const PrivateLayout: React.FC = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();
  const location = useLocation();

  const [drawerOpen, setDrawerOpen] = useState(true);

  if (isLoading) {
    return <div>Loading in wrapper...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }
  // Redirect them to the /login page, but save the current location they were
  // trying to go to when they were redirected. This allows us to send them
  // along to that page after they login, which is a nicer user experience
  // than dropping them off on the home page.
  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  const toggleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      <Drawer variant='permanent' open={drawerOpen}>
        <ListItemBrand />
        <List sx={{ flex: 1 }}>
          <ListItemNav
            to='/admin'
            primary='Dashboard'
            icon={<DashboardRounded />}
            hideTooltip={drawerOpen}
          />
          <ListItemNav
            to='/devices'
            primary='Devices'
            icon={<DeviceHubRounded />}
            hideTooltip={drawerOpen}
          />
        </List>
        <Divider />
        <List disablePadding>
          <ListItem
            onClick={toggleDrawerOpen}
            icon={drawerOpen ? <MenuOpenRounded /> : <DoubleArrowRounded />}
            primary={drawerOpen ? 'Collapse menu' : 'Expand menu'}
            hideTooltip={drawerOpen}
          />
        </List>
      </Drawer>
      <MainContainer open={drawerOpen}>
        <AppBar />
        <Container maxWidth='xl'>
          <Outlet />
        </Container>
      </MainContainer>
    </div>
  );
};
