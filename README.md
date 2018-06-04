# Viewing Global Trends  with Twitter App

For my final project, I decided to work on an app that pulls instant data on trends fromTwitter and displays them based on user selection.

**The basic setup**

My application couples a front end React/Redux with a Rails API backend. The front end is created with `create-react-app` while the backend is created with `rails new my_api --api`.

In development, the frontend is run with the Webpack dev server at ` localhost:3000` while the  API server runs on `localhost:3001`. This creates a CORS (Cross-Origin Resource Sharing) issue as the React app attemps to load resources from a different origin. To resolve this issue, I configure the Webpack development server to proxy requests to the API server.  The mecahnism is illustrated by the diagram from the Fullstack React article:
![](https://www.fullstackreact.com/assets/images/articles/cra-with-server/flow-diagram-2.png)

With this, everytime React makes an API request, the request is made to the Webpack development server at `localhost:3000`.


**The React app**

My React app has two containers: a `Home` component that renders the home page, and a `ShowPage` component that renders the trends of a location selected by the user.

`Home` renders a `Map` component which is a customised GoogleMaps imported with `react-google-maps`. The `Map` component itself renders `SearchBar` and `MyMarkerCluster` components. Both of these components are two alternative ways for the user to interact with the places where Twitter has trends:
*`MyMarkerCluster`, pinpoints each available location with a marker on the map, selectable by the user;
*`SearchBar` lets user to directly search for a location, with a dropdown datalist that narrows the search options as the user types.


Once the user selects a marker or enters a search, `ShowPage` renders the results. It renders  three child components: 1) a `NavBar` on top of the page for the user to navigate back to `Home` page, 2) a `TrendsList`that displays the trends of the location, and 3) a `TweetsList` that displays the tweets of a specific trend when the latter is clicked on.

For each `Tweet`, a user can follow the user, retweet, as well as like the tweet. Each of these user interactions triggers a fetch request to the Rails API which then performs the appropriate request to the Twitter API.

**React/Redux**

I use Redux for state management of my React app.
The state, stored in the Redux store, looks like the following:
```
 {
  places = [],
  placeQuery: {
    trends: [],
    query: {
      woeid: 0,
      name: ''
     }
   },
  trendQuery: {
    isFetching: false,
    query: '',
    tweets: []
  }
}
```
I wrap the `App` component with `Provider` so that the container components have access to the store once `connect`ed as such:
`connect(mapStateToProps, mapDispatchToProps)(containerComponent)`

Now these containers have access to the state through props and can pass them down to their child components. They can also dispatch actions and thereby update the store through the reducer, triggering re-rendering.

**Rails API**

The API server has six endpoints, all of which interact with the Twitter API through the Twitter gem to perform the request actions:

  `get 'api/trending/available_places`: returns a JSON of all places where trends are available.
	`get 'api/trending/:query'`: returns a JSON of all trends of the given place
  `get 'api/trending/location/:tweet_query'`:  returns a JSON of all tweets of the given trend
  `post 'api/follow/:user_screen_name'`: makes a request to Twitter API to follow the user
  `post 'api/retweet/:tweet_id'`: makes a request to Twitter API to retweet the tweet
  `post  'api/favorite/:tweet_id'`: makes a request to Twitter API to like the tweet
