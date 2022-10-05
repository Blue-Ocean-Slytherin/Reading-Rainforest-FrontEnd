import * as React from "react";
import axios from 'axios';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { UserContext } from '../App';

const theme = createTheme({
  palette: {
    spanishGreen: {
      main: "#058c42",
    },
    deepChampagne: {
      main: "#ffcf9c",
    },
    mintGreen: {
      main: "#9cfc97",
    },
    columbiaBlue: {
      main: "#bbdef0",
    },
    raisinBlack: {
      main: "231f20",
    },
  },
});

export default function BookCard({ onClose, data }) {
  const { user, setUser } = React.useContext(UserContext);

  let addBookToList = async () => {
    let URI = process.env.REACT_APP_BE_URI;
    const ISBN = data.volumeInfo.industryIdentifiers[0].identifier;
    const uid = user.uid;
    let updatedUser = await axios.patch(`${URI}/user/${uid}/book/${ISBN}`);
    updatedUser = updatedUser.data;
    setUser(updatedUser);
  };

  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        src={data.volumeInfo.imageLinks.thumbnail}
        alt={data.volumeInfo.title}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {data.volumeInfo.title}
            <ThemeProvider theme={theme}>
              <IconButton
                color="spanishGreen"
                sx={{ p: "10px" }}
                onClick={addBookToList}
              >
                <PostAddIcon />
              </IconButton>
            </ThemeProvider>
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Book by {data.volumeInfo.authors}
          </Typography>
          <Typography variant="body2" color="text.main">
            {data.volumeInfo.description && data.volumeInfo.description.length > 400
              ? data.volumeInfo.description.substring(0, 400) + "..."
              : data.volumeInfo.description}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
