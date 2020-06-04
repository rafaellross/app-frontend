import React, { Component } from 'react'
import DataTable from '../../Components/DataTable'

import ButtonActions from '../../Components/Shared/ButtonActions'
import {
    withRouter
  } from 'react-router-dom'
import { connect } from 'react-redux'

export class TimeSheets extends Component {

    constructor(props) {
        super(props)
        this.toggleColumn = this.toggleColumn.bind(this);
        this.changeCompany = this.changeCompany.bind(this);
        this.changeJob = this.changeJob.bind(this);

        this.state = {
            selectedJob: 'A',
            openDialogDisable: false,
            loading: true,
            jobs: [],
            selectedCompany: 'A',
            selecteds: [],
            columns: [
                { hidden: true, title: '#', field: 'id', width: 5,  cellStyle: {width: 2}},
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
            ]
        }
        this.handlePrint = this.handlePrint.bind(this);
    }

    componentDidMount(){
        this.setState(() => ({
            jobs: this.getJobs(this.props.timesheets)
      }))
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

    toggleColumn(columnToggle) {

        let fields = this.state.columns.map((column) => column.field !== columnToggle ? column :
        Object.assign({}, column, {hidden: !column.hidden, export: column.export}));
        this.setState((prevState, props) => ({
            columns: fields
        }))
    }

    filterJob(data) {
        if (this.state.selectedJob === 'A') {

            return data;
        } else {

            return data.filter(timesheet => timesheet.job === this.state.selectedJob)
        }
    }

    filterCompany(data) {
        if (this.state.selectedCompany === 'A') {
            return data;
        } else {
            return data.filter(timesheet => timesheet.company === this.state.selectedCompany)
        }
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

    filterTimeSheet(data) {

        let filterCompany = this.filterCompany(data);
        let filterJob = this.filterJob(filterCompany);
        return filterJob;
    }

    render() {

        return (
                <DataTable
                    buttons={[{color: 'primary', path: '/timesheets/add'}]}
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
                            options: [{value:'A', description: 'All'}].concat(this.props.jobsList)
                        },
                    ]}
                    handlePrint={this.handlePrint}
                    toggleColumn={this.toggleColumn}
                    style={{maxWidth: '90%', marginLeft: '5%'}}
                    columns={this.state.columns}
                    title="Time Sheets"
                    data={this.filterTimeSheet(this.props.timesheets)}
                    isLoading={this.state.loading}
                />
        )
    }
}

export default connect((state) => ({
    timesheets: state.timesheets,
    jobsList: [...new Set(state.timesheets.map(timesheet => timesheet.job))].sort().map(job => (
        {
            value: job,
            description: job
        }
    )),
    loading: state.loading
  }))(withRouter(TimeSheets))


