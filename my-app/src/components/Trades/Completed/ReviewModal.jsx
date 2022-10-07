import React, {useState} from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const inputStyle = {
  width: '275px',
}

const ReviewModal = (props) => {
  const [review, setReview] = useState('');

  const onReview = function(e) {
    setReview(e.target.value);
  }

  const onSubmit = function(e) {
    e.preventDefault();
    axios.put(`${process.env.REACT_APP_BE_URI}/trade/review`, {uid: props.traderInfo.uid, review: review})
      .then(results => console.log(results))
      .catch ((err) => console.log(err))
    setReview('');
    props.handleClose();
  }

  return (
    <div>
      <Stack spacing={5} alignItems="center" justifyContent="center">
        <Typography variant="h3">
          Leave a Rating
        </Typography>
        <TextField style={inputStyle} value={review} type="number" min="1" max="5" placeholder="Enter a Number Between 1 & 5" onChange={onReview} required/>
        <Button variant="contained" onClick={onSubmit}>Submit Review</Button>
      </Stack>
    </div>
  )
}

export default ReviewModal;