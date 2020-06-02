import React, { Component } from 'react'

import Fireplace from '@material-ui/icons/Fireplace';

import Edit from '@material-ui/icons/Edit';
import Beenhere from '@material-ui/icons/Beenhere';
import { Link } from 'react-router-dom'
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux'
import {
    handleUpdateJob,
    handleDeleteJob
 } from "../../Redux/Actions/jobs";
import DataTableDetails from '../../Components/DataTable/DataTableDetails';



const DataTable = React.lazy(() => import('../../Components/DataTable'));
export class Jobs extends Component {
    constructor(props) {
        super(props)
        this.toggleColumn = this.toggleColumn.bind(this);
        this.state = {
            columns: [

                { title: '#', field: 'id', type: 'numeric'},
                { title: 'Code', field: 'code' },
                { title: 'Description', field: 'description'},
                { title: 'Address', field: 'address'},
                {
                    field: 'inactive',
                    title: 'Active Job?',
                    render: rowData => (
                        <Switch
                            checked={rowData.inactive === "1" ? false : true}
                            onChange={() => this.enableDisableJob(rowData)}
                            color="primary"
                            name="checkedB"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                    )
                },
                {
                    field: 'edit',
                    title: 'Edit',
                    render: rowData => (
                        <div>
                            <Link to={`/jobs/edit/${rowData.id}`}><Edit /></Link>
                        </div>
                        )
                } ,
                {
                    field: 'employees',
                    title: 'Qty Employees',
                    sorting: true,
                    render: rowData => (
                        this.props.employees.filter(employee => employee.job_code === rowData.code).length
                    )
                } ,

                {
                    field: 'fire_register',
                    title: 'Fire Register',
                    render: rowData => (
                        <div>
                            <Link to={`/jobs/penetrations/${rowData.id}`}><Fireplace /></Link>
                        </div>
                        )
                } ,

                {
                    field: 'qas',
                    title: 'Q.A',
                    render: rowData => (
                        <div>
                            <Link to={`/jobs/qas/${rowData.id}`}><Beenhere /></Link>
                        </div>
                        )
                } ,
            ],
        }
    }

    filterInactives(data) {
        if (this.state.showInactive) {
            return data;
        } else {
            return data.filter(job => job.inactive === "0")
        }
    }

    toggleColumn(columnToggle) {
        let fields = this.state.columns.map((column) => column.field !== columnToggle ? column :
        Object.assign({}, column, {hidden: !column.hidden, export: column.export}));
        this.setState((prevState, props) => ({
            columns: fields
        }))
    }

    enableDisableJob(job) {
        this.props.dispatch(handleUpdateJob(
            Object.assign({}, job, {inactive: Number(!Boolean(Number(job.inactive))).toString()})
        ))
    }

    toggleInactives() {
        this.setState((prevState, props) => ({
            showInactive: !prevState.showInactive
        }))
    }

    handleDelete = (selecteds) => {
        this.props.dispatch(handleDeleteJob(selecteds))

    }
    render() {
        const detailPanel=[
            {
              tooltip: 'Show Job',
              render: rowData => {
                return (
                  <div
                    style={{
                      fontSize: 100,
                      textAlign: 'center',
                    }}
                  >
                      <DataTableDetails
                        columns={[
                            {
                                name: 'id',
                                title: '#'
                            },
                            {
                                name: 'name',
                                title: 'Name'
                            },
                            {
                                name: 'dob',
                                title: 'D.O.B'
                            },
                            {
                                name: 'phone',
                                title: 'Phone'
                            },
                            {
                                name: 'rdo_bal',
                                title: 'RDO'
                            },
                            {
                                name: 'pld',
                                title: 'PLD'
                            },
                            {
                                name: 'anl',
                                title: 'Annual Leave'
                            },
                            {
                                name: 'sick_bal',
                                title: 'Sick Leave'
                            }


                        ]}
                        rows={this.props.employees.filter(employee => employee.job_code === rowData.code)}
                      />
                  </div>
                )
              },
            },
          ]

        return (
            <React.Suspense fallback={<h1>Loading</h1>}>
                    <DataTable
                        buttons={[{color: 'primary', path: '/jobs/add'}]}
                        filters={[]}
                        detailPanel={detailPanel}
                        toggleColumn={this.toggleColumn}
                        style={{maxWidth: '100%', marginLeft: '0%', padding: 10}}
                        columns={this.state.columns} table={"jobs"}
                        title={"Jobs"}
                        data={this.filterInactives(this.props.jobs)}
                        handleDelete={this.handleDelete}
                        isLoading={this.props.loading}
                        />
            </React.Suspense>
        )
    }
}

export default connect((state) => ({
    jobs: state.jobs,
    employees: state.employees,
    loading: state.loading
  }))(Jobs)


