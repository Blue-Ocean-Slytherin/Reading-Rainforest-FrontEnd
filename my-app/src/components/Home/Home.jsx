import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import Item from './Item.jsx';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


const Home = () => {
  const {booksNear, setBooksNear} = useState([])
  const {topRated, setTopRated} = useState([])

  var items = [
    {
      profilePic: "https://images.ctfassets.net/usf1vwtuqyxm/6yl7KHNCnoctW5TGrOyNE1/d81e73479f15d2dfeb37dcf56c47b6b0/HP-F6-half-blood-prince-draco-malfoy-looking-concerned-web-landscape?fm=jpg&q=70&w=2560",
      bookTitle: "Harry Potter and the Prince of Slytherin by The Sinister Man",
      date: "December 1, 2019",
      bookCover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1609896187i/31201472.jpg",
      bookDescription: "Harry Potter was Sorted into Slytherin after a crappy childhood. His brother Jim is believed to be the BWL. Think you know this story? Think again. Year Four starts on 9/1/20. ",
      username: "User 1",
      distance: 1,
      rating: 4,
    },
    {
      profilePic: "https://images.ctfassets.net/usf1vwtuqyxm/6yl7KHNCnoctW5TGrOyNE1/d81e73479f15d2dfeb37dcf56c47b6b0/HP-F6-half-blood-prince-draco-malfoy-looking-concerned-web-landscape?fm=jpg&q=70&w=2560",
      bookTitle: "Harry Potter and the Prince of Slytherin by The Sinister Man",
      date: "December 1, 2019",
      bookCover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1609896187i/31201472.jpg",
      bookDescription: "Harry Potter was Sorted into Slytherin after a crappy childhood. His brother Jim is believed to be the BWL. Think you know this story? Think again. Year Four starts on 9/1/20. NO romantic pairings prior to Fourth Year. Basically good Dumbledore and Weasleys. Limited bashing (mainly of James).",
      username: "User 2",
      distance: 2,
      rating: 2,
    },
    {
      profilePic: "https://images.ctfassets.net/usf1vwtuqyxm/6yl7KHNCnoctW5TGrOyNE1/d81e73479f15d2dfeb37dcf56c47b6b0/HP-F6-half-blood-prince-draco-malfoy-looking-concerned-web-landscape?fm=jpg&q=70&w=2560",
      bookTitle: "Harry Potter and the Prince of Slytherin by The Sinister Man",
      date: "December 1, 2019",
      bookCover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1609896187i/31201472.jpg",
      bookDescription: "Harry Potter was Sorted into Slytherin after a crappy childhood. His brother Jim is believed to be the BWL. Think you know this story? Think again. Year Four starts on 9/1/20. NO romantic pairings prior to Fourth Year. Basically good Dumbledore and Weasleys. Limited bashing (mainly of James).",
      username: "User 3",
      distance: 1,
      rating: 2.5,
    },
    {
      profilePic: "https://images.ctfassets.net/usf1vwtuqyxm/6yl7KHNCnoctW5TGrOyNE1/d81e73479f15d2dfeb37dcf56c47b6b0/HP-F6-half-blood-prince-draco-malfoy-looking-concerned-web-landscape?fm=jpg&q=70&w=2560",
      bookTitle: "Harry Potter and the Prince of Slytherin by The Sinister Man",
      date: "December 1, 2019",
      bookCover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1609896187i/31201472.jpg",
      bookDescription: "Harry Potter was Sorted into Slytherin after a crappy childhood. His brother Jim is believed to be the BWL. Think you know this story? Think again. Year Four starts on 9/1/20. ",
      username: "User 4",
      distance: 4,
      rating: 1.7,
    },
    {
      profilePic: "https://images.ctfassets.net/usf1vwtuqyxm/6yl7KHNCnoctW5TGrOyNE1/d81e73479f15d2dfeb37dcf56c47b6b0/HP-F6-half-blood-prince-draco-malfoy-looking-concerned-web-landscape?fm=jpg&q=70&w=2560",
      bookTitle: "Harry Potter and the Prince of Slytherin by The Sinister Man",
      date: "December 1, 2019",
      bookCover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1609896187i/31201472.jpg",
      bookDescription: "Harry Potter was Sorted into Slytherin after a crappy childhood. His brother Jim is believed to be the BWL. Think you know this story? Think again. Year Four starts on 9/1/20. NO romantic pairings prior to Fourth Year. Basically good Dumbledore and Weasleys. Limited bashing (mainly of James).",
      username: "User 5",
      distance: 2,
      rating: 3.6,
    },
    {
      profilePic: "https://images.ctfassets.net/usf1vwtuqyxm/6yl7KHNCnoctW5TGrOyNE1/d81e73479f15d2dfeb37dcf56c47b6b0/HP-F6-half-blood-prince-draco-malfoy-looking-concerned-web-landscape?fm=jpg&q=70&w=2560",
      bookTitle: "Harry Potter and the Prince of Slytherin by The Sinister Man",
      date: "December 1, 2019",
      bookCover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1609896187i/31201472.jpg",
      bookDescription: "Harry Potter was Sorted into Slytherin after a crappy childhood. His brother Jim is believed to be the BWL. Think you know this story? Think again. Year Four starts on 9/1/20. NO romantic pairings prior to Fourth Year. Basically good Dumbledore and Weasleys. Limited bashing (mainly of James).",
      username: "User 6",
      distance: 1,
      rating: 4.7,
    },
    {
      profilePic: "https://images.ctfassets.net/usf1vwtuqyxm/6yl7KHNCnoctW5TGrOyNE1/d81e73479f15d2dfeb37dcf56c47b6b0/HP-F6-half-blood-prince-draco-malfoy-looking-concerned-web-landscape?fm=jpg&q=70&w=2560",
      bookTitle: "Harry Potter and the Prince of Slytherin by The Sinister Man",
      date: "December 1, 2019",
      bookCover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1609896187i/31201472.jpg",
      bookDescription: "Harry Potter was Sorted into Slytherin after a crappy childhood. His brother Jim is believed to be the BWL. Think you know this story? Think again. Year Four starts on 9/1/20. ",
      username: "User 7",
      distance: 3,
      rating: 5,
    },
    {
      profilePic: "https://images.ctfassets.net/usf1vwtuqyxm/6yl7KHNCnoctW5TGrOyNE1/d81e73479f15d2dfeb37dcf56c47b6b0/HP-F6-half-blood-prince-draco-malfoy-looking-concerned-web-landscape?fm=jpg&q=70&w=2560",
      bookTitle: "Harry Potter and the Prince of Slytherin by The Sinister Man",
      date: "December 1, 2019",
      bookCover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1609896187i/31201472.jpg",
      bookDescription: "Harry Potter was Sorted into Slytherin after a crappy childhood. His brother Jim is believed to be the BWL. Think you know this story? Think again. Year Four starts on 9/1/20. NO romantic pairings prior to Fourth Year. Basically good Dumbledore and Weasleys. Limited bashing (mainly of James).",
      username: "User 8",
      distance: 2,
      rating: 2.3,
    },
    {
      profilePic: "https://images.ctfassets.net/usf1vwtuqyxm/6yl7KHNCnoctW5TGrOyNE1/d81e73479f15d2dfeb37dcf56c47b6b0/HP-F6-half-blood-prince-draco-malfoy-looking-concerned-web-landscape?fm=jpg&q=70&w=2560",
      bookTitle: "Harry Potter and the Prince of Slytherin by The Sinister Man",
      date: "December 1, 2019",
      bookCover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1609896187i/31201472.jpg",
      bookDescription: "Harry Potter was Sorted into Slytherin after a crappy childhood. His brother Jim is believed to be the BWL. Think you know this story? Think again. Year Four starts on 9/1/20. NO romantic pairings prior to Fourth Year. Basically good Dumbledore and Weasleys. Limited bashing (mainly of James).",
      username: "User 9",
      distance: 4,
      rating: 3.5,
    },
    {
      profilePic: "https://images.ctfassets.net/usf1vwtuqyxm/6yl7KHNCnoctW5TGrOyNE1/d81e73479f15d2dfeb37dcf56c47b6b0/HP-F6-half-blood-prince-draco-malfoy-looking-concerned-web-landscape?fm=jpg&q=70&w=2560",
      bookTitle: "Harry Potter and the Prince of Slytherin by The Sinister Man",
      date: "December 1, 2019",
      bookCover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1609896187i/31201472.jpg",
      bookDescription: "Harry Potter was Sorted into Slytherin after a crappy childhood. His brother Jim is believed to be the BWL. Think you know this story? Think again. Year Four starts on 9/1/20. NO romantic pairings prior to Fourth Year. Basically good Dumbledore and Weasleys. Limited bashing (mainly of James).",
      username: "User 10",
      distance: 4,
      rating: 4,
    },
    {
      profilePic: "https://images.ctfassets.net/usf1vwtuqyxm/6yl7KHNCnoctW5TGrOyNE1/d81e73479f15d2dfeb37dcf56c47b6b0/HP-F6-half-blood-prince-draco-malfoy-looking-concerned-web-landscape?fm=jpg&q=70&w=2560",
      bookTitle: "Harry Potter and the Prince of Slytherin by The Sinister Man",
      date: "December 1, 2019",
      bookCover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1609896187i/31201472.jpg",
      bookDescription: "Harry Potter was Sorted into Slytherin after a crappy childhood. His brother Jim is believed to be the BWL. Think you know this story? Think again. Year Four starts on 9/1/20. NO romantic pairings prior to Fourth Year. Basically good Dumbledore and Weasleys. Limited bashing (mainly of James).",
      username: "User 11",
      distance: 4,
      rating: 2.9,
    },
    {
      profilePic: "https://images.ctfassets.net/usf1vwtuqyxm/6yl7KHNCnoctW5TGrOyNE1/d81e73479f15d2dfeb37dcf56c47b6b0/HP-F6-half-blood-prince-draco-malfoy-looking-concerned-web-landscape?fm=jpg&q=70&w=2560",
      bookTitle: "Harry Potter and the Prince of Slytherin by The Sinister Man",
      date: "December 1, 2019",
      bookCover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1609896187i/31201472.jpg",
      bookDescription: "Harry Potter was Sorted into Slytherin after a crappy childhood. His brother Jim is believed to be the BWL. Think you know this story? Think again. Year Four starts on 9/1/20. NO romantic pairings prior to Fourth Year. Basically good Dumbledore and Weasleys. Limited bashing (mainly of James).",
      username: "User 12",
      distance: 4,
      rating: 0.5,
    }
  ]

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