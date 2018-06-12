import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router'
import ProgressBar from '../utilities/ProgressBar'

class Welcome extends React.Component {

  showHomePage(){
    this.props.history.push('/home');
  }

  render(){
    let nextButton
    let fetchedPlaces = !!Object.keys(this.props.places).length // check if state.places is empty

    if (fetchedPlaces){
      nextButton = (<Typography variant="body2" >
        <Button  size="large" style={{fontSize: '25px', color:'#FFD700', fontFamily: 'Sans Serif'}} onClick={this.showHomePage.bind(this)}>
          Click Here to Explore
        </Button>
      </Typography>)

    } else {
      nextButton = (
        <div>
          <h3>Fetching Locations...</h3>
          <ProgressBar />
        </div>
      )
    }

    return (
      <div style={{display: 'flex', height: '100vh', width:'100vw', background: '#657ced', backgroundSize: 'cover'}}>
        <Grid container item xs={10} sm={10} md={7} lg={5} xl={5} spacing={6} justify="center" style={{ margin: '40px auto'} } >
          <Paper elevation={20} style={{background: 'white', border:'white' }}>
            <Typography variant="display2" style={{ fontFamily: 'Sans Serif'}}>
                Welcome to GeoTrends
            </Typography>
            <Typography variant="body2" style={{fontFamily: 'Sans Serif'}}>
              On the next page, you will see a Google Maps display. Each marker on the map represents a location where
              Twitter trends are available. Click on one to view those trends.
              Alternatively, you can search for a location from the search bar. As you enter your query, the drop down menu will
              inform you of possinle queries.
              Once you have chosen a location, you will see the trends displayed in the column on the left. Click on a trend to
              explore what people are saying about that trend. You can also follow a specific user, retweet and like a tweet.
            </Typography>

            {nextButton}
          </Paper>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    places: state.places
  }
}

export default withRouter(connect(mapStateToProps, null)(Welcome));
