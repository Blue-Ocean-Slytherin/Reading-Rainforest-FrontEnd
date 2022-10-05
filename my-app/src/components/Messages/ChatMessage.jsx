import React, { useRef, useState } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore, firebase } from '../../firebase'

const ChatMessage = (props) => {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://upload.wikimedia.org/wikipedia/en/1/16/Draco_Mal.JPG'} />
      <p>{text}</p>
    </div>
  </>)
}

export default ChatMessage;