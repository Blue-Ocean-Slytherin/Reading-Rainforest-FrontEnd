import React, { useEffect, useState, useContext } from 'react';

import Message from './Message'
import { ChatContext } from '../../components/App';
import { firestore } from '../../firebase'
import {
  doc,
  onSnapshot,
} from "firebase/firestore";

const ChatMessage = () => {

  const [messages, setMessages] = useState([])
  const { data } = useContext(ChatContext);

  useEffect(()=> {
    if (data.chatID) {
        onSnapshot(doc(firestore, 'chats', data.chatID), (doc) => {
        doc.exists() && setMessages(doc.data().messages)
      })
    }
  }, [data.chatID])

    return (<>
      {messages.map((message) => (
        <Message key={message.id} message={message}/>
      ))}
    </>)

}

export default ChatMessage;