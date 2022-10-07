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
          <Card key={i} sx={{ maxWidth: 345, height: 447 }} >
            <CardHeader
              avatar={
                <Avatar
                  alt="profile-pic"
                  src={curr.profilePhoto}
                ></Avatar>
              }
              title={curr.books.title}
              sx={{ height: 50, overflow: 'hidden' }}
            />
            <CardMedia
              component="img"
              height="190"
              src={curr.books.imageLinks.thumbnail}
              alt="Paella dish"
            />
            <CardContent sx={{
              height: 70,
              overflow: 'hidden scroll'
            }}>
              <Typography variant="body2" color="text.secondary" >
                {curr.books.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Box sx={{ flexGrow: 1 }} />
              <Box>
                <Typography>{curr.name}</Typography>
                <StyledRating
                  name="half-rating-read"
                  value={curr.averageRating}
                  // value={(Math.random() * (5 - .5) + .5)}
                  precision={0.5}
                  icon={<ParkIcon fontSize="inherit"/>}
                  emptyIcon={<ParkOutlinedIcon fontSize="inherit"/>}
                  readOnly
                />
              </Box>
              <Box sx={{ flexGrow: 6 }} />
                <ConfirmTradeModal otherUser={curr} book={curr.books}/>
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