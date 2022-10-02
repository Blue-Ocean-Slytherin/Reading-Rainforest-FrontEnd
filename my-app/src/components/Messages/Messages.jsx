import React from 'react'

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyDtmqZDJSPUCSDkAMNPw3fJsv2vLI7vt7Q",
  authDomain: "reading-rainforest.firebaseapp.com",
  projectId: "reading-rainforest",
  storageBucket: "reading-rainforest.appspot.com",
  messagingSenderId: "15291258330",
  appId: "1:15291258330:web:a46010f99e54fb33d8dce3",
  measurementId: "G-MT7Q718G7Q"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

const Messages = () => {
  const [user] = useAuthState(auth)

  return (
    <div>
      <header>

      </header>
      <section>
        {/* {user ? <ChatRoom /> : <SignIn />} */}
      </section>
    </div>
  );
};

export default Messages;