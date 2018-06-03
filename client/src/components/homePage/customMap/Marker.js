import React from 'react'
import {Marker} from 'react-google-maps'
import PropTypes from 'prop-types'

const MyMarker = ({place, onMarkerClick}) => {
  const {lat, lng, name, woeid} = place
  const data = {
    type: 'coords',
    lat: lat,
    lng: lng,
    name: name,
    woeid: woeid
  }
  return (
    <Marker
      position={{lat: lat, lng: lng}}
      onClick={() => {onMarkerClick(data)}}
    />
  );
}
MyMarker.propTypes = {
  place: PropTypes.object.isRequired,
  onMarkerClick: PropTypes.func.isRequired
}

export default MyMarker;
