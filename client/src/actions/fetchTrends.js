export function fetchTrends(data){
  //USING THUNK,
  // RETURNS a function that gets dispatch
  return function(dispatch){
    if (data.type === 'woeid'){
      dispatch({
        type: 'SET_PLACE_QUERY_WOEID',
        woeid: data.woeid,
        name: data.name
      })
    } else {
      dispatch({
        type: 'SET_PLACE_QUERY_COORDS',
        lat: data.lat,
        lng: data.lng,
        woeid: data.woeid,
        name: data.name
      })
    }
    //the returned value of that returned funcition is a resolved promise
    // which sends a patch request
    let query;
    if (data.type === 'woeid'){
      query = `woeid=${data.woeid}`
    } else {
      query = `coords=${data.lat}&${data.lng}`
    }

    return fetch(`/api/trending/${query}`, {
      method: 'GET',
      headers: {
        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiSW5ncmlkV29uZzA3MTUiLCJpZCI6MSwidWlkIjoyOTk4NTczOTkwfX0.DRlQQY89jMbcoFNctev5LnuRirXe5uwlSIxmSUkg_6Y'
      }
    })
      // Try to parse the response
      .then( res => res.json()
      .then( json => ({
        status: res.status,
        json: {hashtags: json}
        })
      ))
      .then(
        // Both fetching and parsing succeeded!
        ({status, json}) => {
          if (status >= 400) {
            //Bad status
            dispatch({type: 'FETCH_RESOURCES_FAIL', errorType: 'warning', message:'Error after fetching resources'});
            dispatch({type: 'CREATE_API_ENTITY_ERROR', errorType: 'warning', message: 'Entity error whilst creating'});
          } else {
            // Status looks good
            dispatch({
              type: 'SET_TRENDS',
              hashtags: json.hashtags,
            });

          }
        }, //??? SYNTAX???
        // Either fetching or parsing failed!
        err => {
          dispatch({type: 'PRE_FETCH_RESOURCES_FAIL', errorType: 'fatal', message:'Error fetching resources'});
          dispatch({type: 'PRE_CREATE_API_ENTITY_ERROR', errorType: 'fatal', message: 'Entity error before creating'});
        }
      ); // then

  }
}
