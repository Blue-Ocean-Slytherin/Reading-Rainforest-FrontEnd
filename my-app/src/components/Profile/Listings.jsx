import React, { useState } from 'react';

import AddBookToProfileModal from './ListingToProfileModal.jsx';

const Listings = (props) => {
  const [isListings, setIsListings] = useState(true); // if toggled to false, will show saved instead
  const [listings, setListings] = useState([]);

  const toggleListings = () => {
    setIsListings(!isListings)
  }

  return(
    <div>
      {props.userProfile === props.loggedInProfile ?
      <div className='listing-buttons'>
        <button
          className='listing-button'
        >
          My Listings
        </button>
        <button
          className='listing-button'
        >
          Saved
        </button>
      </div> :
      <div className='listing-buttons'>
        <button
          className='listing-button'
        >
          Listings
        </button>
        <button
          className='listing-button'
        >
          Message
        </button>
      </div>
      }
      <div className='listings'>
        <AddBookToProfileModal />
      </div>
    </div>
  )
}

export default Listings;