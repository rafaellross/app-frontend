import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import 'typeface-roboto';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link, withRouter } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ActivitiesInputs from './ActivitiesInputs';

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
      width: '100%',      
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



class Qa extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            isLoading: true,
            title: '',
            description: '',
            qa_type: '',
            job: '',
            customer: '',
            site_manager: '',            
            revision: '',
            unit_area: '',            
            foreman: '',
            location: '',
            comments: '',
            distribution: '',
            approved_name_1: '',
            approved_company_1: '',
            approved_position_1: '',
            approved_sign_1: '',

            approved_name_2: '',
            approved_company_2: '',
            approved_position_2: '',
            approved_sign_2: '',

            approved_name_3: '',
            approved_company_3: '',
            approved_position_3: '',
            approved_sign_3: '',

            approved_name_4: '',
            approved_company_4: '',
            approved_position_4: '',
            approved_sign_4: '',
            
            jobs: [],
            foremen: [],
            activities: []
        }
        
    }
        
    componentDidMount() {

        
          API.getAll("q_a_users/add/1")
        .then((data) => {            
            this.setState(() => ({
                activities: data.activities,
                foremen: data.foremen,
                jobs: data.jobs,
                qa_type: data.qa_type.id,
                description: data.qa_type.description,
                title: data.qa_type.title


            }))                    
        })    


        if (this.props.qa_id) {
            API.get('q_a_users', this.props.user_id)
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
    


    handleChange(event) {
        
        const { target: { name, value } } = event
        this.setState(() => ({
                [name]: value
            }));                
    }


    handleChangeActivity(event) {
                            
            
            //Get className
            let className = event.target.name.split("[")[0]
      
            let newActivities = this.state.activities.map((activity) => activity.id == event.target.id ? Object.assign({}, activity, {[className]: event.target.value}) : activity            
            )        

            this.setState({activities: newActivities}, () => console.log(this.state.activities))
        
    }

    handleSubmit(e) {
        e.preventDefault()
        API.save('q_a_users', this.state)
        .then((employee) => {            
            console.log(employee)
            //this.props.history.goBack()
        })

    }



    
    render () {
    
    return (
        <div>
        <Typography variant="h3" component="h2" className={this.props.classes.paper} style={{textAlign: 'center'}}>
            {this.props.action}
        </Typography>

        { (
            <Paper elevation={3} className={this.props.classes.paper}>
                <form className={this.props.classes.root} noValidate autoComplete="off" onSubmit={(e) => this.handleSubmit(e)}>
                <div>
                    <TextField required label="Type" value={this.state.title} variant="outlined" InputLabelProps={{ shrink: true}} name="description" onChange={(e) => this.handleChange(e)} type="text"/>                    
                    <TextField required label="Description" value={this.state.description} variant="outlined" InputLabelProps={{ shrink: true}} name="description" onChange={(e) => this.handleChange(e)} type="text"/>                    
                    <TextField required label="Date Of Update" value={this.state.update_date} variant="outlined" InputLabelProps={{ shrink: true}} name="update_date" onChange={(e) => this.handleChange(e)} type="date"/>
                    <TextField required label="Revision" value={this.state.revision} variant="outlined" InputLabelProps={{ shrink: true}} name="revision" onChange={(e) => this.handleChange(e)} type="number"/>
                    <TextField select label="Project" value={this.state.job} variant="outlined" name="job" onChange={(e) => this.handleChange(e)}>
                        <option value={''}>-</option>
                        {this.state.jobs.map(job => (
                            <option key={job.id} value={job.id}>{job.description}</option>
                        ))}
                                                
                    </TextField>

                    <TextField required label="Customer" value={this.state.customer} variant="outlined" InputLabelProps={{ shrink: true}} name="customer" onChange={(e) => this.handleChange(e)} type="text"/>                    
                    <TextField required label="Unit/Area No:" value={this.state.unit_area} variant="outlined" InputLabelProps={{ shrink: true}} name="unit_area" onChange={(e) => this.handleChange(e)} type="text"/>                    
                    <TextField required label="Site Manager:" value={this.state.site_manager} variant="outlined" InputLabelProps={{ shrink: true}} name="site_manager" onChange={(e) => this.handleChange(e)} type="text"/>                    
                    <TextField select label="Foreman" value={this.state.foreman} variant="outlined" name="foreman" onChange={(e) => this.handleChange(e)}>
                        {this.state.foremen.map(foreman => (
                            <option key={foreman.id} value={foreman.id}>{foreman.name}</option>
                        ))}
                                                
                    </TextField>
                    <TextField select label="Distribution" value={this.state.distribution} variant="outlined" name="distribution" onChange={(e) => this.handleChange(e)}>                    
                            <option value={'Builder'}>Builder</option>
                            <option value={'Client'}>Client</option>
                            <option value={'Reg Auth.'}>Reg Auth.</option>
                            <option value={'Engineer'}>Engineer</option>
                    
                                                
                    </TextField>
                    <TextField required label="Location" value={this.state.location} variant="outlined" InputLabelProps={{ shrink: true}} name="location" onChange={(e) => this.handleChange(e)} type="text"/>                    
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Activity</TableCell>
                                <TableCell>A/T</TableCell>
                                <TableCell>Criteria Requirements</TableCell>
                                <TableCell>Reference</TableCell>
                                <TableCell>Yes/No</TableCell>
                                <TableCell>Installed By</TableCell>
                                <TableCell>Checked  By</TableCell>
                                <TableCell>Date</TableCell>
                                

                                
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                <ActivitiesInputs activities={this.state.activities} handleChange={this.handleChangeActivity.bind(this)}/>
                            </TableBody>
                        </Table>
                    </TableContainer>                    
                    <div>
                        <ButtonGroup aria-label="outlined primary button group" style={{width: '80%', marginLeft: '10%'}}>
                            <Button variant="contained" color="secondary" style={{width: '50%', padding: '10px'}} component={Link} to={'/users'}>Cancel</Button>                    
                            <Button type="submit" variant="contained" color="primary" style={{width: '50%', padding: 10}}>Save</Button>
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

export default withRouter(withStyles(styles)(Qa));