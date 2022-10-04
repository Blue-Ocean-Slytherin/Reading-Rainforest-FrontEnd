import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {GoogleMap, Marker,useJsApiLoader} from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '650px',
}


function Map(props) {
  const [address, setAddress] = useState('');

  const center = {
    lat: props.userLat,
    lng: props.userLng
  }

  const {isLoaded} = useJsApiLoader ({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })

  useEffect(() => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${props.userLat},${props.userLng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`)
      .then ((results) => setAddress(results.data.results[0].formatted_address))
      .catch((err) => console.log('Error getting address'))
  }, [props.userLat, props.userLng])

  return (
    <div>
      {isLoaded ? (<GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <Marker position={center}/>
      </GoogleMap>
    ) : null}
      <div id="address">
        <h3>{address}</h3>
      </div>
    </div>
  );
}

export default Map;