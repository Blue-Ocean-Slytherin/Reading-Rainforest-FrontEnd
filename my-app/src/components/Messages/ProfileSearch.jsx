import React, { useState, useContext, useRef } from 'react';
import {
  Grid,
  TextField,
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemText,
}
from '@mui/material';
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
} from "firebase/firestore";
import { firestore } from '../../firebase';
import { UserContext } from '../../components/App';

const ProfileSearch = ({value}) => {
  //username being searched for
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)
  const { user: currentUser } = useContext(UserContext)
  const textInput = useRef(null)

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
    setUsername("")
    textInput.current.value = "";
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async () => {
    const combinedID =
     currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;

      try {
        const res = await getDoc(doc(firestore, "chats", combinedID));

        if (!res.exists()) {

          await setDoc(doc(firestore, "chats", combinedID), { messages: []});

          await updateDoc(doc(firestore, "userChats", currentUser.uid), {
            [combinedID  + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            [combinedID + ".date"]: serverTimestamp(),
          });

          await updateDoc(doc(firestore, "userChats", user.uid), {
            [combinedID  + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.name,
              photoURL: currentUser.profilePhoto,
            },
            [combinedID + ".date"]: serverTimestamp(),
          });
      } else {
        value.dispatch({type:'CHANGE_USER', payload: user})
      }
      } catch (err) { console.log(err)}

  };

  return (<>
    <Grid item xs={12} style={{padding: '10px'}}>
      <TextField
        id="outlined-basic-email"
        label="Search" variant="outlined"
        fullWidth
        inputRef={textInput}
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