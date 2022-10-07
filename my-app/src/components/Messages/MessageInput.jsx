import { useState, useContext, useRef } from "react"
import { UserContext } from '../../components/App';
import SendIcon from '@mui/icons-material/Send';
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
import { ChatContext } from '../../components/App';

const MessageInput = () => {
  const [text, setText] = useState('')
  const textInput = useRef(null)
  const { user: currentUser } = useContext(UserContext)
  const { data, dispatch } = useContext(ChatContext);

  const handleSend = async () => {

    if (text.length > 0) {
      await updateDoc(doc(firestore, "chats", data.chatID), {
        messages: arrayUnion({
          id: uuid(),
          text,
          sendID: currentUser.uid,
          date: Timestamp.now(),
        })
      });

      await updateDoc(doc(firestore, "userChats", currentUser.uid), {
        [data.chatID + ".lastMessage"]: {
          text,
        },
        [data.chatID + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(firestore, "userChats", data.selectedUser.uid), {
        [data.chatID + ".lastMessage"]: {
          text,
        },
        [data.chatID + ".date"]: serverTimestamp(),
      });
  }

  setText("")
  textInput.current.value = "";

  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  }

  const userMessage = data.selectedUser.displayName || ''

  return (
    <>
      <Grid item xs={11}>
        <TextField
          id="outlined-basic-email"
          label={`Message ${userMessage}`}
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
          <Fab color="primary" aria-label="add" onClick={handleSend}><SendIcon /></Fab>
      </Grid>
    </>
  )
}

export default MessageInput;