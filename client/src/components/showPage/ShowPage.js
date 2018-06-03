import React from 'react';
import { connect } from 'react-redux';
import { compose } from "recompose"
import { bindActionCreators } from 'redux'
import TweetsList from './tweetsIndex/TweetsList'
import NavBar from './appBar/NavBar'
import { fetchTweets } from '../../actions/fetchTweets'
import { resetQuery } from '../../actions/resetQuery'
import { fetchTrends } from '../../actions/fetchTrends';
import HashtagsList from './hashtagsIndex/HashtagsList'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';



const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class ShowPage extends React.Component {

  constructor(props){
    super(props);
    this.handleHashtagClick = this.handleHashtagClick.bind(this)
  }

  handleHashtagClick(query){
    let searchQuery = query
    let topic = this.props.trends.find(topic => topic.name === query)
    if (topic){
      searchQuery = topic.query
    }
    this.props.fetchTweets(searchQuery)
  }

  componentDidMount(){

// NEED TO WAIT TILL APP.JS FETCHES AND UPDATES PLACES IN STATE
    if (this.props.placeQuery.woeid !== this.props.woeid){

      const place = this.props.places.find(place => place.woeid === this.props.woeid)
      let data
      if (place){
         data = {
          type: 'woeid',
          woeid: place.woeid,
          name: place.name
        }
      } else {
        data = {type: 'error'};
      }
      debugger;
      if (data.type === 'woeid'){
        debugger;
        fetchTrends(data)
      } else {
        debugger;
         alert('THE PLACE DOES NOT HAVE A TREND');
      }
    }



  }


  render(){
    debugger;
    return (
      <div>
        <NavBar resetQuery={this.props.resetQuery}/>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <HashtagsList
              hashtags={this.props.trends}
              placeQuery={this.props.placeQuery}
              handleHashtagClick={this.handleHashtagClick}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={8} lg={9} xl={9}>
            <TweetsList tweets={this.props.tweets} isFetching={this.props.isFetchingTweets}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  return {
    places: state.places,
    trends: state.placeQuery.trends,
    placeQuery: state.placeQuery.query,
    //     query: {
    //       woeid: 0,
    //       coords: {},
    //       name: ''
    //     }
    tweets: state.trendQuery.tweets,
    isFetchingTweets: state.trendQuery.isFetching,
    woeid: ownProps.match.params.woeid
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchTweets: fetchTweets,
    resetQuery: resetQuery,
    fetchTrends: fetchTrends,
  }, dispatch)
}


export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(ShowPage);
