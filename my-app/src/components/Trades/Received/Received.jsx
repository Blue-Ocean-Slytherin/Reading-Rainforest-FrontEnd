import React, {useState, useEffect} from 'react';
import ReceivedCard from './ReceivedCard';

const Received = (props) => {
  return (
    <div>
      {props.receivedTrades.map((trade, key) =>
        <ReceivedCard trade={trade} key={trade._id} update={props.update} user={props.user}/>
      )}
    </div>
  )
}

export default Received;