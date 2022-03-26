// Add extra color to the theme.
declare module '@mui/material/styles' {
  interface Palette {
    default: Palette['primary'];
  }
  interface PaletteOptions {
    default: PaletteOptions['primary'];
  }
}

// Add the default colour to Buttons
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    default: true;
  }
}

// Add an extra variant for the Paper component
declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    'outlined-elevation': true;
  }
}

export {};
