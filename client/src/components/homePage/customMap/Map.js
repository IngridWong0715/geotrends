import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap } from 'react-google-maps';
import PropTypes from 'prop-types';
import MyMarkerCluster from './MarkerCluster'
import SearchBar from './SearchBar'

const Map = ({zoom, center, places, handleSearch}) => {
  return (
    <GoogleMap
      defaultZoom={zoom}
      defaultCenter={center}>
      <SearchBar places={places} handleOnSubmit={handleSearch}/>
      <MyMarkerCluster places={places} handleOnClick={handleSearch}/>
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
