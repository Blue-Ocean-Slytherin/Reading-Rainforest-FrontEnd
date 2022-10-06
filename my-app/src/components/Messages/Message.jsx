import React, { useEffect, useRef, useState, useContext, useReducer } from 'react';

import ChatMessage from './ChatMessage';
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

const Message = ({message, value}) => {

  const { user: currentUser } = useContext(UserContext)

  if (currentUser.uid === message.sendID) {
    return (<>
      <ListItem key={message.id}>
        <Grid container>
          <Grid item xs={12}>
            <ListItemText align="right" primary={`${message.text}`}></ListItemText>
          </Grid>
          <Grid item xs={12}>
            <ListItemText align="right" secondary={`${message.date.toDate().toLocaleTimeString('en-US')}`}></ListItemText>
          </Grid>
        </Grid>
      </ListItem>
    </>)
  } else {
    return (<>
      <ListItem key={message.id}>
        <Grid container>
          <Grid item xs={12}>
            <ListItemIcon align="left">
              <Avatar alt="left" src={`${value.data.user.photoURL}`} />
            </ListItemIcon>
            <ListItemText align="left" primary={`${message.text}`}></ListItemText>
          </Grid>
          <Grid item xs={12}>
            <ListItemText align="left" secondary={`${message.date.toDate().toLocaleTimeString('en-US')}`}></ListItemText>
          </Grid>
        </Grid>
      </ListItem>
    </>)
  }

}

export default Message;