import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import 'typeface-roboto';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link, withRouter } from "react-router-dom";

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



class Job extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            isLoading: true,
            id: null,
            code: '',
            description: '',
            address: '',            
            phone: '',
            inactive: false
        }
    }
        
    componentDidMount() {
        if (this.props.job_id) {
            API.get('jobs', this.props.job_id)
            .then((job) => {            
                this.setState(() => ({
                    id: job.id,
                    code: job.code,
                    description: job.description,
                    address: job.address,            
                    phone: job.phone,
                    inactive: job.inactive,
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
            
            API.save('jobs', state)
            .then((job) => {            
                console.log(job)
                this.props.history.goBack()
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
                    <TextField required label="Code" value={this.state.code} variant="outlined" InputLabelProps={{ shrink: true}} name="code" onChange={(e) => this.handleChange(e)}/>
                    <TextField required label="Description" value={this.state.description} variant="outlined" InputLabelProps={{ shrink: true}} name="description" onChange={(e) => this.handleChange(e)}/>
                    <TextField required label="Address" value={this.state.address} variant="outlined" InputLabelProps={{ shrink: true}} name="address" onChange={(e) => this.handleChange(e)}/>                    
                    <TextField required label="Phone" value={this.state.phone} variant="outlined" InputLabelProps={{ shrink: true}} name="phone" onChange={(e) => this.handleChange(e)}/>                    
                    <TextField id="inactive" select label="Active" value={this.state.inactive? '1' : '0'}
                    variant="outlined" name="enabled" onChange={(e) => this.handleChange(e)}>
                        <option key={'1'} value={'1'}>No</option>
                        <option key={'0'} value={'0'}>Yes</option>            
                    </TextField>                    
                    <div>
                        <ButtonGroup aria-label="outlined primary button group" style={{width: '80%', marginLeft: '10%'}}>
                            <Button variant="contained" color="secondary" style={{width: '50%', padding: '10px'}} component={Link} to={'/jobs'}>Cancel</Button>                    
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

export default withRouter(withStyles(styles)(Job));