import React from 'react';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import MyMarker from './Marker'
import PropTypes from 'prop-types';

const MyMarkerCluster = ({places, handleOnClick}) => {
  return (
    <MarkerClusterer
     averageCenter
     enableRetinaIcons
     gridSize={60}
     >
       {places.map(place => (
        <MyMarker place={place} handleOnClick={handleOnClick}/>
        ))}
    </MarkerClusterer>
  );
}

MyMarkerCluster.defaultProps = {
  places: []
};

MyMarkerCluster.propTypes = {
  places: PropTypes.array.isRequired,
  onMarkerClick: PropTypes.func.isRequired
};


export default MyMarkerCluster;
