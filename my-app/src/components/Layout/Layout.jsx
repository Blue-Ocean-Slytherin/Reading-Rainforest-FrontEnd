import { Outlet, Link } from "react-router-dom";
import React, { useState } from "react";
import { firebase_auth } from "../LogIn";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
// import Typography from '@mui/material/Typography';
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    // variant: 'outlined',
    [theme.breakpoints.up("sm")]: {
      width: "40ch",
      "&:focus": {
        width: "55ch",
      },
    },
  },
}));

const Layout = ({ setUser }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let handleSignOut = async (e) => {
    await firebase_auth.signOut().then(() => {
      setUser({});
    });
    // document.getElementById('signInDiv').hidden = false;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" style={{ background: "#058C42" }}>
        <Toolbar>
          <Button>
            <nav>
              <Link
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "1.5em",
                }}
                to="/"
              >
                Reading RainForest
              </Link>
            </nav>
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />

            <Button color="inherit" sx={{ flexGrow: 1 }}>
              <nav>
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to="/search"
                  state={{ searchInput }}
                >
                  Search
                </Link>
              </nav>
            </Button>
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "inline", md: "flex" } }}>
            <Grid
              justify="space-between"
              alignItems="center"
              container
              spacing={5}
            >
              <Grid item>
                <Button color="inherit">
                  <Badge badgeContent={29} color="error">
                    <nav>
                      <Link
                        style={{ color: "white", textDecoration: "none" }}
                        to="/messages"
                      >
                        Messages
                      </Link>
                    </nav>
                  </Badge>
                </Button>
              </Grid>

              <Grid item>
                <Button color="inherit">
                  <Badge badgeContent={12} color="error">
                    <nav>
                      <Link
                        style={{ color: "white", textDecoration: "none" }}
                        to="/trades"
                      >
                        Trades
                      </Link>
                    </nav>
                  </Badge>
                </Button>
              </Grid>

              <Grid item>
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    sx={{ mt: "35px" }}
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>
                      <nav>
                        <Link
                          style={{ color: "black", textDecoration: "none" }}
                          to="/profile"
                        >
                          Profile
                        </Link>
                      </nav>
                    </MenuItem>
                    <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                  </Menu>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};

export default Layout;

/*---------------------------------------------------------------------------------------------*/

// <>
//   <nav>
//     <ul>
//       <li>
//         <Link to="/">Reading RainForest</Link>
//       </li>
//       <li>
//         <Link to="/search">Search</Link>
//       </li>
//       <li>
//         <Link to="/messages">Messages</Link>
//       </li>
//       <li>
//         <Link to="/trades">Trades</Link>
//       </li>
//       <li>
//         <Link to="/profile">Profile</Link>
//       </li>
//     </ul>
//     <button className='signOutBtn' onClick={handleSignOut} > Sign Out </button>
//   </nav>
//   <Outlet />
// </>
