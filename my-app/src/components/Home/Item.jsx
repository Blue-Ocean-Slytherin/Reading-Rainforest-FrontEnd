import React from 'react';
import { Rating, Box, Card, CardHeader, Avatar, CardMedia, CardContent, Typography, CardActions, Container, Grid }
  from '@mui/material'
import SwapButton from "./Button";
import { styled } from '@mui/material/styles';
import ParkIcon from '@mui/icons-material/Park';
import ParkOutlinedIcon from '@mui/icons-material/ParkOutlined';

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
                  src={curr.profilePic}
                ></Avatar>
              }
              title={curr.bookTitle.length <= 35 ? curr.bookTitle : `${curr.bookTitle.split('').slice(0, 35).join('')}...`}
              subheader={curr.date} // Could be date added to App or maybe a published date
            />
            <CardMedia
              component="img"
              height="194"
              src={curr.bookCover}
              alt="Paella dish"
            />
            <CardContent>
              {curr.bookDescription.length <= 185 ?
                <Typography variant="body2" color="text.secondary">
                  {curr.bookDescription}
                </Typography>
                :
                <Typography variant="body2" color="text.secondary">
                  {curr.bookDescription.split('').slice(0, 185).join('')}...
                </Typography>
              }
            </CardContent>
            <CardActions>
              <Container>
                <Typography>{curr.username}</Typography>
                <StyledRating
                  name="half-rating-read"
                  value={curr.rating}
                  precision={0.5}
                  icon={<ParkIcon fontSize="inherit"/>}
                  emptyIcon={<ParkOutlinedIcon fontSize="inherit"/>}
                  readOnly
                />
              </Container>
              <SwapButton />
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