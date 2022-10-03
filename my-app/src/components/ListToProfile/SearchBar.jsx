import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

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

export default function SearchBar({ Books }) {
  const [search, setSearch] = useState("");

  const handleClick = () => {
    if (search.length > 0) {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${search}`)
        .then((response) => {
          Books(response.data.items);
        });
    }
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
        m: "auto",
      }}
      onSubmit={(e) => e.preventDefault()}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Query (Name, ISBN, Author, Etc)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <ThemeProvider theme={theme}>
        <IconButton
          color="spanishGreen"
          sx={{ p: "10px" }}
          aria-label="directions"
          onClick={handleClick}
        >
          <SearchIcon />
        </IconButton>
      </ThemeProvider>
    </Paper>
  );
}
