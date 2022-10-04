import styled from 'styled-components';
import React, { useState } from 'react';
import { firebase } from '../firebase'
import img from "../images/LogInImage.webp";
import logo from "../images/ReadingRainforestLogo.png"

import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import GoogleIcon from '@mui/icons-material/Google';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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

const RegisterBox = styled(DisplayBox)`
  height: 550px;
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

const RegiLogo = styled(Logo)`
height:150px;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
`;

const inputStyle = {
  padding: '3px',
  width: '350px',
}

const RegButtonStyle = {
  marginTop: '17px',
  marginBottom: '17px',
};

export let firebase_auth = firebase.auth();

const LogIn = ({ setUser }) => {

  const [ isNewUser, setIsNewUser ] = useState(false);

  let handleAuthStateChanged = async (user) => {
    if (user) {
      // temporary
      let temp = {
        name: user._delegate.displayName,
        email: user._delegate.email,
        profilePhoto: user._delegate.photoURL,
        phoneNumber: user._delegate.phoneNumber,
        uid: user._delegate.uid,
        lat: "0",
        long: "0",
      }
      setUser(temp);

      // use the user._delegate.uid to query our DB for user data
      // let userData = await axios.get("BE URI")

      // temporary for dev, set state manually here
      // setIsNewUser(true); // is new user

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
      { isNewUser ?
          <RegisterBox>
          <div></div>
          <Container>
            <Welcome>Registeration</Welcome>
          </Container>
          <RegiLogo></RegiLogo>
          <TextField variant='filled' label='Full Name' sx={inputStyle}></TextField>
          <TextField variant='filled' label='Email' sx={inputStyle}></TextField>
          <TextField variant='filled' label='Phone Number' sx={inputStyle}></TextField>
          <TextField variant='filled' label='Location' sx={inputStyle}></TextField>
          <Button variant="contained" color="mintGreen" endIcon={<ArrowForwardIosIcon/>} sx={RegButtonStyle}>Finish Registeration</Button>
        </RegisterBox>
        :
        <DisplayBox>
          <div></div>
          <Container>
            <Welcome>Welcome To</Welcome>
          </Container>
          <Logo></Logo>
          <Button variant="contained" color="mintGreen" onClick={handleLogIn} endIcon={<GoogleIcon />} > >Sign In With Google</Button>
          <div></div>
        </DisplayBox>
      }
    </LogInContainer>
  )

};

export default LogIn;
