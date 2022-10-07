import * as React from "react";

import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Typography, Rating, Box }
  from '@mui/material'
import ConfirmTradeModal from "../modals/ConfirmTradeModal";
import ParkIcon from '@mui/icons-material/Park';
import ParkOutlinedIcon from '@mui/icons-material/ParkOutlined';
import { styled } from '@mui/material/styles';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#058c42',
  }
});

export default function BookCard({ user, book }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            alt="profile-picture"
            src={user.profilePhoto}
          ></Avatar>
        }
        title={book?.volumeInfo.title}
        sx={{ height: 80 }}
        subheader={book?.volumeInfo?.authors ? book.volumeInfo.authors[0] : ""} // Could be date added to App or maybe a published date
      />
      <CardMedia
        component="img"
        height="194"
        src={
          book?.volumeInfo.imageLinks.thumbnail ||
          "https://www.nps.gov/common/uploads/cropped_image/primary/9EB2D49C-F3A5-5C25-C01902867F788B2E.jpg?width=1600&quality=90&mode=crop"
        }
        alt={book?.volumeInfo.title || "book picture"}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {book?.volumeInfo.description.substring(0, 460)+"..."}
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <Typography>{user.name}</Typography>
          <StyledRating
            name="half-rating-read"
            value={(Math.random() * (4.5 - 2.5) + 2.5)}
            precision={0.5}
            icon={<ParkIcon fontSize="inherit"/>}
            emptyIcon={<ParkOutlinedIcon fontSize="inherit"/>}
            readOnly
          />
        </Box>
        {console.log('USER DATA', 0, user)}
        <Box sx={{ flexGrow: 6 }} />
        <ConfirmTradeModal otherUser={user} book={book?.volumeInfo} />
        <Box sx={{ flexGrow: 1 }} />
      </CardActions>
    </Card>
  );
}
