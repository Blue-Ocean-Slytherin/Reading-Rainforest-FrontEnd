import styled from 'styled-components';
import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore, firebase } from '../firebase'
import img from "../images/LogInImage.webp";
import logo from "../images/ReadingRainforestLogo.png"

import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import Button from "@mui/material/Button";

const LogInContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
width:100vw;
height:100vh;
-webkit-background-size: cover;
-moz-background-size: cover;
-o-background-size: cover;
background-size: cover;
background-image: url('${img}');
`;

const DisplayBox = styled.div`
  height: 250px;
  width: 400px;
  border: solid black 3px;
  background-color: #FFCF9C;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0 10px 0;
`;

const Welcome = styled.div`
  font-size: 30px;
  text-align: center;
`;

const Logo = styled.div`
height: 200px;
width: 300px;
background-image: url('${logo}');
-webkit-background-size: cover;
-moz-background-size: cover;
-o-background-size: cover;
background-size: contain no-repeat;
background-position: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
`;

export let firebase_auth = firebase.auth();

const LogIn = ({ setUser }) => {

  let handleAuthStateChanged = (user) => {
    if (user) {
      // temporary
      let temp = {
        name: user._delegate.displayName,
        email: user._delegate.email,
        profilePhoto: user._delegate.photoURL,
        phoneNumber: user._delegate.phoneNumber,
        uid: user._delegate.uid,
      }
      setUser(temp);

      // use the user._delegate.uid to query our DB for user data
      // old user
      // set returned data in setUser function

      // new user
      // ask user to input location
      // query DB to make new user
    }
  };
  firebase_auth.onAuthStateChanged(handleAuthStateChanged);

  let handleLogIn = () => {
    firebase_auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <LogInContainer>
      <DisplayBox>
        <div></div>
        <Container>
          <Welcome>Welcome To</Welcome>
        </Container>
        <Logo></Logo>
        <Button variant="contained" color="mintGreen" onClick={handleLogIn} endIcon={<SwapHorizIcon />} > >Sign In With Google</Button>
        <div></div>
      </DisplayBox>
    </LogInContainer>
  )

};

export default LogIn;
