import * as React from "react";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ConfirmTradeModal from "../modals/ConfirmTradeModal";

export default function BookCard({ user, book }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar alt="profile-picture" src={book.profilePhoto || ""}></Avatar>
        }
        title={book.volumeInfo.title}
        subheader={book.volumeInfo.authors[0] || "September 14, 2016"} // Could be date added to App or maybe a published date
      />
      <CardMedia
        component="img"
        height="194"
        src={
          book.volumeInfo.imageLinks.smallThumbnail ||
          "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg"
        }
        alt={book.volumeInfo.title || "book picture"}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {book.volumeInfo.description}
        </Typography>
      </CardContent>
      <CardActions>
        <ConfirmTradeModal
          userName={`David Garcia`}
          userPic={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsb_V_Ha4XAl47doWf_2lF-actuld60ssYew&usqp=CAU`}
          bookName={`The Alchemist`}
          bookPic={`https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg`}
        />
        <Container>David Garcia</Container>
      </CardActions>
    </Card>
  );
}
