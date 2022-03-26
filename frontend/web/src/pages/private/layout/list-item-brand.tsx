import { WbSunnyRounded } from '@mui/icons-material';
import {
  Icon,
  ListItem as MuiListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Theme,
} from '@mui/material';

const getBackgroundColor = (theme: Theme) => {
  if (process.env.REACT_APP_STAGE === 'prod') return theme.palette.primary.main;
  if (process.env.REACT_APP_STAGE === 'dev') return theme.palette.warning.main;
  return theme.palette.error.main;
};

const ListItem = styled(MuiListItem)(({ theme }) => ({
  whiteSpace: 'nowrap',
  backgroundColor: getBackgroundColor(theme),
}));

export const ListItemBrand: React.FC = () => {
  return (
    <ListItem sx={{ height: 64 }}>
      <ListItemIcon>
        <Icon>
          <WbSunnyRounded sx={{ color: 'white' }} />
        </Icon>
      </ListItemIcon>
      <ListItemText
        primary={<strong>Weather Station</strong>}
        primaryTypographyProps={{ color: 'white' }}
      />
    </ListItem>
  );
};
