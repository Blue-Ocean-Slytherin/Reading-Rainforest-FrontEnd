import React, { useEffect, useState, createContext } from 'react';
import jwt_decode from 'jwt-decode';


const LogIn = ({ setUser }) => {

  let handleLogIn = (response) => {
    let userObject = jwt_decode(response.credential);
    setUser(userObject);
    // document.getElementById('signInDiv').hidden = true;
  };

  useEffect(()=>{
    /* global google */
    google.accounts.id.initialize({
      client_id: `661201758889-99rdafi8i9t3o1unsdf3e1lorbcvl0ic.apps.googleusercontent.com`,
      callback: handleLogIn
    });

    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: "outline", size: "large" }
    )
  },[]);

  let handleSignOut = (e) => {
    setUser({});
    // document.getElementById('signInDiv').hidden = false;
  };

  return (
    <div className="Login">
      <div id="signInDiv"></div>
    </div>
  )

};

export default LogIn;