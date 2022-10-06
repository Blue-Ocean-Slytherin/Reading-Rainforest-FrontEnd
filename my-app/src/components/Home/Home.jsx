import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import Item from './Item.jsx';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import { items } from './HomeTempData.jsx'
import axios from 'axios';
const API_URL = 'http://localhost:3002'


const Home = () => {
  const [booksNear, setBooksNear] = useState([]);
  const [usersNear, setUsersNear] = useState([]);
  const [topRated, setTopRated] = useState([]);


  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);


  useEffect(() => {
    axios.get(`${API_URL}/user/users`)
      .then((res) => {
        setUsers(res.data)
        console.log(res.data.length)

        const booksArrayData = [];

        res.data.forEach((curr, i) => {
          axios.get(`https://www.googleapis.com/books/v1/volumes?q=${curr.books[0]}`)
            .then((bookData) => {
              // console.log("++", bookData.data.items[0].volumeInfo)
              booksArrayData.push(bookData.data.items[0].volumeInfo)
              // setBooks(booksArrayData)
            })
            .then(() => {
              if (res.data.length === booksArrayData.length) {
                setBooks(booksArrayData)
              }
            })
            .catch((err) => console.log('GETTING BOOKS ERROR'))
        })
      })
      .catch((err) => console.log('HOME SCREEN ERROR', err))
  }, []);


  const usersData = users.slice(0, 9)
  const booksData = books.slice(0, 9)

  const recData = []

  if (booksData.length !== 0) {
    for (var p = 0; p < usersData.length; p += 3) {
      usersData[p].books = booksData[p]
      usersData[p+1].books = booksData[p+1]
      usersData[p+2].books = booksData[p+2]
      recData.push([usersData[p], usersData[p+1], usersData[p+2]])
    }
    // console.log('CURRENT', booksData[p])
    console.log('ALL DATA', recData)
  }

  console.log('USER DATA', usersData)
  console.log('BOOKS DATA', booksData)




  // const nearArr = []
  // for (var i = 0; i < items.length; i += 3) {
  //   nearArr.push([items[i], items[i+1], items[i+2]])
  // }

  // const topArr = []
  // for (var j = 0; j < items.length; j += 3) {
  //   topArr.push([items[j+2], items[j+1], items[j]])
  // }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      style={{ minHeight: '50vh' }}
    >
      <Typography mt={5} mb={2} variant="h4">Recommeded For You</Typography>
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
            {recData.length >= 1 &&
              recData.map((arr, i) =>
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
            {recData.length >= 1 &&
              recData.map((arr, i) => {
                return (
                  <Item
                    key={i}
                    array={arr}
                  />
                )
              }
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