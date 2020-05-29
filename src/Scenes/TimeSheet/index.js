import React, { Component } from 'react'
import DataTable from '../../Components/DataTable'
import * as API from '../../Api'
import { Link } from 'react-router-dom'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import ButtonActions from '../../Components/Shared/ButtonActions'
import {
    withRouter
  } from 'react-router-dom'

export class TimeSheets extends Component {

    constructor(props) {
        super(props)

        this.state = {


            selectedJob: 'A',
            openDialogDisable: false,
            loading: true,
            jobs: [],
            selectedCompany: 'A',
            selecteds: [],
            columns: [

                { hidden: true, title: '#', field: 'id', width: 5},
                { hidden: false, title: 'User', field: 'username'},
                { hidden: false, title: 'Date', field: 'created_at', type: 'date' },
                { hidden: false, title: 'Employee', field: 'name' },
                { hidden: false, title: 'Total Hours', field: 'total' },
                { hidden: false, title: 'Hours 1.5', field: 'total_15' },
                { hidden: false, title: 'Hours 2.0', field: 'total_20' },
                { hidden: false, title: 'Week End', field: 'week_end' },
                { hidden: false, title: 'Job', field: 'job' },

                {
                    hidden: false, title: 'Integrated MYOB?',
                    field: 'integrated',
                    render: rowData => <span>{rowData.integrated === "1" ? 'Yes' : 'No'}</span>

                },
                { hidden: false, title: 'Integration Message', field: 'integration_message' },
                {
                    field: 'actions',
                    hidden: false, title: '',
                    export: false,
                    render: rowData => (
                        <ButtonActions linkToPrint={`/timesheets/print/${rowData.id}`} linkToEdit={`/timesheets/edit/${rowData.id}`} action={() => ({})}/>

                    )
                }

            ],
            timeSheets: [
            ],
            data: []
        }
        this.handlePrint = this.handlePrint.bind(this);
    }

    loadData(table) {
        API.getAll(table)
        .then((timesheets) => {
            this.setState(() => ({
                data: timesheets,
                timesheets: timesheets,
                loading: false,
                jobs: this.getJobs(timesheets)
          }))
        })
    }

    getJobs(data) {
        return [...new Set(data.map(timesheet => timesheet.job))].sort()
    }

    handlePrint(selecteds) {

        const idsToPrint = selecteds.map(item => item.id);
        this.props.history.push({
            pathname: '/timesheets/print',
            state: { timesheets: idsToPrint }
          })



    }

    componentDidMount() {
        this.loadData('timesheets')
    }

    toggleColumn(columnToggle) {

        let fields = this.state.columns.map((column) => column.field !== columnToggle ? column :
        Object.assign({}, column, {hidden: !column.hidden, export: column.export}));
        this.setState((prevState, props) => ({
            columns: fields
        }))
    }

    filterJob(data, job) {
        if (job === 'A') {
            console.log('Returned all Jobs');
            return data;
        } else {
            console.log('Returned Job', job);
            return data.filter(timesheet => timesheet.job === job)
        }
    }

    filterCompany(data, company) {
        console.log('Filter company', company);
        if (company === 'A') {
            console.log('Returned all companies');
            return data;
        } else {
            console.log('Returned Company', company);
            return data.filter(timesheet => timesheet.company === company)
        }
    }

    changeCompany(company) {
        console.log(this.filterJob(this.state.timeSheets, company))
        this.setState((prevState, props) => ({
            selectedCompany: company,
            timesheets: this.filterTimeSheet(prevState.data, prevState.selectedJob, company)
        }))
    }

    changeJob(job) {
        console.log('Method change job: ', job);
        this.setState((prevState, props) => ({
            selectedJob: job,
            timesheets: this.filterTimeSheet(prevState.data, job, prevState.selectedCompany)
        }))

    }

    filterTimeSheet(data, job, company) {

        let filterCompany = this.filterCompany(data, company);
        let filterJob = this.filterJob(filterCompany, job);
        return filterJob;
    }

    render() {

        const buttons = <ButtonGroup aria-label="outlined primary button group" style={{minWidth: 200+'px', marginLeft: 10+'px'}}>
                            <Button variant="contained" color="primary" style={{width: '100%', padding: '10px'}} component={Link} to={'/employees/add '}>Add</Button>
                        </ButtonGroup>


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


        const toolBar = <div>{buttons} {selectJob} {selectCompany}</div>



        return (
            <React.Fragment>
                <DataTable handlePrint={this.handlePrint} toggleColumn={this.toggleColumn} toolBar={toolBar} style={{maxWidth: '90%', marginLeft: '5%'}} columns={this.state.columns} table={"timesheets"} title="Time Sheets" data={this.state.timesheets} isLoading={this.state.loading}/>
            </React.Fragment>
        )
    }
}

export default  withRouter(TimeSheets)
