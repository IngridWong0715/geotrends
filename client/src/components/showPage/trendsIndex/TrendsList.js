import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

const styles = theme => ({
  root: {
    '&:focus': {
      // text: 'white',
      // contrastText: 'white',
      // color: 'white',
      backgroundColor: '#657ced',
      textDecoration: 'underline',
    },
  },
  selected:{ //NOT WORKING
    // https://material-ui.com/customization/overrides/
    //https://material-ui.com/api/menu-item/
    color: 'white',
    backgroundColor: '#657ced',
    textDecoration: 'underline',
  },
  paper: {
      height: 480,
      overflow: 'auto',
      width: 300,
      marginLeft: 100,
      marginTop: 20,
  },
  trend: {
    textAlign: 'center',
  },

});

const TrendsList = ({handleTrendClick, trends, classes, placeQuery}) => {
  const handleMenuItemClick = (event) => {
    handleTrendClick(event.target.textContent)
  };

  let list = trends.map( trend => {
    return (
      <MenuItem
        classes={{
          root: classes.root,
          selected: classes.selected,
        }}
        onClick={ event => handleMenuItemClick(event)}>
        <ListItem  >
          <ListItemText primary={trend.name} className={classes.trend}/>
        </ListItem>
      </MenuItem>
    )
  });

  return (
    <Paper className={classes.paper}>
      <h3>Trending in {placeQuery.name}</h3>
      <Menu>
        {list}
      </Menu>
    </Paper>
  );
}

TrendsList.defualtProps = {
  trends: []
}
TrendsList.propTypes = {
  trends: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  handletrendClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(TrendsList);
