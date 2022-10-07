import * as React from "react";
import axios from 'axios';
import {v4 as uuidv4} from 'uuid'

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { DataGrid } from '@mui/x-data-grid';
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CloseIcon from '@mui/icons-material/Close';
import Avatar from "@mui/material/Avatar";
import Divider from '@mui/material/Divider';
import { UserContext } from '../App.jsx';

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
  { field: 'title', headerName: 'Book', width: 200, flex: 1},
  { field: 'authors', headerName: 'Author', width: 200, flex: 1 },
  { field: 'description', headerName: 'Description', width: 400, flex: 3},
  // { field: 'coverPhoto', headerName: 'Cover', width: 130 },
];

export default function ConfirmTradeModal({ otherUser, book }) {
  const [open, setOpen] = React.useState(false);
  const [selection, setSelection] = React.useState({});
  const { user, listOfBooks } = React.useContext(UserContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let handleRowSelection = (params) => {
    const newSelect = {
      'uidFrom': user.uid,
      "isbnFrom": params.row.industryIdentifiers[0].identifier,
      'uidTo': otherUser.uid,
      'isbnTo': book?.industryIdentifiers[0].identifier
    };
    setSelection(newSelect);
  };

  let submitTrade = () => {
    // write function to send request to BackEnd
    if (selection.isbnFrom && selection.isbnTo && selection.uidFrom && selection.uidTo) {
      const tradeID = uuidv4();
      const userTemp = {
        uid: selection.uidFrom,
        isbnUser: selection.isbnFrom,
        isbnTrader: selection.isbnTo,
        tradedToUser: selection.uidTo,
        status: 'sent',
        transactionID: tradeID
      }
      const tradeTemp = {
        uid: selection.uidTo,
        isbnUser: selection.isbnTo,
        isbnTrader: selection.isbnFrom,
        tradedToUser: selection.uidFrom,
        status: 'received',
        transactionID: tradeID
      }
      axios.post(`${process.env.REACT_APP_BE_URI}/trade/add`, userTemp)
        .then(() => console.log('Trade Added!'))
        .catch((err) => console.log('Failed to Add Trade'))
      axios.post(`${process.env.REACT_APP_BE_URI}/trade/add`, tradeTemp)
        .then(() => console.log('Trade Added!'))
        .catch((err) => console.log('Failed to Add Trade'))
      // alert(`Trade Request 'Sent' 😬, Info:
      //       isbnFrom ${selection.isbnFrom}
      //       isbnTo ${selection.isbnTo}
      //       uidFrom ${selection.uidFrom}
      //       uidTo ${selection.uidTo}
      //       `);
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

  for ( let i = 0; i < listOfBooks.length; i++ ) {
    listOfBooks[i]['id'] = i;
  }

  return (
    <div>
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
            <Avatar alt="profile-pic" src={otherUser.profilePhoto} sx={profilePic} />
            <Box className='UserBookLabel' sx={UserBookLabel}>
              <Typography id="UserBookNameLabel" variant="h5" component="h2" sx={UserBookNameLabel}>User</Typography>
              <Typography id="UserBookValueLabel" variant="h5" component="h2" sx={UserBookValueLabel}>{otherUser.name}</Typography>
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Box className='UserBookLabel' sx={UserBookLabel}>
              <Typography id="UserBookNameLabel" variant="h5" component="h2" sx={UserBookNameLabel}>Book</Typography>
              <Typography id="UserBookValueLabel" variant="h5" component="h2" sx={UserBookValueLabel}>
                {book?.title.length > 30?
                book?.title.split(' ').slice(0,3).join(' ') + '...':
                book?.title
                }
              </Typography>
            </Box>
            <Avatar alt="book-pic" src={book.imageLinks.smallThumbnail} sx={profilePic} />
          </Box>
          <Box style={{ height: 423, width: '100%' }}>
            <DataGrid
              sx={{boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",}}
              rows={listOfBooks}
              columns={columns}
              pageSize={6}
              rowsPerPageOptions={[6]}
              onRowClick={handleRowSelection}
            />
          </Box>
          <Box sx={ConfirmButtonContainer} className="ConfirmButtonContainer">
            <Button variant="contained" color="mintGreen" onClick={submitTrade} sx={{boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"}} endIcon={<SwapHorizIcon />} >
              Trade
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
