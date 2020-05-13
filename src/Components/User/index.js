import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import 'typeface-roboto';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link, Redirect, withRouter } from "react-router-dom";

import * as API from '../../Api';

const styles = theme => ({

  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      display: 'flex',
      flexWrap: 'wrap'     

    },
  },
  paper : {
      width: '40%',
      marginLeft: '30%',
      padding: 10
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(2),
    },
  },

});



class User extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            isLoading: true,
            id: null,
            name: '',
            username: '',
            administrator: false,
            password: '',
            password_confirmation: '',
            enabled: true,     
        }
    }
        
    componentDidMount() {
        if (this.props.user_id) {
            API.get('users', this.props.user_id)
            .then((user) => {            
                this.setState(() => ({
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    administrator: user.administrator,
                    password: user.password,
                    password_confirmation: user.password,
                    enabled: user.enabled,
                    //Loading
                    isLoading: false
        
                }))                    
            })    
    
        } else {
            this.setState(() => ({
                isLoading: false
            }))
                
            
        }
        
    }
    

    handleSave(state) {

            API.save('users', state)
            .then((user) => {            
                console.log(user)
                //this.props.history.goBack()
            })
            
    }

    handleChange(event) {
        
        const { target: { name, value } } = event
        this.setState(() => ({
                [name]: value
            }));        
        
    
    }

    render () {
    
    return (
        <div>
        <Typography variant="h3" component="h2" className={this.props.classes.paper} style={{textAlign: 'center'}}>
            {this.props.action}
        </Typography>

        { (
            <Paper elevation={3} className={this.props.classes.paper}>
                <form className={this.props.classes.root} noValidate autoComplete="off">
                <div>
                    <TextField required label="Name" value={this.state.name} variant="outlined" InputLabelProps={{ shrink: true}} name="name" onChange={(e) => this.handleChange(e)}/>
                    <TextField required label="User" value={this.state.username} variant="outlined" InputLabelProps={{ shrink: true}} name="username" onChange={(e) => this.handleChange(e)} disabled={this.props.user_id ? true : false}/>
                    <TextField id="adminsitrator" select label="User Type" value={this.state.inactive? '1' : '0'}
                    variant="outlined" name="enabled" onChange={(e) => this.handleChange(e)}>
                        <option key={'1'} value={'1'}>Administrator</option>
                        <option key={'0'} value={'0'}>Normal</option>            
                    </TextField>

                    <TextField required label="Password" type="password" value={this.state.password} variant="outlined" InputLabelProps={{ shrink: true}} name="password" onChange={(e) => this.handleChange(e)}/>
                    <TextField required label="Confirm Password" type="password" value={this.state.password_confirmation} variant="outlined" InputLabelProps={{ shrink: true}} name="password_confirmation" onChange={(e) => this.handleChange(e)}/>
                    
                    <div>
                        <ButtonGroup aria-label="outlined primary button group" style={{width: '80%', marginLeft: '10%'}}>
                            <Button variant="contained" color="secondary" style={{width: '50%', padding: '10px'}} component={Link} to={'/users'}>Cancel</Button>                    
                            <Button variant="contained" color="primary" style={{width: '50%', padding: 10}} onClick={() => this.handleSave(this.state)}>Save</Button>
                        </ButtonGroup>
                    </div>
                    </div>
                </form>
            </Paper> 
            
        )}
    
            
        </div>
    );
    }
}

export default withRouter(withStyles(styles)(User));