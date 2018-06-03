export function fetchTweets(query){
  return function(dispatch){
    dispatch({ type: 'START_FETCHING_TWEETS_REQUEST'})
    fetch(`/api/trending/location/${query}`, {
      method: 'GET',
      headers: {
        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiSW5ncmlkV29uZzA3MTUiLCJpZCI6MSwidWlkIjoyOTk4NTczOTkwfX0.DRlQQY89jMbcoFNctev5LnuRirXe5uwlSIxmSUkg_6Y'
      }
    })
      .then(res => res.json())
      .then( tweets => {
        dispatch({
          type: 'SET_TREND_QUERY',
          query: query,
          tweets: tweets
        })
      })
  }

}
