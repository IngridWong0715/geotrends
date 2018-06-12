import React from 'react';
import  Map from './customMap/Map';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTrends } from '../../actions/fetchTrends';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

class customModal extends React.Component {



  handleSearch(data){
    this.props.fetchTrends(data)
    this.props.history.push(`/trends/${data.woeid}`)
  }

  render(){
    const {fetchTrends, places, handleSearch} = this.props;
    return (
      <div>
        <Map
          places={places}
          center={{lat: 30, lng: 0}}
          handleSearch={handleSearch}
          zoom={2}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBPbvv_lp-_uMsao9jg40Yw6L9W8pouyvY&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );

  }

}


const mapDispatchToProps = dispatch => {
 return bindActionCreators({
   fetchTrends: fetchTrends
 }, dispatch)
}

const mapStateToProps = state => {
  return {
    places: state.places
  }
}

customModal.propTypes = {
  places: PropTypes.array.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(customModal));
