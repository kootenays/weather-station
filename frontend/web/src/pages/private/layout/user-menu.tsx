import { useAuth0 } from '@auth0/auth0-react';
import { LogoutRounded, SettingsRounded } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  MenuItemProps,
  Divider,
  Typography,
  Button,
  SvgIconProps,
  Avatar,
} from '@mui/material';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const MenuItemWithIcon: React.FC<
  {
    Icon: React.ElementType<SvgIconProps>;
    title: React.ReactNode;
  } & MenuItemProps
> = ({ Icon, title, ...props }) => {
  return (
    <MenuItem {...props}>
      <ListItemIcon>
        <Icon fontSize='small' />
      </ListItemIcon>
      <ListItemText>{title}</ListItemText>
    </MenuItem>
  );
};

export const UserMenu: React.FC = () => {
  const { user, logout } = useAuth0();
  // const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  const goToSettings = () => {
    handleClose();
    console.log('navigate to user settings...');
    // navigate('/settings');
  };
  if (!user) return null;

  return (
    <div>
      <IconButton
        size='small'
        id='user-menu-button'
        aria-controls='user-menu'
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        <Avatar src={user.picture} />
      </IconButton>
      <Menu
        id='user-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'user-menu-button',
          disablePadding: true,
        }}>
        <Box sx={{ paddingX: 2.5, paddingY: 1.5 }}>
          <Typography variant='subtitle2' noWrap>
            {user.given_name} {user.family_name}
          </Typography>
          <Typography variant='body2' noWrap>
            {user.email}
          </Typography>
        </Box>
        <Divider sx={{ marginBottom: 1 }} />
        <MenuItemWithIcon
          Icon={SettingsRounded}
          title='Settings'
          onClick={goToSettings}
        />
        <Box
          sx={{
            paddingTop: 1.5,
            padding: 2,
            color: 'text.secondary',
          }}>
          <Button
            startIcon={<LogoutRounded />}
            variant='outlined'
            sx={{ width: '100%' }}
            color='inherit'
            onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Menu>
    </div>
  );
};
