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


const Trades = () => {
  const [userTrades, setTrades] = useState([]);
  const [receivedTrades, setReceived] = useState([]);
  const [sentTrades, setSent] = useState([]);
  const [confirmedTrades, setConfirmed] = useState([]);
  const [completedTrades, setCompleted] = useState([]);
  const [currTrade, setCurr] = useState('received');

  // const TradeButton = styled(Button)(({theme}) => ({
  //   margin: 20,
  // }));

  useEffect(() => {
    axios.get('http://localhost:3002/trade/trades', {params: {uid: '478f7781-666b-46d8-9f79-f5b41cd7e9f0'}})
      .then((response) => {
        console.log(response.data);
        setTrades(response.data)
      })
      .catch((err) => console.log('Error with getting trades'))
  }, [null])

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
          <Received receivedTrades={receivedTrades}/>
        </div>
      )}
      {currTrade === 'sent' && (
        <div className="cardPosition">
          <Sent sentTrades={sentTrades}/>
        </div>
      )}
      {currTrade === 'confirmed' && (
        <div className="cardPosition">
          <Confirmed confirmedTrades={confirmedTrades}/>
        </div>
      )}
      {currTrade === 'completed' && (
        <div className="cardPosition">
          <Completed completedTrades={completedTrades}/>
        </div>
      )}
    </div>
  )
};

export default Trades;