import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import 'typeface-roboto';
import { Redirect } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
      },

      large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        fontSize: theme.spacing(20),


      },
      paper: {
          height: theme.spacing(60),
          paddingTop: theme.spacing(10),
          marginTop: theme.spacing(5),
          width: theme.spacing(80),
          textAlign: 'center',

      },

      buttons: {
        width: theme.spacing(40),
        marginTop: theme.spacing(10),
      }
});




class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
             user: JSON.parse(localStorage.getItem("user"))
        }
    }

    render() {

        const { user } = this.state

        if (!localStorage.token || !user) {
            return (
                <Redirect to={{
                    pathname: '/login'

                  }} />
            )
        }


        return (
            <div>
                <React.Fragment>

                    <Grid container alignItems="center" justify="center" direction="column">
                    <Paper className={this.props.classes.paper} elevation={3}>
                        <Grid container alignItems="center" justify="center" direction="column">
                            <Grid item xs={12}>
                                <Avatar className={this.props.classes.large} src={user.user_photo !== undefined ? user.user_photo : null}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h3" component="h2">
                                    Welcome
                                </Typography>
                                <Typography variant="h3" component="h2">
                                    {user.name}!
                                </Typography>
                            </Grid>
                           </Grid>
                        </Paper>
                    </Grid>

                </React.Fragment>
            </div>
        )
    }
}

export default withStyles(styles)(Home)
