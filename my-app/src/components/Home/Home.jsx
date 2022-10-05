import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import Item from './Item.jsx';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { items } from './HomeTempData.jsx'
import axios from 'axios';
const API_URL = 'http://localhost:3001'


const Home = () => {
  const {booksNear, setBooksNear} = useState([])
  const {topRated, setTopRated} = useState([])

  useEffect(() => {
    axios.get(`${API_URL}/user/users`)
      .then((data) => {
        console.log('THIS IS THE DATA', data)
      })
      .catch((err) => console.log('HOME SCREEN ERROR', err))
  }, [])

  const nearArr = []
  for (var i = 0; i < items.length; i += 3) {
    nearArr.push([items[i], items[i+1], items[i+2]])
  }

  const topArr = []
  for (var j = 0; j < items.length; j += 3) {
    topArr.push([items[j], items[j+1], items[j+2]])
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      style={{ minHeight: '50vh' }}
    >
      <Typography mt={5} mb={2} variant="h4">Books Near You</Typography>
      <Box
        sx={{
          width: 1200,
          height: 473,
          backgroundColor: '#BBDEF0',
          borderRadius: '20px'
        }}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          // justifyContent="center"
          style={{ minHeight: '69.5vh' }}
        >
          <Carousel
            animation="slide"
            autoPlay={false}
            navButtonsAlwaysVisible={true}
            duration={800}
            height={500}
            position="sticky"
            indicatorIconButtonProps={{
              style: {
                  padding: '5px',    // 1
                  color: 'grey'       // 3
              }
            }}
            activeIndicatorIconButtonProps={{
              style: {
                  backgroundColor: '#bbdef0' // 2
              }
            }}
            indicatorContainerProps={{
              style: {
                  marginTop: '-20px', // 5
                  textAlign: 'center' // 4
              }
            }}
          >
            {nearArr.length >= 1 &&
              nearArr.map((arr, i) =>
              <Item
                key={i}
                array={arr}
              />
            )}
          </Carousel>
        </Grid>
      </Box>
      <Typography mt={8} mb={2} variant="h4">From Our Rated Traders</Typography>
      <Box
        sx={{
          width: 1200,
          height: 473,
          backgroundColor: '#BBDEF0',
          borderRadius: '20px'
        }}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          // justifyContent="center"
          style={{ minHeight: '69.5vh' }}
        >
          <Carousel
            animation="slide"
            autoPlay={false}
            navButtonsAlwaysVisible={true}
            duration={800}
            height={500}
            position="sticky"
            indicatorIconButtonProps={{
              style: {
                  padding: '5px',    // 1
                  color: 'grey'       // 3
              }
            }}
            activeIndicatorIconButtonProps={{
              style: {
                  backgroundColor: '#bbdef0' // 2
              }
            }}
            indicatorContainerProps={{
              style: {
                  marginTop: '-20px', // 5
                  textAlign: 'center' // 4
              }
            }}
          >
            {topArr.length >= 1 &&
              topArr.map((arr, i) =>
              <Item
                key={i}
                array={arr}
              />
            )}
          </Carousel>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Home;
            /* {items.map((item, i) =>
              <Item
                key={i}
                profilePic={item.profilePic}
                bookTitle={item.bookTitle}
                date={item.date}
                bookCover={item.bookCover}
                bookDescription={item.bookDescription}
                username={item.username}
              />
            )} */