import React, { useEffect, useRef, useState, useContext, useReducer } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore, firebase } from '../../firebase';
import ChatMessage from './ChatMessage';
import MessageInput from './MessageInput';
import ProfileSearch from './ProfileSearch'
import { UserContext } from '../../components/App';
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Box,
  Divider,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Fab,
  getChipUtilityClass,
}
from '@mui/material';
import { ChatContext } from './Messages'

const chatSection = {
  width: '95%',
  height: '80vh'
};
const headBG = {
  backgroundColor: '#e0e0e0',
};
const borderRight500 = {
  borderRight: '1px solid #e0e0e0'
};
const messageArea = {
  height: '70vh',
  overflowY: 'auto',
};

const ChatRoom = () => {

  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('');

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


  //for group chat maybe
  // const sendMessage = async (e) => {
  //   e.preventDefault();

  //   const { uid, photoURL } = auth.currentUser;

  //   await messagesRef.add({
  //     text: formValue,
  //     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //     uid,
  //     photoURL
  //   })

  //   setFormValue('');
  //   dummy.current.scrollIntoView({ behavior: 'smooth' });
  // }

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
                  <ProfileSearch />
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
                    <ListItem key="2">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary="09:31"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="3">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="10:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
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