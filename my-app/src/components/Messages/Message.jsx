import React, { useEffect, useRef, useContext } from 'react';

import { UserContext } from '../../components/App';
import { ChatContext } from '../../components/App';

import {
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
}
from '@mui/material';

const Message = ({message}) => {

  const { user: currentUser } = useContext(UserContext)
  const { data } = useContext(ChatContext);

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({behavior: "smooth"})
  }, [message])

  if (currentUser.uid === message.sendID) {
    return (<>
      <ListItem key={message.id} ref={ref}>
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
      <ListItem key={message.id} ref={ref}>
        <Grid container>
          <Grid item xs={12}>
            <ListItemIcon align="left">
              <Avatar alt="left" src={`${data.selectedUser.photoURL}`} />
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