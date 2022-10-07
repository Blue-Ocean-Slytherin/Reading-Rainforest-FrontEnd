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

import { ChatContext } from '../../components/App';

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
const lastMessage = {
  fontWeight: "lighter",
  fontFamily: "courier",
};

const ChatRoom = () => {

  const [chats, setChats] = useState([])
  const { user: currentUser } = useContext(UserContext)
  const { data, dispatch } = useContext(ChatContext);


  useEffect(()=> {

    if (currentUser.uid) {
      const unsub = onSnapshot(doc(firestore, "userChats", `${currentUser.uid}`), (doc) => {
        setChats(doc.data());
        })
    }

  }, [currentUser.uid])


  const handleSelect = (selectedUser) => {
    dispatch({type:'CHANGE_USER', payload: selectedUser})
  }

  return (<>
    <div>

      <Grid container>
      </Grid>
      <Grid container component={Paper} className='chatSection'>
            <Grid item xs={3} sx={borderRight500}>
                <List>
                  <ListItem
                    button
                    key={`${currentUser.name}`}
                    onClick={()=>handleSelect(currentUser)}>
                      <ListItemIcon>
                      <Avatar
                        alt={`${currentUser.name}`}
                        src={`${currentUser.profilePhoto}`} />
                      </ListItemIcon>
                      <ListItemText primary={`${currentUser.name}`}>
                      </ListItemText>
                  </ListItem>
                </List>
                <Divider />
                  <ProfileSearch />
                <Divider />
                {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
                  <List key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
                  <ListItem button key={`${chat[1].userInfo.displayName}`}>
                      <ListItemIcon>
                        <Avatar alt={`${chat[1].userInfo.displayName}`} src={`${chat[1].userInfo.photoURL}`} />
                      </ListItemIcon>
                      <ListItemText
                primary={`${chat[1].userInfo.displayName}`}
                secondaryTypographyProps={{ component: 'div' }}
                secondary={chat[1].lastMessage?.text === undefined ? '' : `${chat[1].lastMessage?.text}`}/>
                  </ListItem>
              </List>
                ))}
            </Grid>
            <Grid item xs={9}>
              <List className='messageArea' sx={messageArea}>
                <ChatMessage />
              </List>
              <Divider />
              <Grid container style={{padding: '20px'}}>
                  <MessageInput />
              </Grid>
            </Grid>
        </Grid>
    </div>
  </>)
}

export default ChatRoom;