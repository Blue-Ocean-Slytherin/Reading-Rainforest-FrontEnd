import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import SwapButton from "./Button";

export default function BookCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            alt="profile-pic"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsb_V_Ha4XAl47doWf_2lF-actuld60ssYew&usqp=CAU"
          ></Avatar>
        }
        title="The Alchemist"
        subheader="September 14, 2016" // Could be date added to App or maybe a published date
      />
      <CardMedia
        component="img"
        height="194"
        src="https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          The Alchemist is a novel by Brazilian author Paulo Coelho which was
          first published in 1988. Originally written in Portuguese, it became a
          widely translated international bestseller.
        </Typography>
      </CardContent>
      <CardActions>
        <SwapButton />
        <Container>David Garcia</Container>
      </CardActions>
    </Card>
  );
}
