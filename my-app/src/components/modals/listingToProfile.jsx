import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import BookCard from "../ListToProfile/BookCard";
import SearchBar from "../ListToProfile/SearchBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mintGreen: {
      main: "#9cfc97",
    },
  },
});

export default function ScrollDialog() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          color="mintGreen"
          onClick={handleClickOpen("body")}
        >
          Add To Listing
        </Button>
      </ThemeProvider>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          Add Listing To Profile
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <Box>
            <SearchBar />
            <br></br>{" "}
            <Container maxWidth="md" spacing={2}>
              <Stack spacing={2}>
                <BookCard onClose={handleClose} />
                <BookCard onClose={handleClose} />
                <BookCard onClose={handleClose} />
                <BookCard onClose={handleClose} />
                <BookCard onClose={handleClose} />
                <BookCard onClose={handleClose} />
              </Stack>
            </Container>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
