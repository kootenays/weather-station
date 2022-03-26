import {
  checkboxClasses,
  createTheme,
  radioClasses,
  alpha,
  accordionClasses,
} from '@mui/material';
// Make sure that types work properly with the new added variants etc
import type {} from './augmentation';

export const ApplicationTheme = createTheme({});

ApplicationTheme.typography.h3 = {
  ...ApplicationTheme.typography.h3,
  fontSize: '1.5rem',
  [ApplicationTheme.breakpoints.up('sm')]: {
    fontSize: '1.625rem',
  },
  [ApplicationTheme.breakpoints.up('md')]: {
    fontSize: '1.875rem',
  },
};

ApplicationTheme.typography.h6 = {
  ...ApplicationTheme.typography.h6,
  fontSize: '1.0625rem',
  [ApplicationTheme.breakpoints.up('sm')]: {
    fontSize: '1.0909rem',
  },
};

ApplicationTheme.shape = {
  ...(ApplicationTheme.shape || {}),
  borderRadius: parseInt(ApplicationTheme.spacing(1)),
};

ApplicationTheme.components = {
  ...(ApplicationTheme.components || {}),
  MuiAccordion: {
    defaultProps: { variant: 'outlined-elevation' },
    styleOverrides: {
      root: {
        // Remove extra border
        ['&:before']: { content: 'none' },
        // Remove bg color when disabled
        [`&.${accordionClasses.disabled}`]: {
          backgroundColor: 'inherit',
        },
      },
    },
  },
  MuiButton: {
    variants: [{ props: { variant: 'text' }, style: { padding: 0 } }],
    styleOverrides: {
      root: { textTransform: 'capitalize', whiteSpace: 'nowrap' },
    },
  },
  MuiCard: {
    defaultProps: { variant: 'outlined-elevation' },
    styleOverrides: {},
  },
  MuiCardActions: {
    styleOverrides: {
      root: { padding: ApplicationTheme.spacing(2) },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        '&:last-child': { paddingBottom: ApplicationTheme.spacing(2) },
      },
    },
  },
  MuiCardHeader: {
    defaultProps: { titleTypographyProps: { variant: 'h6' } },
  },
  MuiChip: {
    styleOverrides: {
      // Set the background to be a lighter version of the same color to make it more distinguishable
      root: ({ ownerState, theme }) =>
        ownerState.color &&
        ownerState.color !== 'default' &&
        ownerState.variant === 'outlined'
          ? {
              backgroundColor: alpha(
                theme.palette[ownerState.color].light,
                0.15
              ),
              fontWeight: theme.typography.fontWeightMedium,
            }
          : { fontWeight: theme.typography.fontWeightMedium },
    },
  },
  // Make sure inputs change their height when their in a grid/table, so that
  // its always uniform across the row
  MuiFormControl: { styleOverrides: { root: { height: '100%' } } },
  MuiFormControlLabel: {
    // Make sure that the checkbox and radio buttons are inline with the
    // first-line of the label, even if it has multiple lines
    styleOverrides: {
      root: {
        alignItems: 'flex-start',
        marginTop: ApplicationTheme.spacing(1),
        marginBottom: ApplicationTheme.spacing(1),
        [`& .${radioClasses.root}, & .${checkboxClasses.root}`]: {
          marginTop: ApplicationTheme.spacing(-1),
          marginBottom: ApplicationTheme.spacing(-1),
        },
      },
    },
  },
  MuiGrid: {
    defaultProps: { spacing: 2 },
  },
  MuiInput: {
    styleOverrides: {
      root: {
        '&:before': { display: 'none' },
        '&:after': { display: 'none' },
        height: '100%',
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      // Reduce the padding of small sized inputs
      inputSizeSmall: { padding: ApplicationTheme.spacing(0.5, 1.75) },
    },
  },
  MuiPaper: {
    variants: [
      {
        props: { variant: 'outlined-elevation' },
        style: {
          border: `1px solid ${ApplicationTheme.palette.divider}`,
          boxShadow:
            'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px',
        },
      },
    ],
  },
  MuiSelect: {
    styleOverrides: { select: { textAlign: 'left' } },
  },
  MuiStack: {
    defaultProps: { spacing: 2 },
  },
  MuiTab: {
    styleOverrides: {
      root: { textTransform: 'capitalize' },
    },
  },
  MuiTextField: {
    // Set the default min and max rows so that all multiline fields are the same
    defaultProps: { minRows: 3, maxRows: 10 },
    styleOverrides: {
      root: { height: '100%' },
    },
  },
};
