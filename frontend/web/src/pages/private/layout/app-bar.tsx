import { useAuth0 } from '@auth0/auth0-react';
import { AppBar as MuiAppBar, Box, Toolbar } from '@mui/material';
import { UserMenu } from './user-menu';

export const AppBar: React.FC = () => {
  return (
    <MuiAppBar color='transparent' position='static' elevation={0}>
      <Toolbar>
        <Box flex={1}></Box>
        <UserMenu />
      </Toolbar>
    </MuiAppBar>
  );
};
