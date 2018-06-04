export function fetchTweets(query){
  return function(dispatch){
    dispatch({ type: 'START_FETCHING_TWEETS_REQUEST'})
    fetch(`/api/trending/location/${query}`)
      .then(res => {
        if (res.ok){
          return res.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then( tweets => {
        dispatch({
          type: 'SET_TREND_QUERY',
          query: query,
          tweets: tweets
        })
      })
  }

}
