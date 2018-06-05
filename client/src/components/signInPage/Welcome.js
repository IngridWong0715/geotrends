import React from 'react';
import Paper from '@material-ui/core/Paper';
import Background from '../../nasa.jpg'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router'


class Welcome extends React.Component {

  handleNextPage(){
    // this doesn't work because of the redirect callback to /auth/twitter/callback
    this.props.history.push('/home');

   // store the token :
   // window.localStorage.setItem('token', token from response)
  }


  render(){
    return (
      <div style={{display: 'flex', height: '100vh', width:'100vw', background: `url(${Background})`, backgroundSize: 'cover'}}>

          <Grid container item spacing={0} justify="center" style={{ margin: 'auto'} } >
            <Paper style={{background: 'transparent'}}>
            <Typography variant="headline" component="h3" style={{color: 'white', fontFamily: 'Sans Serif'}}>
            Welcome to XXX
            On the next page, you will see a Google Maps. Each marker on the map represents a location where
            Twitter trends are available. Click on one to view those trends.
            Alternatively, you can search for a location from the search bar. As you enter your query, the drop down menu will
            inform you of possinle queries.
            Once you have chosen a location, you will see the trends displayed in the column on the left. Click on a trend to
            explore what people are saying about that trend. You can also follow a specific user, retweet and like a tweet.


        </Typography>
        <Typography variant="headline" component="h1" >
          <a href="http://127.0.0.1:3001/auth/twitter/" style={{color:'white', fontFamily: 'Sans Serif'}} onClick={this.handleNextPage.bind(this)}>Ready to see the world in trends? Click here</a>
        </Typography>


              </Paper>
          </Grid>


      </div>
    )
  }
}

export default withRouter(Welcome)
