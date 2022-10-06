import React, {
  useRef,
  useState,
  createContext,
  useContext,
  useReducer
} from 'react';
import { UserContext } from '../../components/App';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore, firebase } from '../../firebase'
import ChatRoom from './ChatRoom.jsx'

export const ChatContext = createContext({});

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