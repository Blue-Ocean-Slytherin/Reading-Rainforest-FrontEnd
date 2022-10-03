import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from "@mui/material/styles";

import UserInfo from './UserInfo.jsx';
import UserSearch from './UserSearch.jsx';
import Listings from './Listings.jsx';

const theme = createTheme({
  palette: {
    spanishGreen: {
      main: "#058c42",
    },
    deepChampagne: {
      main: "#ffcf9c",
    },
    mintGreen: {
      main: "#9cfc97",
    },
    columbiaBlue: {
      main: "#bbdef0",
    },
    raisinBlack: {
      main: "231f20",
    },
  },
});

const Profile = () => {
  const [booksList, setBooksList] = useState('My Listings') // will toggle to My Listing / Saved
  const [userProfile, setUserProfile] = useState(''); // will change once a user clicks on Profile or clicks on different user profile
  const [loggedInProfile, setLoggedInProfile] = useState('Signed In User ID Name'); // this will be changed once user signs in

  return (
    <div className='user-profile'>
      <ThemeProvider theme={theme}>
        Profile
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Paper>
              <UserInfo />
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper>
              <UserSearch />
              <Listings
                userProfile={userProfile}
                loggedInProfile={loggedInProfile}
              />
            </Paper>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  )
}

export default Profile;