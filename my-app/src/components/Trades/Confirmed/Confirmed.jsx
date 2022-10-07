import React, {useState, useEffect} from 'react';
import ConfirmedCard from './ConfirmedCard';

const Confirmed = (props) => {
  return (
    <div>
      {props.confirmedTrades.map((trade, key) =>
        <ConfirmedCard trade={trade} key={trade._id} update={props.update} user={props.user}/>
      )}
    </div>
  )
}

export default Confirmed;