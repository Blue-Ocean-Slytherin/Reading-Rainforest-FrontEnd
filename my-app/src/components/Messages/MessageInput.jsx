import { useState, useContext, useRef } from "react"
import { UserContext } from '../../components/App';
import {
  Grid,
  TextField,
  Fab,
}
from '@mui/material';
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, firestore, firebase } from '../../firebase';
import { v4 as uuid } from "uuid";

const MessageInput = ({value}) => {
  const [text, setText] = useState('')
  const textInput = useRef(null)
  const { user: currentUser } = useContext(UserContext)

  const handleSend = async () => {

    if (text.length > 0) {
      await updateDoc(doc(firestore, "chats", value.data.chatID), {
        messages: arrayUnion({
          id: uuid(),
          text,
          sendID: currentUser.uid,
          date: Timestamp.now(),
        })
      });

      await updateDoc(doc(firestore, "userChats", currentUser.uid), {
        [value.data.chatID + ".lastMessage"]: {
          text,
        },
        [value.data.chatID + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(firestore, "userChats", value.data.user.uid), {
        [value.data.chatID + ".lastMessage"]: {
          text,
        },
        [value.data.chatID + ".date"]: serverTimestamp(),
      });
  }

  setText("")
  textInput.current.value = "";

  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  }

  return (
    <>
      <Grid item xs={11}>
        <TextField
          id="outlined-basic-email"
          label="Type Something"
          fullWidth
          required
          onChange={e => {
            const { value } = e.target
            setText(value)}}
          onKeyDown={handleKey}
          inputRef={textInput}
          />
      </Grid>
      <Grid xs={1} align="right">
          <Fab color="primary" aria-label="add" onClick={handleSend}>🕊️</Fab>
      </Grid>
    </>
  )
}

export default MessageInput;