import React from 'react';
import PropTypes from 'prop-types';
import {SearchBox} from 'react-google-maps/lib/components/places/SearchBox'

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
    }
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event){
    this.setState({ query: event.target.value});
  }

  render(){
    const {places, handleOnSubmit} = this.props
    const list = places.map( place => {
          return <option value={place.name} ></option>
        });
    const place = places.find(place => place.name === this.state.query)
    let data
    if (place){
       data = {
        woeid: place.woeid,
        name: place.name
      }
    } else {
      data = {type: 'error'};
    }

    return (
      <SearchBox
        controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
      >
      <form onSubmit={ () => handleOnSubmit(data) }>
        <input
          list="browsers"
          name="query"
          onChange={this.handleOnChange}
          value={this.state.query}
          placeholder="location"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            marginTop: `27px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
        <datalist id="browsers">
          {list}
        </datalist>
      </form>
    </SearchBox>
    );
  }
}

SearchBar.defaultProps = {
  places: []
};

SearchBar.propTypes = {
  places: PropTypes.array.isRequired,
  handleOnSubmit: PropTypes.func.isRequired
};

export default SearchBar;
