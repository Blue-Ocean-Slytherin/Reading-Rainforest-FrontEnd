import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

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

export default function BookCard({ onClose }) {
  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoTvwrFLjH9PTv4-d4WMsBEWKo4k4mE0MqKg&usqp=CAU"
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            The Four Agreements
            <ThemeProvider theme={theme}>
              <IconButton
                color="spanishGreen"
                sx={{ p: "10px" }}
                aria-label="directions"
                onClick={onClose}
              >
                <PostAddIcon />
              </IconButton>
            </ThemeProvider>
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Book by Don Miguel Ruiz
          </Typography>
          <Typography variant="body2" color="text.main">
            The Four Agreements: A Practical Guide to Personal Freedom is a
            self-help book by bestselling author Don Miguel Ruiz. The book
            offers a code of conduct claiming to be based on ancient Toltec
            wisdom that advocates freedom from self-limiting beliefs that may
            cause suffering and limitation in a person's life.
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
