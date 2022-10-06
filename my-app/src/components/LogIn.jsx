import styled from 'styled-components';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { firebase } from '../firebase'
import img from "../images/LogInImage.webp";
import logo from "../images/ReadingRainforestLogo.png"

import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import GoogleIcon from '@mui/icons-material/Google';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Alert from '@mui/material/Alert';

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
  height: 643px;
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

const Spacer = styled(Container)`
  height: 59px;
`;

const inputStyle = {
  padding: '3px',
  width: '350px',
}

const RegButtonStyle = {
  marginTop: '13px',
  marginBottom: '16px',
};

const SignInBtnStyle = {
  borderRadius: '15px',
  height: '60px',
  fontSize: '15px',
}

export let firebase_auth = firebase.auth();

const LogIn = ({ setUser }) => {
  let URI = process.env.REACT_APP_BE_URI;
  const [ isAllFilled, setIsAllFilled ]= useState(true);
  const [ isNewUser, setIsNewUser ] = useState(false);
  const uid = useRef('');
  const fullName = useRef('');
  const email = useRef('');
  const photo = useRef('');
  const phoneNumber = useRef('');
  const street = useRef('');
  const city = useRef('');
  const state = useRef('');

  let handleAuthStateChanged = async (user) => {
    try {
      if (user) {
        // use the user._delegate.uid to query our DB for user data
        let response = await axios.get(`${URI}/user/${user._delegate.uid}`);
        if (!response.data) { // new user
          uid.current = user._delegate.uid;
          photo.current = user._delegate.photoURL;
          setIsNewUser(true);
        } else { // old user
          // set returned data in setUser function
          setUser(response.data);
        }
      }
    } catch (err) {
      alert('Whoops, some issue connecting to the Server');
    }
  };
  firebase_auth.onAuthStateChanged(handleAuthStateChanged);

  let handleChange = (value, string) => {
    let temp = 0;
    string === 'name' ? fullName.current = value :
    string === 'email' ? email.current = value :
    string === 'phone' ? phoneNumber.current = value :
    string === 'street' ? street.current = value :
    string === 'city' ? city.current = value :
    string === 'state' ? state.current = value :
    temp = null;
  };

  let handleRegistering = async (e) => {
    try {
      // function to replace white space with +
      street.current = street.current.split(' ').join('+');
      city.current = city.current.split(' ').join('+');
      state.current = state.current.split(' ').join('+');
      if (uid.current && fullName.current && email.current && photo.current && phoneNumber.current && street.current && city.current && state.current) {
        setIsAllFilled(true);
        let response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${street.current},+${city.current},+${state.current}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
        const { lat, lng } = response.data.results[0].geometry.location;
        let newUser = await axios.post(`${URI}/user/new`,{
            uid: uid.current,
            fullName: fullName.current,
            email: email.current,
            phoneNumber: phoneNumber.current,
            profilePhoto: photo.current,
            lat: lat,
            long: lng
          });
          console.log(newUser.data);
        setUser(newUser.data);
      } else {
        setIsAllFilled(false);
      }
    } catch (err) {
      alert('Whoops, some issue connecting to the Server');
    }
  };

  let handleLogIn = (e) => {
    firebase_auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <LogInContainer>
      { isNewUser ?
          <RegisterBox>
          <div></div>
          <Container>
            <Welcome>REGISTER</Welcome>
          </Container>
          <RegiLogo></RegiLogo>
          {isAllFilled ?
          <Spacer className='Spacer' ></Spacer>
          :
          <Alert size='small' severity="error">
            Fill Out All Fields Please
          </Alert>
          }
          <TextField defaultValue={fullName.current} onChange={(e)=>{handleChange(e.target.value, 'name')}} variant='filled' label='Full Name' sx={inputStyle} required={true} ></TextField>
          <TextField onChange={(e)=>{handleChange(e.target.value, 'email')}} variant='filled' label='Email' sx={inputStyle} required={true} ></TextField>
          <TextField onChange={(e)=>{handleChange(e.target.value, 'phone')}} variant='filled' label='Phone Number' sx={inputStyle} required={true} ></TextField>
          <TextField onChange={(e)=>{handleChange(e.target.value, 'street')}} variant='filled' label='Street' sx={inputStyle} required={true} ></TextField>
          <TextField onChange={(e)=>{handleChange(e.target.value, 'city')}} variant='filled' label='City' sx={inputStyle} required={true} ></TextField>
          <TextField onChange={(e)=>{handleChange(e.target.value, 'state')}} variant='filled' label='State' sx={inputStyle} required={true} ></TextField>
          <Button onClick={handleRegistering} variant="contained" color="mintGreen" endIcon={<ArrowForwardIosIcon/>} sx={RegButtonStyle} >Complete Registeration</Button>
        </RegisterBox>
        :
        <DisplayBox>
          <div></div>
          <Container>
            <Welcome>Welcome To</Welcome>
          </Container>
          <Logo></Logo>
          <Button variant="contained" color="mintGreen" onClick={handleLogIn} endIcon={<GoogleIcon />} sx={SignInBtnStyle}> Sign In With Google</Button>
          <div></div>
        </DisplayBox>
      }
    </LogInContainer>
  )

};

export default LogIn;
