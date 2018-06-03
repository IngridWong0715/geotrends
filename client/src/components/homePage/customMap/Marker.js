import React from 'react'
import {Marker} from 'react-google-maps'
import PropTypes from 'prop-types'

const MyMarker = ({place, handleOnClick}) => {
  const {lat, lng, name, woeid} = place
  const data = {
    name: name,
    woeid: woeid
  }
  return (
    <Marker
      position={{lat: lat, lng: lng}}
      onClick={() => {handleOnClick(data)}}
    />
  );
}
MyMarker.propTypes = {
  place: PropTypes.object.isRequired,
  onMarkerClick: PropTypes.func.isRequired
}

export default MyMarker;
