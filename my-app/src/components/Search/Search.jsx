import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import BookCard from "./Card";
import AddBookToProfileModal from "../modals/listingToProfile";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const [ISBNArray, setISBNArray] = React.useState([]);
  const location = useLocation();
  const { searchInput } = location.state;
  console.log("The search input:", searchInput);
  React.useEffect(() => {
    if (searchInput.length > 0) {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`)
        .then((response) => {
          var onlyISBN = [];
          response.data.items.forEach((isbn) => {
            onlyISBN.push(isbn.volumeInfo.industryIdentifiers[0].identifier);
            onlyISBN.push(isbn.volumeInfo.industryIdentifiers[1].identifier);
          });
          console.log("bookISBN:", onlyISBN);
          setISBNArray(...onlyISBN);
        })
        .catch((error) => console.log(error));
    }
  }, [searchInput]);
  return (
    <React.Fragment>
      <AddBookToProfileModal />
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(9)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <BookCard />
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Search;
