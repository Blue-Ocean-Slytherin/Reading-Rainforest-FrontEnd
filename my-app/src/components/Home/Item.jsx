import React from 'react';
import { Rating, Box, Card, CardHeader, Avatar, CardMedia, CardContent, Typography, CardActions, Grid }
  from '@mui/material'
// import SwapButton from "./Button";
import { styled } from '@mui/material/styles';
import ParkIcon from '@mui/icons-material/Park';
import ParkOutlinedIcon from '@mui/icons-material/ParkOutlined';
import ConfirmTradeModal from '../modals/ConfirmTradeModal.jsx';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    // color: '#ffcf9c',
    color: '#058c42',
  }
});


function Item( { array } ){
  return(
    <div>
      <Grid container spacing={0}>
      <Box sx={{ display: { xs: 'inline', md: 'flex'}, width: 1200,
      height: 450,  justifyContent: 'center' }}>
        {array.map((curr, i) =>
          <Grid item m={1.6} key={i}>
          <Card key={i} sx={{ maxWidth: 345 }} >
            <CardHeader
              avatar={
                <Avatar
                  alt="profile-pic"
                  src={curr.profilePhoto}
                ></Avatar>
              }
              title={curr.books.title.length <= 35 ? curr.books.title : `${curr.books.title.split('').slice(0, 35).join('')}...`}
              subheader={curr.date} /// Could be date added to App or maybe a published date
            />
            <CardMedia
              component="img"
              height="194"
              src={curr.books.imageLinks.thumbnail}
              alt="Paella dish"
            />
            <CardContent>
              {curr.books.description.length <= 185 ?
                <Typography variant="body2" color="text.secondary">
                  {curr.books.description}
                </Typography>
                :
                <Typography variant="body2" color="text.secondary">
                  {curr.books.description.split('').slice(0, 185).join('')}...
                </Typography>
              }
            </CardContent>
            <CardActions>
              <Box sx={{ flexGrow: 1 }} />
              <Box>
                <Typography>{curr.name}</Typography>
                <StyledRating
                  name="half-rating-read"
                  value={(Math.random() * (5 - .5) + .5)}
                  precision={0.5}
                  icon={<ParkIcon fontSize="inherit"/>}
                  emptyIcon={<ParkOutlinedIcon fontSize="inherit"/>}
                  readOnly
                />
              </Box>
              <Box sx={{ flexGrow: 6 }} />
              {/* <SwapButton /> */}
              <ConfirmTradeModal
                userName={`Keanu`}
                userPic={`https://i.guim.co.uk/img/media/20b1ed84a85590f6ef2ef8ec4e083ededcbcb75a/445_367_3662_4578/master/3662.jpg?width=465&quality=85&dpr=1&s=none`}
                bookName={`Diary of a Wimpy Kid`}
                bookPic={`https://i5.walmartimages.com/asr/9efeae83-b2d6-4b16-8928-7fd44246e7dd.7fc25a4ca7f2ef37c9a307d8e5dc2291.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF`}
              />
              <Box sx={{ flexGrow: 1 }} />
            </CardActions>
          </Card>
          </Grid>
        )}
      </Box>
      </Grid>
    </div>
  )
}

export default Item;

/*
    <Box
    sx={{ display: { xs: 'inline', md: 'flex'}, width: 1200,
    height: 450, alignItems: 'center', justifyContent: 'center'}}
  >

      <Box sx={{ flexGrow: 1 }} />
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar
              alt="profile-pic"
              src={profilePic}
            ></Avatar>
          }
          title={bookTitle.length <= 35 ? bookTitle : `${bookTitle.split('').slice(0, 35).join('')}...`}
          subheader={date} // Could be date added to App or maybe a published date
        />
        <CardMedia
          component="img"
          height="194"
          src={bookCover}
          alt="Paella dish"
        />
        <CardContent>

          {bookDescription.length <= 185 ?
            <Typography variant="body2" color="text.secondary">
              {bookDescription}
            </Typography>
            :
            <Typography variant="body2" color="text.secondary">
              {bookDescription.split('').slice(0, 185).join('')}...
            </Typography>
          }

        </CardContent>
        <CardActions>
          <Container>{username}</Container>
          <SwapButton />
        </CardActions>
      </Card> */