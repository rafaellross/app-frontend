import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import 'typeface-roboto';

import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        display: 'flex',
        '& > *': {
          margin: theme.spacing(1),
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
          textAlign: 'center',
          
      },
      buttons: {
        width: theme.spacing(40),        
        marginTop: theme.spacing(10),  
      }
});




class Home extends Component {

    render() {
        
        return (            
            <div>
                <React.Fragment>                
                <Container maxWidth="sm">
                    <Paper className={this.props.classes.paper} elevation={3}>      
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Container maxWidth="lg">
                                    <Avatar className={this.props.classes.large}>H</Avatar>
                                    </Container>
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <Typography variant="h3" component="h2">
                                        Welcome User!
                                    </Typography>                            
                                </Grid>
                                <Grid item xs={12}>
                                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" orientation="vertical" className={this.props.classes.buttons}>
                                        <Button size="large">Start Employee Application</Button>
                                        <Button size="large">Include New Time Sheet</Button>                                
                                    </ButtonGroup>                           
                                </Grid>                            
                            </Grid>                     
                    </Paper>                    
                </Container>
                </React.Fragment>                
            </div>
        )
    }
}

export default withStyles(styles)(Home)
