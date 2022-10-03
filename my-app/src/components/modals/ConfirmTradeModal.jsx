import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { DataGrid } from '@mui/x-data-grid';
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close';
import Avatar from "@mui/material/Avatar";
import Divider from '@mui/material/Divider';

const theme = createTheme({
  palette: {
    mintGreen: {
      main: "#9cfc97",
    },
  },
});
const styleBigBox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "75%",
  width: "75%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};
const TitleContainer = {
  display:  "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 0px 10px 0px",
};
const CloseIconStyle = {
  fontSize: "45px",
};
const UserAndBook = {
  display: "flex",
  justifyContent: "space-around",
  boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  borderRadius: "4px",
  padding: "3px",
  margin: "0 0 3px 0",
};
const UserBookLabel = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};
const labelSize = `35px`;
const UserBookNameLabel = {
  padding: "0 5px 0 3px",
  textAlign: "center",
  fontSize: labelSize,
};
const UserBookValueLabel = {
  padding: "0 3px 0 5px",
  textAlign: "center",
  fontSize: labelSize,
};
const profilePic = {
  height: "100px",
  width: "100px",
};
const TitleStyle = {
  borderBottom: "3px solid black",
};
const ConfirmButtonContainer = {
  padding: '3px 0 0 0',
  display: 'flex',
  justifyContent: 'end'
}

const columns = [
  { field: 'bookName', headerName: 'Book', width: 200, flex: 1},
  { field: 'authorName', headerName: 'Author', width: 200, flex: 1 },
  { field: 'smallDesc', headerName: 'Description', width: 400, flex: 3},
  // { field: 'coverPhoto', headerName: 'Cover', width: 130 },
];

export default function ConfirmTradeModal({ userName, bookName, userPic, bookPic }) {
  const [open, setOpen] = React.useState(false);
  const [selection, setSelection] = React.useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let handleRowSelection = (params) => {
    const newSelect = { "isbn": params.row.isbn };
    setSelection(newSelect);
  };

  let submitTrade = () => {
    // write function to send request to BackEnd
    console.log(selection);
    if (selection.id) {
      alert(`Trade Request 'Sent' for ${selection} 😬`);
    } else {
      alert('Trade Request Failed, no book selected');
    }

  }

  // query DB to obtain list of user's books (isbn comes from our DB)
  // query Google Books API to obtain data on each book, then put into array to list (rest of data from google books API)
  // Example Data Form:
  // {
  //   // Reading Rainforest
  //   isbn: 0,
  //   // Google Books API
  //   bookName: "The Alchemist",
  //   authorName: "Paulo Coelho",
  //   smallDesc: `The Alchemist is a novel by Brazilian author Paulo Coelho which was
  //   first published in 1988. Originally written in Portuguese, it became a
  //   widely translated international bestseller.`,
  //   coverPhoto: "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg",
  // }


  // create dummy data for user's books
  const rows = [
    {
      id: 1,
      isbn: 1,
      bookName: "The Alchemist",
      authorName: "Paulo Coelho",
      smallDesc: `The Alchemist is a novel by Brazilian author Paulo Coelho which was
      first published in 1988. Originally written in Portuguese, it became a
      widely translated international bestseller.`,
      coverPhoto: "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg",
    },
    {
      id: 2,
      isbn: 2,
      bookName: "The Alchemist",
      authorName: "Paulo Coelho",
      smallDesc: `The Alchemist is a novel by Brazilian author Paulo Coelho which was
      first published in 1988. Originally written in Portuguese, it became a
      widely translated international bestseller.`,
      coverPhoto: "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg",
    },
    {
      id: 3,
      isbn: 3,
      bookName: "The Alchemist",
      authorName: "Paulo Coelho",
      smallDesc: `The Alchemist is a novel by Brazilian author Paulo Coelho which was
      first published in 1988. Originally written in Portuguese, it became a
      widely translated international bestseller.`,
      coverPhoto: "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg",
    },
    {
      id: 4,
      isbn: 4,
      bookName: "The Alchemist",
      authorName: "Paulo Coelho",
      smallDesc: `The Alchemist is a novel by Brazilian author Paulo Coelho which was
      first published in 1988. Originally written in Portuguese, it became a
      widely translated international bestseller.`,
      coverPhoto: "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg",
    },
    {
      id: 5,
      isbn: 5,
      bookName: "The Alchemist",
      authorName: "Paulo Coelho",
      smallDesc: `The Alchemist is a novel by Brazilian author Paulo Coelho which was
      first published in 1988. Originally written in Portuguese, it became a
      widely translated international bestseller.`,
      coverPhoto: "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg",
    },
    {
      id: 6,
      isbn: 6,
      bookName: "The Alchemist",
      authorName: "Paulo Coelho",
      smallDesc: `The Alchemist is a novel by Brazilian author Paulo Coelho which was
      first published in 1988. Originally written in Portuguese, it became a
      widely translated international bestseller.`,
      coverPhoto: "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg",
    },
    {
      id: 7,
      isbn: 7,
      bookName: "The Alchemist",
      authorName: "Paulo Coelho",
      smallDesc: `The Alchemist is a novel by Brazilian author Paulo Coelho which was
      first published in 1988. Originally written in Portuguese, it became a
      widely translated international bestseller.`,
      coverPhoto: "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg",
    },
    {
      id: 8,
      isbn: 8,
      bookName: "The Alchemist",
      authorName: "Paulo Coelho",
      smallDesc: `The Alchemist is a novel by Brazilian author Paulo Coelho which was
      first published in 1988. Originally written in Portuguese, it became a
      widely translated international bestseller.`,
      coverPhoto: "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg",
    },
    {
      id: 9,
      isbn: 9,
      bookName: "The Alchemist",
      authorName: "Paulo Coelho",
      smallDesc: `The Alchemist is a novel by Brazilian author Paulo Coelho which was
      first published in 1988. Originally written in Portuguese, it became a
      widely translated international bestseller.`,
      coverPhoto: "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg",
    },
    {
      id: 10,
      isbn: 10,
      bookName: "The Alchemist",
      authorName: "Paulo Coelho",
      smallDesc: `The Alchemist is a novel by Brazilian author Paulo Coelho which was
      first published in 1988. Originally written in Portuguese, it became a
      widely translated international bestseller.`,
      coverPhoto: "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg",
    },
  ];
  // render interactive list below display

  return (
    <div>
      <ThemeProvider theme={theme}>
      <Button variant="contained" color="mintGreen" onClick={handleOpen} endIcon={<SwapHorizIcon />} >
        Trade
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
        <Box id='ConfirmTradeModal' sx={styleBigBox}>
          <Box id='trade-confirm-title-container' sx={TitleContainer}>
            <div></div>
            <Typography id="trade-confirm-title" variant="h3" sx={TitleStyle}>
              Confirm Trade
            </Typography>
            <CloseIcon sx={CloseIconStyle} onClick={handleClose} className='CloseIcon' />
          </Box>
          <Box className='UserAndBook' sx={UserAndBook}>
            <Avatar alt="profile-pic" src={userPic} sx={profilePic} />
            <Box className='UserBookLabel' sx={UserBookLabel}>
              <Typography id="UserBookNameLabel" variant="h5" component="h2" sx={UserBookNameLabel}>User</Typography>
              <Typography id="UserBookValueLabel" variant="h5" component="h2" sx={UserBookValueLabel}>{userName}</Typography>
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Box className='UserBookLabel' sx={UserBookLabel}>
              <Typography id="UserBookNameLabel" variant="h5" component="h2" sx={UserBookNameLabel}>Book</Typography>
              <Typography id="UserBookValueLabel" variant="h5" component="h2" sx={UserBookValueLabel}>{bookName}</Typography>
            </Box>
            <Avatar alt="book-pic" src={bookPic} sx={profilePic} />
          </Box>
          <Box style={{ height: 423, width: '100%' }}>
            <DataGrid
              sx={{boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",}}
              rows={rows}
              columns={columns}
              pageSize={6}
              rowsPerPageOptions={[6]}
              onRowClick={handleRowSelection}
            />
          </Box>
          <Box sx={ConfirmButtonContainer} className="ConfirmButtonContainer">
            <Button variant="contained" color="mintGreen" endIcon={<SwapHorizIcon sx={{boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",}}/>}
            onClick={submitTrade} >
              Trade
            </Button>
          </Box>
        </Box>
      </Modal>
      </ThemeProvider>
    </div>
  );
}
