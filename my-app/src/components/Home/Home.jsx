import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import Item from './Item.jsx';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import { items } from './HomeTempData.jsx'
import axios from 'axios';


const Home = () => {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [renderItem, setRenderItem] = useState(false);


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BE_URI}/home/users`)
      .then((res) => {
        const booksArrayData = [];

        res.data.forEach((curr, i) => {
          axios.get(`https://www.googleapis.com/books/v1/volumes?q=${curr.books[0].isbn}`)
            .then((bookData) => {
              booksArrayData.push(bookData.data.items[0].volumeInfo)
              if (res.data.length === booksArrayData.length) {
                setBooks(booksArrayData)
                setUsers(res.data)
                setRenderItem(true)
              }
            })
            .catch((err) => console.log('GETTING BOOKS ERROR'))
        })
      })
      .catch((err) => console.log('HOME SCREEN ERROR', err))
  }, []);


  const usersData = users.slice(0, 9)
  const booksData = books.slice(0, 9)

  let recData = []

  if (renderItem) {
    for (var p = 0; p < usersData.length; p += 3) {
      usersData[p].books = booksData[p]
      usersData[p+1].books = booksData[p+1]
      usersData[p+2].books = booksData[p+2]
      recData.push([usersData[p], usersData[p+1], usersData[p+2]])
    }
  }


  const topUsersData = users.slice(9, 18)
  const topBooksData = books.slice(9, 18)

  const topData = []

  if (renderItem) {
    for (var i = 0; i < topUsersData.length; i += 3) {
      topUsersData[i].books = topBooksData[i]
      topUsersData[i+1].books = topBooksData[i+1]
      topUsersData[i+2].books = topBooksData[i+2]
      topData.push([topUsersData[i], topUsersData[i+1], topUsersData[i+2]])
    }
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      style={{ minHeight: '50vh' }}
    >
      <Typography mt={5} mb={2} variant="h4">Recommended For You</Typography>
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
            {renderItem &&
              recData.map((arr, i) =>
                <Item
                  key={i}
                  array={arr}
                />
              )
            }
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
            {renderItem &&
              topData.map((arr, i) =>
                <Item
                  key={i}
                  array={arr}
                />
              )
            }
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