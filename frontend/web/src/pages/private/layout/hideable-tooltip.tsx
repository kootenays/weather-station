import { Tooltip, TooltipProps } from '@mui/material';

/**
 * A tooltip that can be hidden, so that it doesn't need to be rendered when it
 * is not required to be shown at all. Renders a span wrapper around the
 * children instead.
 */
export const HideableToolTip: React.FC<TooltipProps & { hidden?: boolean }> = ({
    children,
    hidden,
    ...props
}) => {
    if (hidden) return <span>{children}</span>;
    return (
        <Tooltip {...props}>
            <span>{children}</span>
        </Tooltip>
    );
};
