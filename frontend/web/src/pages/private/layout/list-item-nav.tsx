import {
  ListItemButton as MuiListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useMemo, forwardRef } from 'react';
import {
  NavLinkProps as RouterNavLinkProps,
  NavLink as RouterNavLink,
} from 'react-router-dom';
import { HideableToolTip } from './hideable-tooltip';

export type ListItemNavProps = {
  icon: React.ReactNode;
  primary: NonNullable<React.ReactNode>;
  secondary?: string;
  to: string;
  hideTooltip?: boolean;
};

const ListItemButton = styled(
  (props: Pick<ListItemNavProps, 'to'> & { children?: React.ReactNode }) => {
    const { to, ...rest } = props;
    const renderLink = useMemo(
      () =>
        forwardRef<HTMLAnchorElement, Omit<RouterNavLinkProps, 'to'>>(
          (itemProps, ref) => {
            return (
              <RouterNavLink
                to={to}
                ref={ref}
                end
                {...itemProps}
                role={undefined}
                className={({ isActive }) =>
                  [itemProps.className, isActive ? 'Mui-selected' : null]
                    .filter(Boolean)
                    .join(' ')
                }
              />
            );
          }
        ),
      [to]
    );
    return <MuiListItemButton {...rest} component={renderLink} />;
  }
)(({ theme }) => ({
  whiteSpace: 'nowrap',
}));

export const ListItemNav: React.FC<ListItemNavProps> = ({
  icon,
  primary,
  secondary,
  to,
  hideTooltip,
}) => {
  return (
    <HideableToolTip
      title={primary}
      placement='right'
      hidden={hideTooltip}
      arrow>
      <ListItemButton to={to}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          primary={primary}
          secondary={secondary}
          secondaryTypographyProps={{ whiteSpace: 'nowrap' }}
        />
      </ListItemButton>
    </HideableToolTip>
  );
};

export const ListItemNavExternal: React.FC<ListItemNavProps> = ({
  icon,
  primary,
  secondary,
  to,
  hideTooltip,
}) => {
  return (
    <HideableToolTip
      title={primary}
      placement='right'
      hidden={hideTooltip}
      arrow>
      <MuiListItemButton component='a' href={to} target='_blank'>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          primary={primary}
          secondary={secondary}
          secondaryTypographyProps={{ whiteSpace: 'nowrap' }}
        />
      </MuiListItemButton>
    </HideableToolTip>
  );
};
