import React, { useRef, useState } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore, firebase } from '../../firebase'
import ChatRoom from './ChatRoom.jsx'

const Messages = () => {

  return (
    <div className="chat">
      <header>
        <h1>💬 Messages</h1>
      </header>

      <section>
        <ChatRoom />
      </section>

    </div>
  );
}

export default Messages;