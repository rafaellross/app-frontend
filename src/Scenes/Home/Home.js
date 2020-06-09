import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(20),
      paddingTop: theme.spacing(10),
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


function Home (props){

        const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

        const classes = useStyles()
        return (
              <div className={classes.root}>
                  <Grid container spacing={3} className={classes.grid}>
                      <Grid item xs={12} sm={12} lg={6}>
                          <Paper className={classes.paper}>
                              <Avatar className={classes.large} src={user.user_photo !== undefined ? user.user_photo : null}/>
                              <Typography variant="h3" component="h2">
                                  Welcome
                              </Typography>
                              <Typography variant="h3" component="h2">
                                  {user.name}!
                              </Typography>
                          </Paper>
                      </Grid>
                  </Grid>
              </div>
        )

}

export default Home
