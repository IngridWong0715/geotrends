import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap } from 'react-google-maps';
import PropTypes from 'prop-types';
import MyMarkerCluster from './MarkerCluster'
import SearchBar from './SearchBar'

const Map = ({zoom, center, places, handleSearchSubmit, handleMarkerClick}) => {
  return (
    <GoogleMap
      defaultZoom={zoom}
      defaultCenter={center}>
      <SearchBar places={places} handleOnSubmit={handleSearchSubmit}/>
      <MyMarkerCluster places={places} onMarkerClick={handleMarkerClick}/>
    </GoogleMap>
  );
}

Map.defaultProps = {
  places: []
}

Map.propTypes ={
  places: PropTypes.array.isRequired
}

export default withScriptjs(withGoogleMap(Map));
