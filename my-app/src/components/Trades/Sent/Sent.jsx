import React, {useState, useEffect} from 'react';
import SentCard from './SentCard';

const Sent = (props) => {
  return (
    <div>
      {props.sentTrades.map((trade, key) =>
        <SentCard trade={trade} key={trade._id} user={props.user} update={props.update}/>
      )}
    </div>
  )
}

export default Sent;