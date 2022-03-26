import {
  CSSObject,
  Container as MuiContainer,
  Drawer as MuiDrawer,
  styled,
  Theme,
} from '@mui/material';

const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
});

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export const MainContainer = styled('main')<{ open: boolean }>(
  ({ theme, open }) => ({
    position: 'fixed',
    top: 0,
    left: drawerWidth,
    right: 0,
    bottom: 0,
    transition: theme.transitions.create('left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    ...(open && { left: drawerWidth }),
    ...(!open && { left: `calc(${theme.spacing(7)} + 1px)` }),
  })
);

export const Container = styled(MuiContainer)({
  position: 'relative',
  // Set the height to be 100% minus the toolbar
  height: `calc(100% - 64px)`,
  display: 'flex',
  flexDirection: 'column',
  '& > div': {
    flex: 1,
  },
});
