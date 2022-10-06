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
          <Avatar
            alt="profile-picture"
            src={
              book.profilePhoto ||
              "https://st4.depositphotos.com/1012074/20946/v/450/depositphotos_209469984-stock-illustration-flat-isolated-vector-illustration-icon.jpg"
            }
          ></Avatar>
        }
        title={book.volumeInfo.title}
        subheader={book.volumeInfo.authors[0] || "September 14, 2016"} // Could be date added to App or maybe a published date
      />
      <CardMedia
        component="img"
        height="194"
        src={
          book.volumeInfo.imageLinks.thumbnail ||
          "https://www.nps.gov/common/uploads/cropped_image/primary/9EB2D49C-F3A5-5C25-C01902867F788B2E.jpg?width=1600&quality=90&mode=crop"
        }
        alt={book.volumeInfo.title || "book picture"}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {book.volumeInfo.description}
        </Typography>
      </CardContent>
      <CardActions>
        <ConfirmTradeModal otherUser={user} book={book.volumeInfo} />
        <Container>{user.name}</Container>
      </CardActions>
    </Card>
  );
}
