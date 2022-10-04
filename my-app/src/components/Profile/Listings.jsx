import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ListingsButtons from './ProfileListingButtons.jsx';
import Listing from './Listing.jsx';
import AddBookToProfileModal from '../modals/listingToProfile.jsx';

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

const Listings = (props) => {
  const [isListings, setIsListings] = useState(true); // if toggled to false, will show saved instead
  const [listings, setListings] = useState(['listing1', 'listing2', 'listing3']);
  const [savedListings, setSavedListings] = useState([]);

  const toggleListings = () => {
    setIsListings(!isListings)
  }

  return(
    <>
    <Grid
      item xs={9}
      container
    >
      <Grid
        item xs={9}>
        <ThemeProvider theme={theme}>
          <ListingsButtons
            userProfile={props.userProfile}
            loggedInProfile={props.loggedInProfile}
          />
          <Box className='listings'>
            {isListings
            ? listings.map(listing =>
              <Listing listing={listing} />
            )
            : savedListings.map(listing =>
              <Listing listing={listing} />
            )}
            <AddBookToProfileModal />
          </Box>
        </ThemeProvider>

      </Grid>
    </Grid>
    </>
  )
}

export default Listings;