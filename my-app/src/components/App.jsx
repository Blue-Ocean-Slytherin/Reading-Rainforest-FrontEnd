import React, { useState, useEffect, createContext, useReducer } from "react";
import axios from 'axios';
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

export const ChatContext = createContext();

function App() {
  const [ user, setUser ] = useState({});
  const [ listOfBooks, setListOfBooks ] = useState([]);

  const INITIAL_STATE = {
    chatID: "null",
    selectedUser: {},
  };

  useEffect(()=>{
    const getUserBookInfo = async () => {
      if (user?.books) {
        let listOfISBNs = user.books;
        let listOfPromises = [];
        listOfISBNs.forEach((book)=>{
          listOfPromises.push(axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book.isbn}`));
        });
        let results = await Promise.all(listOfPromises);
        let bookListData = [];
        results.forEach((result, i)=>{
          bookListData[i] = result.data.items[0].volumeInfo;
        });
        setListOfBooks(bookListData);
      }
    };
    getUserBookInfo();
  }, [user])
  console.log("User Data:", user);
  console.log("User's Books':", listOfBooks);

  let values = {user, setUser, listOfBooks};

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

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          selectedUser: action.payload,
          chatID:
            user.uid > action.payload.uid
              ? user.uid + action.payload.uid
              : action.payload.uid + user.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <div>
    <ThemeProvider theme={theme}>
      {!Object.keys(user).length ? (
        <LogIn setUser={setUser} />
      ) : (
        <UserContext.Provider value={values}>
          <ChatContext.Provider value={{ data:state, dispatch }}>
            <Routes>
              <Route path="/" element={<Layout setUser={setUser} />}>
                <Route index element={<Home />} />
                <Route path="search" element={<Search />} />
                <Route path="messages" element={<Messages />} />
                <Route path="trades" element={<Trades user={user}/>} />
                <Route path="profile" element={<Profile />} />
                <Route path="*" element={<NoPage />} />
              </Route>
            </Routes>
          </ChatContext.Provider>
        </UserContext.Provider>
      )}
    </ThemeProvider>
    </div>
  );

}

export default App;


