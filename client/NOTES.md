NEED TO ADD:
npm i @material-ui/core
npm i @material-ui/icons

Next steps:

- display activities/search results on each specific trend when clicked


ISSUES
1. In fetchTrending, line 8: dispatch not fired?!


2. in ShowPage/HashtagsList:
Can't style selected MenuItem: want text color to be white
lines 61-65
<MenuItem
  classes={{
    root: classes.root,
    selected: classes.selected,
  }}


THINGS TO ASK:
1. (IMPORTANT) HandleHashtagClick (=> fetchTweets) in ShowPage locks the page
2. Fetching available places in App: is this a good pattern? (would ideally want App to be dumb?!)
