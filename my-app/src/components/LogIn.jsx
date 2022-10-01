import styled from 'styled-components';
import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';

import img from "../images/LogInImage.webp";
import logo from "../images/ReadingRainforestLogo.png"

import "../styles/LogIn.css";

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

const LogIn = ({ setUser }) => {
  let handleLogIn = (response) => {
    let userObject = jwt_decode(response.credential);
    setUser(userObject);
    // document.getElementById('signInDiv').hidden = true;
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: `661201758889-99rdafi8i9t3o1unsdf3e1lorbcvl0ic.apps.googleusercontent.com`,
      callback: handleLogIn,
    });

    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: "outline", size: "large", shape: "pill"}
    )
  },[]);

  // let handleSignOut = (e) => {
  //   setUser({});
  //   // document.getElementById('signInDiv').hidden = false;
  // };

  return (
    <LogInContainer>
      <DisplayBox>
        <div></div>
        <Container>
          <Welcome>Welcome To</Welcome>
        </Container>
        <Logo></Logo>
        <div id="signInDiv"></div>
        <div></div>
      </DisplayBox>
    </LogInContainer>
  )

};

export default LogIn;
