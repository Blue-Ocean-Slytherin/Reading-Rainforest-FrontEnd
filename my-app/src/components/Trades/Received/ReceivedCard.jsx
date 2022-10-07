import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { collection, addDoc } from "firebase/firestore";
import { firestore } from '../../../firebase';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import ParkIcon from '@mui/icons-material/Park';
import ParkOutlinedIcon from '@mui/icons-material/ParkOutlined';
import { styled } from '@mui/material/styles';
import { UserContext } from '../../../components/App';
import { ChatContext } from "../../App.jsx";
import { useNavigate } from "react-router-dom";
import {
  setDoc,
  doc,
  updateDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

const greenStyle = {
  backgroundColor: '#9CFC97',
}

const redStyle = {
  backgroundColor: 'red'
}

const imgStyle = {
  padding: '1px',
  width: '100px',
  height: '100px',
}

const coverStyle ={
  width: '180px',
  height: '220px',
}

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#058c42',
  }
});

const ReceivedCard = (props) => {
  const [userBook, setUserBook] = useState(null);
  const [traderBook, setTraderBook] = useState(null);
  const [traderInfo, setTrader] = useState(null);
  const [rating, setRating] = useState(null);
  const { dispatch } = useContext(ChatContext);
  const { user: currentUser } = useContext(UserContext)
  const navigate = useNavigate();

  const handlePhoneText = async () => {
    // Add a new document with a generated id.

    const docRef1 = await addDoc(collection(firestore, "notifications"), {
      to: props.user.phoneNumber,
      body: `Text to Send to ${props.user.name}, Your ${userBook.volumeInfo.title} Trade has Been Accepted by ${traderInfo.phoneNumber}`
    });
    console.log("Document written with ID: ", docRef1.id);

    const docRef2 = await addDoc(collection(firestore, "notifications"), {
      to: traderInfo.phoneNumber,
      body: `Text to Send to ${traderInfo.name}, Your ${traderBook.volumeInfo.title} Trade has Been Accepted by ${props.user.phoneNumber}`
    });

    console.log("Document written with ID: ", docRef2.id);
  }

  const changeConfirmed = function () {
    axios.put(`${process.env.REACT_APP_BE_URI}/trade/status`, {tradeId: props.trade.transactionID, status:'confirmed', uid: props.user.uid})
      .then(results => console.log(results))
      .catch ((err) => console.log(err))
    axios.put(`${process.env.REACT_APP_BE_URI}/trade/status`, {tradeId: props.trade.transactionID, status:'confirmed', uid: traderInfo.uid})
      .then(results => console.log(results))
      .catch ((err) => console.log(err))
    setTimeout(props.update(), 1000);
    handlePhoneText();
  }

  const deleteTrade = function () {
    axios.put(`${process.env.REACT_APP_BE_URI}/trade/delete`, {tradeId: props.trade.transactionID, uid: props.user.uid})
      .then(results => console.log(results))
      .catch ((err) => console.log(err))
    axios.put(`${process.env.REACT_APP_BE_URI}/trade/delete`, {tradeId: props.trade.transactionID, uid: traderInfo.uid})
      .then(results => console.log(results))
      .catch ((err) => console.log(err))
    setTimeout(props.update(), 200);
  }

  useEffect(() => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${props.trade.isbnTrader}`)
    .then((results) => setTraderBook(results.data.items[0]))
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${props.trade.isbnUser}`)
    .then((results) => setUserBook(results.data.items[0]))
    axios.get(`${process.env.REACT_APP_BE_URI}/user/${props.trade.tradedToUser}/`)
    .then((results) => setTrader(results.data))
  }, [props.trade])

  useEffect(() => {
    if(traderInfo) {
      setRating(traderInfo.ratingTotal / traderInfo.ratingsCount);
    }
  }, [traderInfo])

  const handleSelect = async () => {

    const combinedID =
      currentUser.uid > traderInfo.uid
      ? currentUser.uid + traderInfo.uid
      : traderInfo.uid + currentUser.uid;

      try {
        const res = await getDoc(doc(firestore, "chats", combinedID));

        if (!res.exists()) {

          await setDoc(doc(firestore, "chats", combinedID), { messages: []});

          await updateDoc(doc(firestore, "userChats", currentUser.uid), {
            [combinedID  + ".userInfo"]: {
              uid: traderInfo.uid,
              displayName: traderInfo.name,
              photoURL: traderInfo.profilePhoto,
            },
            [combinedID + ".date"]: serverTimestamp(),
          });

          await updateDoc(doc(firestore, "userChats", traderInfo.uid), {
            [combinedID  + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.name,
              photoURL: currentUser.profilePhoto,
            },
            [combinedID + ".date"]: serverTimestamp(),
          })
        }} catch (err) { console.log(err)}

    const user = {
      photoURL: traderInfo.profilePhoto,
      uid: traderInfo.uid,
      displayName: traderInfo.name,
    }
    dispatch({type:'CHANGE_USER', payload: user});
    navigate("/messages");
  }

  console.log('completed card message', traderInfo)

  return traderInfo && userBook && traderBook && rating ? (
    <div>
      <Box sx={{borderRadius: '25px', width: '1100px', height: '315px', m:6, backgroundColor:"#BBDEF0"}}>
        <Stack direction="row" spacing={5} justifyContent="center">
          <div>
            <Card sx={{ minWidth: 215, maxWidth: 215, maxHeight: 245, m:1.5}}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Trader's Info
                </Typography>
                <Typography variant="h5" component="div">
                  {traderInfo.name}
                </Typography>
                <img style={imgStyle} src={traderInfo.profilePhoto} alt =""/>
                <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                  {traderInfo.email}
                </Typography>
                <StyledRating defaultValue={rating} precision={0.25} icon={<ParkIcon/>} emptyIcon={<ParkOutlinedIcon/>} readOnly />
              </CardContent>
            </Card>
          </div>
          <div>
            <Card sx={{maxWidth: 215, maxHeight: 245, m: 1.5}}>
              <CardContent style={{margin: 0}}>
                <img style={coverStyle} src={traderBook.volumeInfo.imageLinks.thumbnail} alt=""/>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card sx={{ overflow: 'auto', minHeight: 245, maxWidth: 215, maxHeight: 245, m:1.5}}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Book to Receive
                </Typography>
                <Typography sx={{ fontSize: 18 }} variant="h5" component="div">
                  {traderBook.volumeInfo.title}
                </Typography>
                <Typography sx={{ fontSize: 12, mb: 1 }} color="text.secondary">
                  By {traderBook.volumeInfo.authors[0]}
                </Typography>
                <Typography variant="body2" component="div">
                    {traderBook.volumeInfo.description}
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div>
          <Card sx={{ overflow: 'auto', minHeight: 245, maxWidth: 215, maxHeight: 245, m:1.5}}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Book to Trade
                </Typography>
                <Typography sx={{ fontSize: 18 }} variant="h5" component="div">
                  {userBook.volumeInfo.title}
                </Typography>
                <Typography sx={{ fontSize: 12, mb: 1 }} color="text.secondary">
                  By {userBook.volumeInfo.authors[0]}
                </Typography>
                <Typography variant="body2" component="div">
                    {userBook.volumeInfo.description}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </Stack>
        <Stack direction="row" spacing={20} justifyContent="center">
          <Button style={greenStyle} variant="contained" onClick={changeConfirmed}>Accept</Button>
          <Button style={greenStyle} variant="contained" onClick={()=>handleSelect()}>Message</Button>
          <Button style={redStyle} variant="contained" onClick={deleteTrade}>Decline</Button>
        </Stack>
      </Box>
    </div>
  ) : <></>
}

export default ReceivedCard;