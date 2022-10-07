import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BookCard from "./Card";
import { useLocation } from "react-router-dom";
import axios from "axios";
import DescriptionAlerts from "./Alert";

const Search = () => {
  const [booksData, setBooksData] = React.useState({});
  const location = useLocation();
  const { searchInput } = location.state;
  // console.log("The search input:", searchInput);
  React.useEffect(() => {
    if (searchInput.length !== "") {
      console.log("UseEffect Search Input:", searchInput);
      axios
        .get(`http://localhost:3002/search/books/${searchInput}`)
        .then((response) => {
          console.log("response:", response.data);
          if (response.data === undefined) {
            setBooksData({});
          } else {
            setBooksData(response.data);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [searchInput]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="lg"
      >
        {booksData.userData ? (
          <Box
            sx={{ backgroundColor: '#BBDEF0', borderRadius: '20px' }}
            mt={5}
            mb={5}
            p={2}
          >
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {booksData.userData.map((data, index) => {
                return (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <BookCard user={data} book={booksData.bookData[index]} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        ) : (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <DescriptionAlerts />
          </Grid>
        )}
      </Container>
    </React.Fragment>
  );
};

export default Search;
