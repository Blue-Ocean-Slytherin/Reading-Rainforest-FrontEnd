import React, { useState } from 'react';
import Button from "@mui/material/Button";
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

const ListingsButton = (props) => {
  return (
    <div>
      <ThemeProvider theme={theme}>
      {props.userProfile === props.loggedInProfile ?
        <>
          <Button
            variant="contained"
            color="mintGreen"
          >
            My Listing
          </Button>
          <Button
            variant="contained"
            color="mintGreen"
          >
            Saved
          </Button>
        </> :
        <>
          <Button
            variant="contained"
            color="mintGreen"
          >
            Listing
          </Button>
          <Button
            variant="contained"
            color="mintGreen"
          >
            Message
          </Button>
        </>
      }
        </ThemeProvider>
    </div>
  )
}

export default ListingsButton;