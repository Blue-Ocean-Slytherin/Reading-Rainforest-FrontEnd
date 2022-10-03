import React, { useState } from 'react';

import UserInfo from './UserInfo.jsx';
import UserSearch from './UserSearch.jsx';
import Listings from './Listings.jsx';

const Profile = () => {
  const [booksList, setBooksList] = useState('My Listings') // will toggle to My Listing / Saved
  const [userProfile, setUserProfile] = useState(''); // will change once a user clicks on Profile or clicks on different user profile
  const [loggedInProfile, setLoggedInProfile] = useState('Signed In User ID Name'); // this will be changed once user signs in

  return (
    <div className='user-profile'>
      Profile
      <UserInfo className='user-info' />
      <UserSearch className='user-search' />
      <Listings
        className='user-listings'
        userProfile={userProfile}
        loggedInProfile={loggedInProfile}
      />
    </div>
  )
}

export default Profile;