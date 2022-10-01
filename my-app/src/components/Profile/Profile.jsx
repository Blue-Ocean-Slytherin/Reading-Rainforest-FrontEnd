import React, { useState } from 'react';

const Profile = () => {
  const [booksList, setBooksList] = useState('My Listings') // will toggle to My Listing / Saved


  return (
    <div className='user-profile'>
      Profile
    </div>
  )
}

export default Profile;