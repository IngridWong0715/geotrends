import React from 'react'
import {Marker} from 'react-google-maps'
import PropTypes from 'prop-types'

const MyMarker = ({place, onMarkerClick}) => {
  const {lat, lng} = place
  const data = {
    type: 'coords',
    lat: lat,
    lng: lng,
  }
  return (
    <Marker
      position={{lat: lat, lng: lng}}
      onClick={() => {onMarkerClick(data)}}
    />
  );
}

export default MyMarker;
