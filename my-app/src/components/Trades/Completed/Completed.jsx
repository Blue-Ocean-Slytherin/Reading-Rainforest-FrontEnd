import React, {useState, useEffect} from 'react';
import CompletedCard from './CompletedCard';

const Completed = (props) => {
  return (
    <div>
      {props.completedTrades.map((trade, key) =>
        <CompletedCard trade={trade} key={trade._id}/>
      )}
    </div>
  )
}

export default Completed;