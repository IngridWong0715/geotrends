import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
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
      .then(res => res.json())
      .then( json => {
        let places = json.map( location => {
          let place = {};
          place.lat = location.latitude;
          place.lng = location.longitude;
          place.name = location.name
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

        <Route exact path="/trends" render={() => (
          loggedIn ? (
            <ShowPage />
          ) : (
            <Redirect to='/signin'/>
          )
        )}/>

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
