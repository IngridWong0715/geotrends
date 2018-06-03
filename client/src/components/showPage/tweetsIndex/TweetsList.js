import React from 'react'
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper'
import Tweet from './Tweet'
import ProgressBar from './ProgressBar'

const TweetsList = ({isFetching, tweets, handleFollowButton}) => {
  let cards
  if (isFetching){
    cards = (
      <div>
        <h3>Fetching Tweets...</h3>
        <ProgressBar />
      </div>
    )
  } else {
    cards = tweets.map( tweet => <Tweet tweet={tweet} handleFollowButton={handleFollowButton}/>)
  }

  return (
    <div>
      <Paper style={{height: 480, overflow: 'auto',textAlign: 'center', maxWidth: 600, marginLeft: 40, marginTop: 20 }}>
        {cards}
      </Paper>
    </div>
  )
}

TweetsList.defaultProps = {
  tweets: []
}

TweetsList.propTypes = {
  tweets: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  handleFollowButton: PropTypes.func.isRequired
}

export default TweetsList
