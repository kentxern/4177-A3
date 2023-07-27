//Author: Shiwen(Lareina) Yang
import { createTheme } from "@mui/material/styles";

const PaletteConfiguration = {
  primary: {
    main: "#962061",
  },
  neutral: {
    main: "#F0F4F7"
  },
  background: {
    default: "#FFFFFF",
    secondary: "#962061",
    light: "#F3F3F3",
  },
};

const TypographyConfiguration = {
  h1: {
    fontSize: "2.125rem",
    fontWeight: "bold",
    fontFamily: "Verdana, Geneva, sans-serif",
  },
  h2: {
    fontSize: "1.4rem",
    fontWeight: "bold",
    fontFamily: "Verdana, Geneva, sans-serif",
  },
  h3: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    fontFamily: "Verdana, Geneva, sans-serif",
  },
  h4: {
    fontSize: "1rem",
    fontWeight: "bold",
    fontFamily: "Verdana, Geneva, sans-serif",
  },
  body1: {
    fontSize: "1rem",
    fontFamily: "Verdana, Geneva, sans-serif",
  },
  body2: {
    fontSize: "0.8rem",
    fontFamily: "Verdana, Geneva, sans-serif",
  },
};

const ThemeConfiguration = {
  palette: PaletteConfiguration,
  typography: TypographyConfiguration,
};

export const theme = createTheme(ThemeConfiguration);
