import React, { useState } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const Listing = (props) => {
  return (
    <div>{props.listing}</div>
  )
}

export default Listing;