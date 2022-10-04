import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Received from './Received/Received';
import Sent from './Sent/Sent';
import Confirmed from './Confirmed/Confirmed';
import Completed from './Completed/Completed';
// import {styled} from '@mui/material/styles';


const Trades = () => {
  const [userTrades, setTrades] = useState([]);
  const [currTrade, setCurr] = useState('received');

  // const TradeButton = styled(Button)(({theme}) => ({
  //   margin: 20,
  // }));

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
          <Received/>
        </div>
      )}
      {currTrade === 'sent' && (
        <div className="cardPosition">
          <Sent/>
        </div>
      )}
      {currTrade === 'confirmed' && (
        <div className="cardPosition">
          <Confirmed/>
        </div>
      )}
      {currTrade === 'completed' && (
        <div className="cardPosition">
          <Completed/>
        </div>
      )}
    </div>
  )
};

export default Trades;