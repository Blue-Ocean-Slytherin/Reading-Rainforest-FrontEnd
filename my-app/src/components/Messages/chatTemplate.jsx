// import React, { useRef, useState } from 'react';

// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';
// import { auth, firestore, firebase } from '../../firebase'

// const ChatMessage = (props) => {
//   const { text, uid, photoURL } = props.message;

//   const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

//   if (photoURL) {
//     return (<>
//       <div className={`message ${messageClass}`}>
//         <img src={photoURL || 'https://upload.wikimedia.org/wikipedia/en/1/16/Draco_Mal.JPG'} referrerPolicy="no-referrer"/>
//         <p>{text}</p>
//       </div>
//     </>)
//   }

// }

      {/* <main>
        {messages && messages.map((msg, index) => <ChatMessage key={index} message={msg}/>)}
        <span ref={dummy}></span>

      </main>

      <form onSubmit={sendMessage}>

        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

        <button type="submit" disabled={!formValue}>🕊️</button>

      </form> */}

// export default ChatMessage;