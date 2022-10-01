import React, { useState } from 'react';

const UserSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [booksList, setBooksList] = useState('My Listings') // will toggle to My Listing / Saved


  return (
    <div className='user-profile'>
      Hi
    </div>
  )
}

export default UserSearch;