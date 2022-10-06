import React, {useState, useEffect} from 'react';
import Map from './Map';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

const greenStyle = {
  backgroundColor: '#9CFC97',
}

const redStyle = {
  backgroundColor: '#FFCF9C',
}

const ConfirmedCard = (props) => {
  const [open, setOpen] = useState(false);
  const [userLat, setUserLat] = useState(40.714224);
  const [userLng, setUserLng] = useState(-73.961452);
  const [tradeLat, setTradeLat] = useState(null);
  const [tradeLng, setTradeLng] = useState(null);

  const handleOpen = function () {
    setOpen(true);
  }

  const handleClose = function () {
    setOpen(false);
  }

  return (
    <div>
      <Box sx={{width: '1100px', height: '275px', m:6, backgroundColor:"#BBDEF0"}}>
        <Stack direction="row" spacing={5} justifyContent="center">
          <div>
            <Card sx={{ minWidth: 215, maxHeight: 200, m:1.5}}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Trader's Info
                </Typography>
                <Typography variant="h5" component="div">
                  benevolent
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </div>
          <div>
            <Card sx={{ minWidth: 215, maxHeight: 200, m:1.5}}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Book Cover
                </Typography>
                <Typography variant="h5" component="div">
                  benevolent
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </div>
          <div>
            {/* <h4>Their Offer</h4> */}
            <Card sx={{ minWidth: 215, maxHeight: 200, m:1.5}}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Book Info
                </Typography>
                <Typography variant="h5" component="div">
                  benevolent
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </div>
          <div>
            {/* <h4>What They Want</h4> */}
            <Card sx={{ minWidth: 215, maxHeight: 200, my:1.5}}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Book Info
                </Typography>
                <Typography variant="h5" component="div">
                  benevolent
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </div>
        </Stack>
        <Stack direction="row" spacing={20} justifyContent="center">
          <Button style={greenStyle} variant="contained">Message</Button>
          <Button style={redStyle} variant="contained" onClick={handleOpen}>Map</Button>
        </Stack>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Map userLat={userLat} userLng={userLng} tradeLat={tradeLat} tradeLng={tradeLng}/>
        </Box>
      </Modal>
      {/* {open && (
        <div>
          <Map/>
        </div>
      )} */}
    </div>
  )
}

export default ConfirmedCard;