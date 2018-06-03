import React from 'react';
import { connect } from 'react-redux';
import { compose } from "recompose"
import { bindActionCreators } from 'redux'
import TweetsList from './tweetsIndex/TweetsList'
import NavBar from './appBar/NavBar'
import { fetchTweets } from '../../actions/fetchTweets'
import { resetQuery } from '../../actions/resetQuery'
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


  render(){
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

const mapStateToProps = (state) => {
  return {
    trends: state.placeQuery.trends,
    placeQuery: state.placeQuery.query,
    tweets: state.trendQuery.tweets,
    isFetchingTweets: state.trendQuery.isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchTweets: fetchTweets,
    resetQuery: resetQuery
  }, dispatch)
}


export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(ShowPage);
