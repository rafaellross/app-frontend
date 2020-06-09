import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import * as API from '../../Api';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(5),
    paddingTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  grid: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    fontSize: theme.spacing(20),
  },
}));

function Login (props) {


    const [email, setEmail] = useState('rafaellross@gmail.com')
    const [password, setPassword] =  useState('123456')
    const [error, setError] = useState(false)


    useEffect(() => {
      if (localStorage.token) {
        props.history.push("/home")
      }
    });


     const onSubmit = (e) => {
        e.preventDefault();


        API.login({
          email,
          password
        })
        .then(response=> {

            localStorage.setItem('token', response.success.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            console.log(response);
            setError({err: false});
            window.location.replace("/");

          })
          .catch(error=> {
            setError(error)
            console.log(error)
          });
     }

    const handleChange = (event) => {
      const target = event.target
      if(target.name === "email") {
        setEmail(target.value)
      } else {
        setPassword(target.value)
      }
    }
    const classes = useStyles()

        //let error = this.state.err ;
        //let msg = (!error) ? 'Login Successful' : 'Wrong Credentials' ;
        //let name = (!error) ? 'alert alert-success' : 'alert alert-danger' ;
	    return (

        <form onSubmit={(e) => onSubmit(e)}>



              <div className={classes.root}>
                  <Grid container spacing={3} className={classes.grid}>
                      <Grid item xs={12} sm={8} lg={5}>
                          <Paper className={classes.paper} elevation="4" variant="outlined">
                            <Avatar variant="square" className={classes.large} src={"/img/logo.jpg"}/>
                            <Typography gutterBottom variant="h2" component="h2">
                              Login
                            </Typography>
                            <TextField
                              required
                              onChange={handleChange}
                              id="email"
                              name="email"
                              label="E-mail"
                              type="text"
                              margin="dense"
                              size="medium"
                              variant="outlined"
                              fullWidth
                              value={email}
                            />
                            <TextField
                              required
                              onChange={handleChange}
                              id="password"
                              name="password"
                              label="Password"
                              type="password"
                              autoComplete="current-password"
                              margin="dense"
                              size="medium"
                              variant="outlined"
                              fullWidth
                              value={password}
                            />
                            <Button variant="outlined" color="primary" style={classes.button} type="submit">
                                Login
                            </Button>
                          </Paper>
                      </Grid>
                  </Grid>
              </div>
          </form>
  	);

}

export default Login;
