import React, { Component } from 'react'
import DataTable from '../../Components/DataTable'
import * as API from '../../Api'
import * as Helpers from '../../Helpers'
import IconButton from '@material-ui/core/IconButton';
import Block from '@material-ui/icons/Block';
import Edit from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom'
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import ButtonGroup from '@material-ui/core/ButtonGroup';




function dialogDisableEmployee(id) {
    
}

export class Employees extends Component {
    constructor(props) {
        super(props)
        this.toggleColumn = this.toggleColumn.bind(this);
        this.state = {
            showInactive: false,
            selectedCompany: 'A',
            selectedJob: 'A',
            openDialogDisable: false,
            jobs: [],
            columns: [
                    
                { hidden: true, title: '#', field: 'id', width: 5},
                { hidden: false, title: 'Name', field: 'name', render: rowData => <span>{Helpers.capitaliseString(rowData.name.toLowerCase())}</span> },
                { hidden: false, title: 'D.O.B', field: 'dob', type: 'date' },
                { hidden: false, title: 'Phone', field: 'phone' },
                { hidden: false, title: 'RDO', field: 'rdo_bal' },
                { hidden: false, title: 'PLD', field: 'pld' },            
                { hidden: false, title: 'Annual Leave Balance', field: 'anl' },                            
                { 
                    hidden: false, title: 'Role', 
                    field: 'location',
                    render: rowData => <span>{this.getRole(rowData.location)}</span>
                    
                },    
                { hidden: false, title: 'Apprentice Year', field: 'apprentice_year' },                                                            
                { hidden: false, title: 'Apprentice Rollover', field: 'anniversary_dt', type: 'date' },                                                                            
                {
                    field: 'inactive',
                    hidden: false, title: 'Active?',  
                    export: false,              
                    render: rowData => (
                        <Switch
                                checked={rowData.inactive === 1 || rowData.inactive ? false : true}
                                onChange={() => this.enableDisableEmployee(rowData.id)}
                                color="primary"
                                name="checkedB"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />                        
                    )                    
                
                },
                { hidden: false, title: 'Job', field: 'job_code' },                                                            
                {
                    field: 'edit',
                    hidden: false, title: 'Edit',
                    export: false,
                    render: rowData => (
                        <div>
                            <Link to={`/employees/${rowData.id}`}><Edit /></Link>                        
                        </div>
                        )
                }            
    
                
            ],        
            employees: [
            ]
        }
    }
    
    toggleColumn(columnToggle) {
        
        console.log(columnToggle, 'chegou')
        
        
        let fields = this.state.columns.map((column) => column.field !== columnToggle ? column :     
        Object.assign({}, column, {hidden: !column.hidden, export: column.export}));        
        this.setState((prevState, props) => ({
            columns: fields
        }))                
    }

    toggleInactives() {        
        this.setState((prevState, props) => ({
            showInactive: !prevState.showInactive            
        }))                
        this.loadData('employees')

    }


    handleDialog() {
        //TODO
    }

    enableDisableEmployee(id) {
              
        let employees = this.state.data.map((employee) => employee.id !== id ? employee :     
        Object.assign({}, employee, {inactive: !employee.inactive}));        
        this.setState(() => ({
            data: this.filterEmployees(employees)
        }))                
        
        API.update('employees', employees.filter(employee => employee.id === id)[0])
        .then((employee) => {
            console.log(employee)
        })
    }


    getRole(role){
        switch (role) {
            case 'P':                
                return 'Plumber';                                
            case 'O':
                return 'Office'

            case 'A':
                return 'Apprentice';
            case 'L':
                return 'Labourer';                
            default:
                return '-';
        }

    }

    loadData(table) {
        API.getAll(table)
        .then((data) => {            
            this.setState(() => ({
                data: this.filterEmployees(data),
                loading: false,
                jobs: this.getJobs(data)
          }))                    
        })    
    }

    getJobs(data) {
        return [... new Set(data.map(employee => employee.job_code))].sort()
    }

    filterCompany(data) {
        console.log('Filter company', this.state.selectedCompany);
        if (this.state.selectedCompany === 'A') {
            console.log('Returned all companies');
            return data;
        } else {
            console.log('Returned Company', this.state.selectedCompany);
            return data.filter(employee => employee.company === this.state.selectedCompany)
        }        
    }

    filterInactives(data) {
        if (this.state.showInactive) {
            return data;
        } else {
            return data.filter(employee => !employee.inactive)
        }
    }


    filterJob(data) {
        console.log('Filter Job', this.state.selectedJob);
        if (this.state.selectedJob === 'A') {
            console.log('Returned all Jobs');
            return data;
        } else {
            console.log('Returned Job', this.state.selectedJob);
            return data.filter(employee => employee.job_code === this.state.selectedJob)
        }        
    }



    filterEmployees(data) {

        let filterInactives = this.filterInactives(data);
        let filterCompany = this.filterCompany(filterInactives);
        let filterJob = this.filterJob(filterCompany);
        return filterJob; 
    }

    update(model){
        API.update('employees', model)
        .then((data) => {            
            console.log(data)
        })    

    }

    componentDidMount(){
        this.loadData('employees')
    }

    changeCompany(company) {
        this.setState(() => ({
            selectedCompany: company
        }))   
        
        this.loadData('employees')
    }

    changeJob(job) {
        console.log('Method change job: ', job);
        this.setState(() => ({
            selectedJob: job
        }))   
        
        this.loadData('employees')
    }




    render() {
        
        const buttons = <ButtonGroup aria-label="outlined primary button group" style={{minWidth: 200+'px', marginLeft: 10+'px'}}>
                            <Button variant="contained" color="primary" style={{width: '100%', padding: '10px'}} component={Link} to={'/employees/add '}>Add</Button>                                                
                        </ButtonGroup>

        const showInactive = <FormControlLabel value="inactives" control={<Switch checked={this.state.showInactive} onChange={(e) => this.toggleInactives(e)} color="primary" name="checkedB" inputProps={{ 'aria-label': 'primary checkbox' }}/>} label="Show Inactives" labelPlacement="bottom" />;
        const selectCompany =     <FormControl style={{width: 200}} >
                                        <InputLabel id="demo-simple-select-label">Select Company</InputLabel>
                                        <Select
                                        labelId="select-company-label"                                        
                                        id="select-company-label"                                        
                                        onChange={(e) => this.changeCompany(e.target.value)}
                                        value={this.state.selectedCompany}
                                        >
                                        <MenuItem value="A">All</MenuItem>
                                        <MenuItem value='C'>Construction</MenuItem>
                                        <MenuItem value='M'>Maintenance</MenuItem>
                                        </Select>
                                    </FormControl>

        const selectJob =     <FormControl style={{width: 200}} >
                                        <InputLabel id="demo-simple-select-label">Select Job</InputLabel>
                                        <Select
                                        labelId="select-job-label"                                        
                                        id="select-job-label"                                        
                                        onChange={(e) => this.changeJob(e.target.value)}
                                        value={this.state.selectedJob}
                                        >
                                        <MenuItem value="A">All</MenuItem>
                                        {this.state.jobs.map(job => {
                                           return (<MenuItem key={job} value={job}>{job}</MenuItem>)
                                        })}
                                        

                                        </Select>
                                    </FormControl>


        const toolBar = <div>{buttons}{showInactive}{selectCompany}{selectJob}</div>

        const dialog = 
            
                <div>                            
                  <Dialog
                    open={this.state.openDialogDisable}
                    
                    
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                  >
                    <DialogTitle id="scroll-dialog-title">Inactivate Employee</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Are you sure you want to inactivate this employee?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => this.handleDialog(false)} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={() => this.handleDialog(true)} color="primary">
                        Ok
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>

        return (
            <div>
                <DataTable toggleColumn={this.toggleColumn} toolBar={toolBar} style={{maxWidth: '90%', marginLeft: '5%'}} columns={this.state.columns} table={"employees"} title="Employees" data={this.state.data} isLoading={this.state.loading}/>
                {dialog}
            </div>
        )
    }
}

export default Employees

