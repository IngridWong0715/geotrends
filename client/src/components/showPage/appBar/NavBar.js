import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import LongMenu from './Menu'

const NavBar = ({history, resetQuery}) => {
  const handleButtonClick = () => {
    history.push('/');
    resetQuery();
  }
  return (
    <div >
      <AppBar position="static" style={{ backgroundColor: '#657ced', }} >
        <Toolbar >
          <Button color="inherit" onClick={handleButtonClick}>Home</Button>
          <LongMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  resetQuery: PropTypes.func.isRequired
};

export default withRouter(NavBar)
