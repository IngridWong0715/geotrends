import React from 'react';
import Paper from '@material-ui/core/Paper';
import Background from '../../nasa.jpg'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router'

class Welcome extends React.Component {

  showHomePage(){
    this.props.history.push('/home');
  }

  render(){
    return (
      <div style={{display: 'flex', height: '100vh', width:'100vw', background: `url(${Background})`, backgroundSize: 'cover'}}>
        <Grid container item xs={10} sm={10} md={5} lg={5} xl={5} spacing={6} justify="center" style={{ margin: 'auto', height: '200', width:'100'} } >
          <Paper elevation={20} style={{background: '#0D1420', border:'white' }}>
            <Typography variant="subheading" style={{color: 'white', fontFamily: 'Sans Serif'}}>
                Welcome to Global Trends Watcher!
            </Typography>
            <Typography variant="body2" style={{color: 'white', fontFamily: 'Sans Serif'}}>
              On the next page, you will see a Google Maps display. Each marker on the map represents a location where
              Twitter trends are available. Click on one to view those trends.
              Alternatively, you can search for a location from the search bar. As you enter your query, the drop down menu will
              inform you of possinle queries.
              Once you have chosen a location, you will see the trends displayed in the column on the left. Click on a trend to
              explore what people are saying about that trend. You can also follow a specific user, retweet and like a tweet.
            </Typography>
            <Typography variant="body2" >
              <Button style={{color:'white', fontFamily: 'Sans Serif'}} onClick={this.showHomePage.bind(this)}>
                Click HERE to explore
              </Button>
            </Typography>
          </Paper>
        </Grid>
      </div>
    )
  }
}

export default withRouter(Welcome)
