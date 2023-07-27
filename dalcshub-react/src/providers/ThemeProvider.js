//Author: Shiwen(Lareina) Yang
import { theme } from "../utils";
import {
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
} from "@mui/material";

/**
 * Wraps children component and injects theme support into the component.
 * @param MaterialUiProviderProps.children
 * Contains the node holding the children to inject material-ui support into.
 * @return - The provider wrapping the children.
 */
export const ThemeProvider = ({ children }) => (
  <StyledEngineProvider injectFirst>
    <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
  </StyledEngineProvider>
);
