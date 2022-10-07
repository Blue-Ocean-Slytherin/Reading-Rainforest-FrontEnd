import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

import React, { useState, useContext } from "react";
import { UserContext } from '../App.jsx';
import { ChatContext } from "../App.jsx";
import { useNavigate } from "react-router-dom";
import { firestore } from '../../firebase';

export default function MessageModal({  selectedUser }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const handleMessageUser = async (selectedUser) => {

    const [user, setUser] = useState(null)
    const { user: currentUser } = useContext(UserContext)
    const { dispatch } = useContext(ChatContext);
    const navigate = useNavigate();

      const q = query(
        collection(firestore, 'users'),
        where('displayName', '==', selectedUser)
      );

      try{
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data())}
      )}
      catch(error) {
        console.log(error)
      }

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
        dispatch({type:'CHANGE_USER', payload: user})
      }
      } catch (err) { console.log(err)}
    navigate("/messages")

  return (
    <div>
      <Button variant="contained" color="mintGreen" onClick={handleOpen} endIcon={<SwapHorizIcon />} >
        Message
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
      </Modal>
    </div>
  );
};