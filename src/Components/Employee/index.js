import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import 'typeface-roboto';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link, withRouter } from "react-router-dom";

import { connect } from 'react-redux'

import {
    handleUpdateEmployee,
    handleAddEmployee
 } from "../../Redux/Actions/employees";

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



class Employee extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            id: null,
            name: '',
            dob: '',
            phone: '',
            bonus: '',
            bonus_type: '',
            rdo_bal: '',
            pld: '',
            anl: '',
            anniversary_dt: '',
            apprentice_year: '',
            location: '',
            company: '',
            inactive: '0',
        }
    }

    componentDidMount() {

        if (this.props.type === "edit") {
            const employee = this.props.employee
            this.setState(() => ({
                id: employee.id,
                name: employee.name,
                dob: employee.dob,
                phone: employee.phone,
                bonus: employee.bonus,
                car_allowance: employee.car_allowance,
                bonus_type: employee.bonus_type,
                rdo_bal: employee.rdo_bal,
                pld: employee.pld,
                anl: employee.anl,
                anniversary_dt: employee.anniversary_dt,
                apprentice_year: employee.apprentice_year,
                location: employee.location,
                company: employee.company,
                inactive: employee.inactive
                //Loading

            }))
        }

    }


    handleSave(state) {
        if (this.props.type === "edit") {
            this.props.dispatch(handleUpdateEmployee(state))
        } else {
            this.props.dispatch(handleAddEmployee(state))
        }
        this.props.history.goBack()
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


            <Paper elevation={3} className={this.props.classes.paper}>
                <form className={this.props.classes.root} noValidate autoComplete="off">
                <div>
                    <TextField required label="Name" value={this.state.name} variant="outlined" InputLabelProps={{ shrink: true}} name="name" onChange={(e) => this.handleChange(e)}/>

                    <TextField id="dob" label="D.O.B" type="date" variant="outlined" value={this.state.dob} InputLabelProps={{ shrink: true}} name="dob" onChange={(e) => this.handleChange(e)}/>

                    <TextField id="phone" label="Phone" variant="outlined" value={this.state.phone ? this.state.phone : '' } InputLabelProps={{ shrink: true}} name="phone" onChange={(e) => this.handleChange(e)}/>

                    <TextField id="bonus" label="Bonus" name="bonus" type="number" variant="outlined" value={this.state.bonus} InputLabelProps={{ shrink: true}} onChange={(e) => this.handleChange(e)}/>

                    <TextField id="bonus_type" select label="Bonus Type" value={this.state.bonus_type ? this.state.bonus_type : ''}
                    variant="outlined" name="bonus_type" onChange={(e) => this.handleChange(e)}>
                        <option key={'N'} value={'N'}>None</option>
                        <option key={'F'} value={'F'}>Foremen</option>
                        <option key={'L'} value={'L'}>Leading Hand</option>
                    </TextField>
                    <TextField id="car_allowance" label="Car Allowance" name="car_allowance" type="number" variant="outlined" value={this.state.car_allowance ? this.state.car_allowance : ''} InputLabelProps={{ shrink: true}}onChange={(e) => this.handleChange(e)}/>
                    <TextField id="rdo_bal" label="RDO Balance" name="rdo_bal" type="number" variant="outlined" value={this.state.rdo_bal} InputLabelProps={{ shrink: true}} onChange={(e) => this.handleChange(e)}/>
                    <TextField id="pld" label="PLD Balance" name="pld" type="number" variant="outlined" value={this.state.pld} InputLabelProps={{ shrink: true}} onChange={(e) => this.handleChange(e)}/>
                    <TextField id="anl" label="Annual Leave Balance" name="anl" type="number" variant="outlined" value={this.state.anl} InputLabelProps={{ shrink: true}} onChange={(e) => this.handleChange(e)}/>
                    <TextField id="anniversary_dt" label="Apprentice Anniversary Date" type="date" variant="outlined" value={this.state.anniversary_dt === null ? '' : this.state.anniversary_dt} InputLabelProps={{ shrink: true}} name="anniversary_dt" onChange={(e) => this.handleChange(e)}/>
                    <TextField id="apprentice_year" select label="Apprentice Year" value={this.state.apprentice_year === null ? '' : this.state.apprentice_year}
                    variant="outlined" name="apprentice_year" onChange={(e) => this.handleChange(e)}>
                        <option key={''} value={''}>-</option>
                        <option key={'1'} value={'1'}>1st</option>
                        <option key={'2'} value={'2'}>2nd</option>
                        <option key={'3'} value={'3'}>3rd</option>
                        <option key={'4'} value={'4'}>4rd</option>
                    </TextField>
                    <TextField id="role" select label="Role" value={this.state.location}
                    variant="outlined" name="location" onChange={(e) => this.handleChange(e)}>
                        <option key={'P'} value={'P'}>Plumber</option>
                        <option key={'A'} value={'A'}>Apprentice</option>
                        <option key={'O'} value={'O'}>Office</option>
                        <option key={'L'} value={'L'}>Labourer</option>

                    </TextField>
                    <TextField id="company" select label="Company" value={this.state.company}
                     variant="outlined" name="company" onChange={(e) => this.handleChange(e)}>
                        <option key={'C'} value={'C'}>Construction</option>
                        <option key={'M'} value={'M'}>Maintenance</option>
                    </TextField>
                    <TextField id="inactive" select label="Inactive?" value={this.state.inactive}
                    variant="outlined" name="inactive" onChange={(e) => this.handleChange(e)}>
                        <option key={'1'} value={'1'}>Yes</option>
                        <option key={'0'} value={'0'}>No</option>
                    </TextField>
                    <div>
                        <ButtonGroup aria-label="outlined primary button group" style={{width: '80%', marginLeft: '10%'}}>
                            <Button variant="contained" color="secondary" style={{width: '50%', padding: '10px'}} component={Link} to={'/employees'}>Cancel</Button>
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


export default connect()(withRouter(withStyles(styles)(Employee)))


