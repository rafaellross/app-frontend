import React, { Component } from 'react'


import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import * as API from '../../Api';

const classes = {
  root: {
    height: '100vh'

  },
  card: {
     maxWidth: 645,
     marginTop: 60
   },
   media: {
      height: 130,
    },
    button: {
        marginTop: 20,
    },
};


class Login extends Component {

     constructor(props){
        super(props);
        this.state = {
            email : 'rafaellross@gmail.com',
            password: '123456',
            err: false
        }
     }

     onSubmit(e){
        e.preventDefault();

        const {email , password} = this.state ;
        API.login({
          email,
          password
        })
        .then(response=> {

            localStorage.setItem('token', response.success.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            console.log(response);
            this.setState({err: false});
            window.location.replace("/");

          })
          .catch(error=> {
            /*
            this.setState(() => ({
              email: '',
              password: '',
              err: true
            }));
            console.log(error)
            */
          });
     }

      handleChange(event) {

      const { target: { name, value } } = event
      this.setState(() => ({
              [name]: value
          }));


  }

	render() {

        //let error = this.state.err ;
        //let msg = (!error) ? 'Login Successful' : 'Wrong Credentials' ;
        //let name = (!error) ? 'alert alert-success' : 'alert alert-danger' ;
	    return (

        <form style={classes.root} onSubmit={this.onSubmit.bind(this)}>
            <Grid container>
              <Grid item xs={1} sm={1} md={4}>
              </Grid>
              <Grid item xs={10} sm={9} md={4}>
                <Card style={classes.card}>
                  <CardMedia
                    style={{height: 120, backgroundSize: 'contain', marginTop: 25}}
                    image="/img/logo.jpg"
                    title="Contemplative Reptile"
                    />
                  <CardContent>

                    <Typography gutterBottom variant="h2" component="h2">
                      Login
                    </Typography>
                    <TextField
                      required
                      onChange={this.handleChange.bind(this)}

                      id="email"
                      name="email"
                      label="E-mail"
                      type="text"
                      margin="dense"
                      fullWidth
                      value={this.state.email}
                    />
                    <TextField
                      required
                      onChange={this.handleChange.bind(this)}
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      margin="dense"
                      fullWidth
                      value={this.state.password}
                    />

                  <Button variant="outlined" color="primary" style={classes.button} type="submit">
                       Login
                     </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </form>
  	);
  }
}

export default Login;
