import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },

  avatar: {
    backgroundColor: red[500],
  },
});

class Tweet extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      followingUser: false,
      liked: false,
      retweeted: false
    }
  }

  handleFollowButton(userScreenName){
   fetch(`/api/follow/${userScreenName}`, {method: 'POST'})
    .then( res => res.json())
    .then( following => {
      if (following[0].id){
        //if the followed user id exists
        this.setState({followingUser: true})
      }
    })
  }

  handleRetweet(){
    fetch(`/api/retweet/${this.props.tweet.id}`, {method: 'POST'})
    .then(res => res.json())
    .then(retweetStatus => {
        this.setState({retweeted: true})
    })
  }
  handleFavorite(){
    fetch(`/api/favorite/${this.props.tweet.id}`, {method: 'POST'})
    .then(res => res.json())
    .then(favoriteStatus => {
        this.setState({liked: true})
    })

  }
  render() {
    const { user_name, user_screen_name, truncated, user_profile_image_url} = this.props.tweet
    const created = this.props.tweet.created[0]

    const text = truncated ? `${this.props.tweet.text} I AM TRUNCATED, view rest on twitter` : `${this.props.tweet.text}`
    let media_url
    let image

    if (this.props.tweet.media){
      media_url = this.props.tweet.media[0].media_url
      image = (<CardMedia>
         <img src={media_url}  alt="" style={{height:300,}}/>
       </CardMedia>)
    } else {
      image = undefined
    }

    return (
      <div>
        <Card >
          <CardHeader
            avatar={
             <Avatar src={user_profile_image_url}>
             </Avatar>
           }
            action={
              <Button onClick={() => this.handleFollowButton(user_screen_name)}>
                {this.state.followingUser ? 'Following' : 'Follow'}
              </Button>
            }

            title={`${user_name} @${user_screen_name}`}
            subheader={created}
          />

          <CardContent>
            <Typography component="p">
              {text}
            </Typography>
            {image}
          </CardContent>
          <CardActions  disableActionSpacing>
            <Tooltip id="tooltip-icon" title="Like">
              <IconButton aria-label="Like" onClick={() => this.handleFavorite()}>
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip id="tooltip-icon" title="Retweet">
              <IconButton aria-label="Retweet" onClick={() => this.handleRetweet()}>
                <ShareIcon />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      </div>
    );
  }
}

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired
}

export default withStyles(styles)(Tweet);
