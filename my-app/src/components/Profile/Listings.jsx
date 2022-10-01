import React, { useState } from 'react';

const Listings = (props) => {
  const [isListings, setIsListings] = useState(true); // if toggled to false, will show saved instead
  const [listings, setListings] = useState([]);

  return(
    <div>
      {props.userProfile === props.loggedInProfile ?
      <div className='listing-buttons'>
        <button
          >
          My Listings
        </button>
        <button
          >
          Saved
        </button>
      </div> :
      <button>Message</button>}
    </div>
  )
}

export default Listings;