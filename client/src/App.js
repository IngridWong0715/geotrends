import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import './App.css';

import Home from './components/homePage/Home';
import ShowPage from './components/showPage/ShowPage'
import SignIn from './components/signInPage/SignIn'
import { setPlaces } from './actions/setPlaces'

const loggedIn = true //TO DO: JWT authentication flow

class App extends React.Component {

  componentDidMount() {
    fetch('/api/trending/available_places')
      .then(res => {
        if (res.ok){
          return res.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then( json => {
        let places = json.map( location => {
          let place = {};
          place.name = location.address;
          place.lat = location.latitude;
          place.lng = location.longitude;
          place.woeid = location.woeid
          return place;
        });
        this.props.setPlaces(places)
      }
    );
  }

render(){
  return (
    <Router>
      <div className="App">
        <Route exact path="/" render={() => (
          loggedIn ? (
            <Redirect to='/home'/>
          ) : (
            <SignIn/>
          )
        )}/>

        <Route path='/trends/:woeid' component={ShowPage}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/signin" component={SignIn}/>

      </div>
    </Router>
    );
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setPlaces: setPlaces
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(App);
