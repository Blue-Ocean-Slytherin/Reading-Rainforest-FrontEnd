import React, { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Home/Home";
import Search from "./Search/Search";
import Messages from "./Messages/Messages";
import Trades from "./Trades/Trades";
import Profile from "./Profile/Profile";
import NoPage from "./NoPage/NoPage";
import LogIn from "./LogIn.jsx";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import '../styles/styles.css';

export const UserContext = createContext({
  user: {},
});

function App() {
  const [user, setUser] = useState({});
  console.log("User Data:", user);

  let values = {user};

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


  return (
    <div>
    <ThemeProvider theme={theme}>
      {!Object.keys(user).length ? (
        <LogIn setUser={setUser} />
      ) : (
        <UserContext.Provider value={values}>
          <Routes>
            <Route path="/" element={<Layout setUser={setUser} />}>
              <Route index element={<Home />} />
              <Route path="search" element={<Search />} />
              <Route path="messages" element={<Messages />} />
              <Route path="trades" element={<Trades />} />
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </UserContext.Provider>
      )}
    </ThemeProvider>
    </div>
  );

  // :
  // return (
  //   <Routes>
  //     <Route path="/" element={<Layout />}>
  //       <Route index element={<Home />} />
  //       <Route path="search" element={<Search />} />
  //       <Route path="messages" element={<Messages />} />
  //       <Route path="trades" element={<Trades />} />
  //       <Route path="profile" element={<Profile />} />
  //       <Route path="*" element={<NoPage />} />
  //     </Route>
  //   </Routes>
  // );
}

export default App;

// return (
//   <div className="App">
//     <div>Home Page</div>
//     <div>Search</div>
//     <div>Profile</div>
//     <div>Trades</div>
//     <div>Messages</div>
//   </div>
// );
// eslint-disable-next-line
{
  /* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */
}

// import logo from './logo.svg';
// import './App.css';
