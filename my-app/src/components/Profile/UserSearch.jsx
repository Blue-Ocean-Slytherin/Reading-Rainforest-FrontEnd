import React, { useState } from 'react';

const UserSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const updateQuery = (query) => {
    setSearchQuery(query);
  }

  return (
    <div>
      <form>
        <input
          className='search-bar'
          type='search'
          placeholder='Search Users'
          onChange={(event) => updateQuery(event.target.value)}
        />
        <button
          className='search-button'
          type='submit'
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default UserSearch;