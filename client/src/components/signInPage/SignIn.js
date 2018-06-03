import React from 'react';
import Paper from '@material-ui/core/Paper';
import Background from '../../nasa.jpg'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


class SignIn extends React.Component {

  handleSignIn(){
    // this doesn't work because of the redirect callback to /auth/twitter/callback
   fetch('http://127.0.0.1:3001/auth/twitter/', {method: 'POST'})
   .then(res => {
     debugger;
     return res.json()})
   .then(code => {
     debugger;
   })

   // store the token :
   // window.localStorage.setItem('token', token from response)
  }


  render(){
    return (
      <div style={{display: 'flex', height: '100vh', width:'100vw', background: `url(${Background})`, backgroundSize: 'cover'}}>

          <Grid container item spacing={0} justify="center" style={{ margin: 'auto'} } >
            <Paper style={{background: 'transparent'}}>
            <Typography variant="headline" component="h3" style={{color: 'white', fontFamily: 'Sans Serif'}}>
            Curious about what people are discussing around the world?

        </Typography>
        <Typography variant="headline" component="h1" >
          <a href="http://127.0.0.1:3001/auth/twitter/" style={{color:'white', fontFamily: 'Sans Serif'}} onClick={this.handleSignIn.bind(this)}>Sign in with Twitter to See</a>
        </Typography>


              </Paper>
          </Grid>


      </div>
    )
  }
}

export default SignIn

//SignIn componnt displays link for signin
