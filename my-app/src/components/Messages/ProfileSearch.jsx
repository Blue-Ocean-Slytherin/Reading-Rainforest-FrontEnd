import React, { useRef, useState, useContext } from 'react';
import {
  Grid,
  TextField,
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemText,
}
from '@mui/material';
import { getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, firestore, firebase } from '../../firebase';
import { collection, query, where } from 'firebase/firestore';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { UserContext } from '../../components/App';
import { Dns } from '@material-ui/icons';

const ProfileSearch = () => {
  //username being searched for
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)
  const { user: currentUser } = useContext(UserContext)

  const handleSearch = async () => {
    const q = query(
      collection(firestore, 'users'),
      where('displayName', '==', username)
    );

    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())}
    )}
    catch(error) {
      console.log(error)
      setError(true)
    }
    console.log('search has been pressed')
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async () => {
    const combinedID =
     currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;
    console.log('combined', combinedID)

      try {
        const res = await getDoc(doc(firestore, "chats", combinedID));

        console.log('res', res)
        if (!res.exists()) {
          await setDoc(doc, (firestore, "chats", combinedID), { messages: []});

          await updateDoc(doc(firestore, 'userChats', currentUser.uid), {
            [combinedID  + '.userInfo']: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL
            },
            [combinedID + '.date']: serverTimestamp()
          });

          await updateDoc(doc(firestore, 'userChats', user.uid), {
            [combinedID  + '.userInfo']: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL
            },
            [combinedID + '.date']: serverTimestamp()
          });
      }
      } catch (err) {}

  };


  return (<>
    <Grid item xs={12} style={{padding: '10px'}}>
      <TextField
        id="outlined-basic-email"
        label="Search" variant="outlined"
        fullWidth
        onChange={e => {
          const { value } = e.target
          setUsername(value)}}
        onKeyDown={handleKey}/>
    </Grid>
    {error &&
      <ListItem button key="User Not Found">
        <ListItemText primary="User Not Found">User Not Found</ListItemText>
      </ListItem>
    }
    {user &&
      <ListItem button key={`${user.displayName}`} onClick={handleSelect}>
        <ListItemIcon>
          <Avatar alt={`${user.displayName}`} src={`${user.photoURL}`} />
        </ListItemIcon>
        <ListItemText primary={`${user.displayName}`}>{user.displayName}</ListItemText>
        <ListItemText secondary="online" align="right"></ListItemText>
      </ListItem>
    }
  </>)
}

export default ProfileSearch;