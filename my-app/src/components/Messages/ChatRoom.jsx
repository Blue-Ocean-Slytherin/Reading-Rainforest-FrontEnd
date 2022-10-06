import React, { useEffect, useState, useContext, useReducer } from 'react';

import { firestore } from '../../firebase';
import ChatMessage from './ChatMessage';
import MessageInput from './MessageInput';
import ProfileSearch from './ProfileSearch'
import { UserContext } from '../../components/App';
import {
  doc,
  onSnapshot,
} from "firebase/firestore";

import {
  Grid,
  Paper,
  Box,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
}
from '@mui/material';

// const chatSection = {
//   width: '95%',
//   height: '80vh'
// };
// const headBG = {
//   backgroundColor: '#e0e0e0',
// };
const borderRight500 = {
  borderRight: '1px solid #e0e0e0'
};
const messageArea = {
  height: '70vh',
  overflowY: 'auto',
};

const ChatRoom = () => {

  const [chats, setChats] = useState([])
  const { user: currentUser } = useContext(UserContext)

  const INITIAL_STATE = {
    chatID: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatID:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  useEffect(()=> {

    if (currentUser.uid) {
      const unsub = onSnapshot(doc(firestore, "userChats", `${currentUser.uid}`), (doc) => {
        setChats(doc.data());
        })
    }

  }, [currentUser.uid])


  const handleSelect = (user) => {
    dispatch({type:'CHANGE_USER', payload: user})
  }


  return (<>
    <div>

      <Grid container>
        <Grid item xs={12} >
          <Typography variant="h5">Chat</Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className='chatSection'>
            <Grid item xs={3} sx={borderRight500}>
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="John Wick"></ListItemText>
                    </ListItem>
                </List>
                <Divider />
                  <ProfileSearch value={{data: state, dispatch}}/>
                <Divider />
                {chats && Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
                  <List key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
                  <ListItem button key={`${chat[1].userInfo.displayName}`}>
                      <ListItemIcon>
                          <Avatar alt={`${chat[1].userInfo.displayName}`} src={`${chat[1].userInfo.photoURL}`} />
                      </ListItemIcon>
                      <ListItemText primary={`${chat[1].userInfo.displayName}`}>{`${chat[1].userInfo.displayName}`}</ListItemText>
                  </ListItem>
              </List>
                ))}
            </Grid>
            <Grid item xs={9}>
              <List className='messageArea' sx={messageArea}>
                <ChatMessage value={{data: state, dispatch}}/>
              </List>
              <Divider />
              <Grid container style={{padding: '20px'}}>
                  <MessageInput value={{data: state, dispatch}}/>
              </Grid>
            </Grid>
        </Grid>
    </div>
  </>)
}

export default ChatRoom;