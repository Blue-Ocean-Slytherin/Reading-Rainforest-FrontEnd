import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Received from './Received/Received';
import Sent from './Sent/Sent';
import Confirmed from './Confirmed/Confirmed';
import Completed from './Completed/Completed';
import axios from 'axios';

const topStyle = {
  marginTop: '30px',
}

const bottomStyle = {
  marginBottom: '30px',
}

const buttonStyle = {
  backgroundColor: '#058C42',
  width: '400px',
}

const Trades = (props) => {
  const [userTrades, setTrades] = useState(null);
  const [receivedTrades, setReceived] = useState(null);
  const [sentTrades, setSent] = useState(null);
  const [confirmedTrades, setConfirmed] = useState(null);
  const [completedTrades, setCompleted] = useState(null);
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
    if (userTrades) {
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
      console.log('hello', tempReceived);
      setReceived(tempReceived);
      setSent(tempSent);
      setConfirmed(tempConfirmed);
      setCompleted(tempCompleted);
    }
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

  return receivedTrades && sentTrades && confirmedTrades && completedTrades ? (
    <div>
      <h1>Trade List</h1>
      <Box sx={{borderRadius: '25px', width:'400px', height:'100%', backgroundColor:'#BBDEF0'}}>
        <Stack spacing={4} justifyContent="center" alignItems="center">
          <div style={topStyle}>
            <Button style={buttonStyle} variant="contained" onClick={onReceived}>Received</Button>
          </div>
          <div>
            <Button style={buttonStyle} variant="contained" onClick={onSent}>Sent</Button>
          </div>
          <div>
            <Button style={buttonStyle} variant="contained" onClick={onConfirmed}>Confirmed</Button>
          </div>
          <div style={bottomStyle}>
            <Button style={buttonStyle} variant="contained" onClick={onCompleted}>Complete</Button>
          </div>
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
  ) : <></>
};

export default Trades;