import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import BookCard from "../ListToProfile/BookCard";
import SearchBar from "../ListToProfile/SearchBar";


export default function ScrollDialog() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [books, setBooks] = React.useState([]);

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
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (books) {
      setBooks([...books]);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Button
        variant="text"
        color="inherit"
        onClick={handleClickOpen("body")}
      >
        Add To Listing
      </Button>
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
            <SearchBar Books={setBooks} />
            <br></br>{" "}
            <Container maxWidth="md" spacing={2}>
              <Stack spacing={2}>
                {books.map((book, index) => {
                  if (book.volumeInfo.imageLinks !== undefined) {
                    return (
                      <BookCard
                        key={book.id}
                        data={book}
                        onClose={handleClose}
                      />
                    );
                  } else {
                    return <div key={index} style={{ display: "none" }}></div>;
                  }
                })}
              </Stack>
            </Container>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
