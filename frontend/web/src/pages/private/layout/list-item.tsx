import {
    ListItemButton as MuiListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { HideableToolTip } from './hideable-tooltip';

export type ListItemProps = {
    icon: React.ReactElement;
    primary: string;
    hideTooltip?: boolean;
    onClick?: () => void;
};

const ListItemButton = styled(MuiListItemButton)({
    whiteSpace: 'nowrap',
});

export const ListItem: React.FC<ListItemProps> = ({
    icon,
    primary,
    hideTooltip,
    onClick,
}) => {
    return (
        <HideableToolTip
            title={primary}
            placement='right'
            hidden={hideTooltip}
            arrow>
            <ListItemButton onClick={onClick}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={primary} />
            </ListItemButton>
        </HideableToolTip>
    );
};
