import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

const theme = createTheme({
  palette: {
    spanishGreen: {
      main: "#058c42",
    },
    deepChampagne: {
      main: "#ffcf9c",
    },
    mintGreen: {
      main: "#9cfc97",
    },
    columbiaBlue: {
      main: "#bbdef0",
    },
    raisinBlack: {
      main: "231f20",
    },
  },
});
export default function SwapButton() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" color="mintGreen" endIcon={<SwapHorizIcon />}>
        Trade
      </Button>
    </ThemeProvider>
  );
}
