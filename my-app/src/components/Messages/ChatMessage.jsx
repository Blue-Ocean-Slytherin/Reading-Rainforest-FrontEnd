import React, { useEffect, useRef, useState, useContext, useReducer } from 'react';

import Message from './Message'
import { UserContext } from '../../components/App';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore, firebase } from '../../firebase'
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

const ChatMessage = ({value}) => {
  // const { text, uid, photoURL } = props.message;

  // const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  const { user: currentUser } = useContext(UserContext)
  const [messages, setMessages] = useState([])

  useEffect(()=> {
    if (value.data.chatID) {
      const unSub = onSnapshot(doc(firestore, 'chats', value.data.chatID), (doc) => {
        doc.exists() && setMessages(doc.data().messages)
      })
    }
  }, [value.data.chatID])

    return (<>
      {messages.map((message) => (
        <Message key={message.id} message={message} value={value}/>
      ))}
    </>)

}

export default ChatMessage;