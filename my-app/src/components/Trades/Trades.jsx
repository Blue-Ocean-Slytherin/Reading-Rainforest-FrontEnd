import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Received from './Received/Received';
import Sent from './Sent/Sent';
import Confirmed from './Confirmed/Confirmed';
import Completed from './Completed/Completed';
import axios from 'axios';
// import {styled} from '@mui/material/styles';


const Trades = (props) => {
  const [userTrades, setTrades] = useState([]);
  const [receivedTrades, setReceived] = useState([]);
  const [sentTrades, setSent] = useState([]);
  const [confirmedTrades, setConfirmed] = useState([]);
  const [completedTrades, setCompleted] = useState([]);
  const [currTrade, setCurr] = useState('received');
  const [updateState, setUpdate] = useState(0);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BE_URI}/trade/trades`, {params: {uid: props.user.uid}})
      .then((response) => {
        console.log(response.data);
        setTrades(response.data)
      })
      .catch((err) => console.log('Error with getting trades'))
  }, [updateState])

  useEffect(() => {
    const tempReceived = [];
    const tempSent = [];
    const tempConfirmed = [];
    const tempCompleted = [];
    for (let i = 0; i < userTrades.length; ++i) {
      if (userTrades[i].status === 'received') {
        tempReceived.push(userTrades[i]);
      } else if (userTrades[i].status === 'sent') {
        tempSent.push(userTrades[i]);
      } else if (userTrades[i].status === 'confirmed') {
        tempConfirmed.push(userTrades[i]);
      } else if (userTrades[i].status === 'completed') {
        tempCompleted.push(userTrades[i]);
      }
    }
    setReceived(tempReceived);
    setSent(tempSent);
    setConfirmed(tempConfirmed);
    setCompleted(tempCompleted);
  }, [userTrades])

  const update = function () {
    const temp = updateState + 1;
    setUpdate(temp);
  }

  const onReceived = function() {
    setCurr('received');
  }

  const onSent = function() {
    setCurr('sent');
  }

  const onConfirmed = function() {
    setCurr('confirmed');
  }

  const onCompleted = function() {
    setCurr('completed');
  }

  return (
    <div>
      <h1>Trade List</h1>
      <Box sx={{width:'400px', height:'100%', backgroundColor:'#BBDEF0'}}>
        <Stack spacing={4} justifyContent="center">
          <Button variant="contained" onClick={onReceived}>Received</Button>
          <Button variant="contained" onClick={onSent}>Sent</Button>
          <Button variant="contained" onClick={onConfirmed}>Confirmed</Button>
          <Button variant="contained" onClick={onCompleted}>Complete</Button>
        </Stack>
      </Box>
      {currTrade === 'received' && (
        <div className="cardPosition">
          <Received receivedTrades={receivedTrades} update={update} user={props.user}/>
        </div>
      )}
      {currTrade === 'sent' && (
        <div className="cardPosition">
          <Sent sentTrades={sentTrades} update={update} user={props.user}/>
        </div>
      )}
      {currTrade === 'confirmed' && (
        <div className="cardPosition">
          <Confirmed confirmedTrades={confirmedTrades} update={update} user={props.user}/>
        </div>
      )}
      {currTrade === 'completed' && (
        <div className="cardPosition">
          <Completed completedTrades={completedTrades} update={update} user={props.user}/>
        </div>
      )}
    </div>
  )
};

export default Trades;