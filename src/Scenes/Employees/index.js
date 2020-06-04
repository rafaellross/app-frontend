import React, { Component } from 'react'
import DataTable from '../../Components/DataTable'
import * as Helpers from '../../Helpers'

import Edit from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom'
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { connect } from 'react-redux'

import {
    handleUpdateEmployee,
    handleDeleteEmployee
 } from "../../Redux/Actions/employees";

export class Employees extends Component {
    constructor(props) {
        super(props)
        this.toggleColumn = this.toggleColumn.bind(this);
        this.changeCompany = this.changeCompany.bind(this);
        this.changeJob = this.changeJob.bind(this);
        this.state = {
            showInactive: false,
            selectedCompany: 'A',
            selectedJob: 'A',
            openDialogDisable: false,
            jobs: [],
            columns: [

                {  hidden: false, title: 'Name', field: 'name', render: rowData => <span>{Helpers.capitaliseString(rowData.name.toLowerCase())}</span> },
                { hidden: false, title: 'D.O.B', field: 'dob', type: 'date' },
                { hidden: false, title: 'Phone', field: 'phone' },
                { hidden: false, title: 'RDO', field: 'rdo_bal' },
                { hidden: false, title: 'PLD', field: 'pld' },
                { hidden: false, title: 'Annual Leave Balance', field: 'anl' },
                { hidden: false, title: 'Total Entitlements', field: 'entitlements' },
                {
                    hidden: false, title: 'Role',
                    field: 'location',
                    render: rowData => <span>{this.getRole(rowData.location)}</span>

                },
                { hidden: false, title: 'Job', field: 'job_code' },
                {
                    field: 'inactive',
                    hidden: false, title: 'Active?',
                    export: false,
                    render: rowData => (
                            <Switch
                                    checked={!Boolean(Number(rowData.inactive))}
                                    onChange={() => this.enableDisableEmployee(rowData)}
                                    color="primary"
                                    name="checkedB"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                    )
                },

                { hidden: false, title: 'Apprentice Year', field: 'apprentice_year' },
                { hidden: false, title: 'Apprentice Rollover', field: 'anniversary_dt', type: 'date' },
                {
                    field: 'edit',
                    hidden: false, title: 'Edit',
                    export: false,
                    render: rowData => (
                        <div>
                            <Link to={`/employees/edit/${rowData.id}`}><Edit /></Link>
                        </div>
                        )
                }


            ]
        }
    }

    toggleColumn(columnToggle) {
        let fields = this.state.columns.map((column) => column.field !== columnToggle ? column :
        Object.assign({}, column, {hidden: !column.hidden, export: column.export}));
        this.setState((prevState, props) => ({
            columns: fields
        }))
    }

    toggleInactives() {
        //Change show Inactive flag
        this.setState((prevState, props) => ({
            showInactive: !prevState.showInactive
        }))
    }

    enableDisableEmployee(employee) {

        this.props.dispatch(handleUpdateEmployee(
            Object.assign({}, employee, {inactive: Number(!Boolean(Number(employee.inactive))).toString()})
        ))
    }

    handleDelete = (selecteds) => {
        this.props.dispatch(handleDeleteEmployee(selecteds))
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

    getJobs(data) {
        return [...new Set(data.map(employee => employee.job_code))].sort()
    }

    filterCompany(data) {
        if (this.state.selectedCompany === 'A') {
            return data;
        } else {
            return data.filter(employee => employee.company === this.state.selectedCompany)
        }
    }

    filterInactives(data) {
        if (this.state.showInactive) {
            return data;
        } else {
            return data.filter(employee => employee.inactive === "0")
        }
    }


    filterJob(data) {
        if (this.state.selectedJob === 'A') {
            return data;
        } else {
            return data.filter(employee => employee.job_code === this.state.selectedJob)
        }
    }

    filterEmployees(data) {

        let filterInactives = this.filterInactives(data);
        let filterCompany = this.filterCompany(filterInactives);
        let filterJob = this.filterJob(filterCompany);
        return filterJob;
    }

    componentDidMount(){
        this.setState(() => ({
            jobs: this.getJobs(this.props.employees)
      }))
    }

    changeCompany(company) {
        this.setState(() => ({
            selectedCompany: company
        }))
    }

    changeJob(job) {
        this.setState(() => ({
            selectedJob: job
        }))
    }




    render() {
        const showInactive = <FormControlLabel value="inactives" control={<Switch checked={this.state.showInactive} onChange={(e) => this.toggleInactives(e)} color="primary" name="checkedB" inputProps={{ 'aria-label': 'primary checkbox' }}/>} label="Show Inactives" labelPlacement="bottom" />;
        return (
            <div>
                <DataTable
                    buttons={[{color: 'primary', path: '/employees/add'}]}
                    switch={showInactive}
                    filters={[
                        {
                            description: 'Select Company',
                            onChange: this.changeCompany,
                            value: this.state.selectedCompany,
                            options: [
                                {
                                    value: 'A',
                                    description: 'All'
                                },
                                {
                                    value: 'C',
                                    description: 'Construction'
                                },
                                {
                                    value: 'M',
                                    description: 'Maintenance'
                                },

                            ]
                        },
                        {
                            description: 'Select Job',
                            onChange: this.changeJob,
                            value: this.state.selectedJob,
                            options: [{value:'A', description: 'All'}].concat(this.props.jobs.map((job) => ({value: job.code, description: job.description})))
                        },
                    ]}
                    toggleColumn={this.toggleColumn}

                    style={{maxWidth: '90%', marginLeft: '5%'}}
                    columns={this.state.columns}
                    title="Employees"
                    data={this.filterEmployees(this.props.employees)}
                    isLoading={this.props.loading}
                    handleDelete={this.handleDelete}
                    />
            </div>
        )
    }
}



export default connect((state) => ({
    employees: state.employees,
    jobs: state.jobs,
    loading: state.loading
  }))(Employees)


