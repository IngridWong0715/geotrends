import { combineReducers } from 'redux'

// initialCompleteState = {
//   places = [],
//   placeQuery: {
//     trends: [],

//     query: {
//       woeid: 0,
//       coords: {},
//       name: ''
//     }
//   },
//   trendQuery: {
 //isFetching: false,
//     query: '',
//     tweets: []
//   }
// }

const initialPlaceQueryState = {
  trends: [], //instead of trendingTopics
  query: {
    woeid: 0,
    coords: {},
    name: ''
  }
}

const intialTrendQueryState = {
  query: '',
  tweets: [],
  isisFetching: false, // false when fetch request is not initiatedd/ has ended
}

function places(state = [], action){
  switch(action.type){
    case 'SET_PLACES':
      return action.places
    default:
      return state
  }
}
function placeQuery(state = initialPlaceQueryState, action){
  switch(action.type){
    case 'SET_PLACE_QUERY_WOEID':
      return {
        ...state,
        query: {
          ...state.query,
          woeid: action.woeid,
          name: action.name,
        }
      }

    case 'SET_PLACE_QUERY_COORDS':
      const coords = {lat: action.lat, lng: action.lng}
      return {
        ...state,
        query: {
          ...state.query,
            coords: coords,
            name: action.name,
        }
      }

    case 'SET_TRENDS':
      return { ...state, trends: [...action.hashtags] }
    case 'FETCH_RESOURCES_FAIL':
    case 'CREATE_API_ENTITY_ERROR':
    case 'PRE_FETCH_RESOURCES_FAIL':
    case 'PRE_CREATE_API_ENTITY_ERROR':
      //THINK OF BETTER ERROR HANDLING!!!
      return state
    default:
      return state
  }
}

function trendQuery(state = intialTrendQueryState, action){
  switch(action.type){
    case 'SET_TREND_QUERY':
      return {
          query: action.query,
          tweets: action.tweets,
          isFetching: false // done isFetching
      }
    case 'START_FETCHING_TWEETS_REQUEST':
    debugger;
      return {
        ...state, // state should be empty
        isFetching: true
      }

    default:
      return state
  }
}


const appReducer = combineReducers({
  places,
  placeQuery,
  trendQuery
})

//https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
// FOLLOW THE SAME PATTERN FOR LOG OUT!
const rootReducer = (state, action) => {
  let newState = state
  if (action.type === 'RESET_QUERY') {
    newState = {
      places: state.places,
      placeQuery: {
        trends: [],
        query: {
          woeid: 0,
          coords: {},
          name: ''
        }
      },
      trendQuery: {
        query: '',
        tweets: []
      }
    }
  }
  return appReducer(newState, action)
}


export default rootReducer
