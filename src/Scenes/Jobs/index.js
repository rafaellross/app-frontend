import React, { Component } from 'react'




import * as API from '../../Api'
import Fireplace from '@material-ui/icons/Fireplace';

import Edit from '@material-ui/icons/Edit';
import Beenhere from '@material-ui/icons/Beenhere';


import { Link } from 'react-router-dom'
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


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
                                onChange={() => this.enableDisableJob(rowData.id)}
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
            jobs: [
            ]
        }

    }

    loadData (table) {
        API.getAll(table)
        .then((data) => {
            this.setState(() => ({
                data: this.filterInactives(data),
                loading: false
          }))
        })
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

    enableDisableJob(id) {

        let jobs = this.state.data.map((job) => job.id !== id ? job :
        Object.assign({}, job, {inactive: !job.inactive}));
        this.setState(() => ({
            data: this.filterInactives(jobs)
        }))

        API.update('jobs', jobs.filter(job => job.id === id)[0])
        .then((job) => {
            console.log(job)
        })
    }

    toggleInactives() {
        this.setState((prevState, props) => ({
            showInactive: !prevState.showInactive
        }))
        this.loadData('jobs')

    }



    componentWillMount() {
        this.loadData('jobs')
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.data !== nextState.data;
      }

    render() {
        const buttons = <ButtonGroup aria-label="outlined primary button group" style={{minWidth: 200+'px', marginLeft: 10+'px'}}>
                            <Button variant="contained" color="primary" style={{width: '100%', padding: '10px'}} component={Link} to="/jobs/add">Add</Button>
                        </ButtonGroup>

        const showInactive = <FormControlLabel value="inactives" control={<Switch checked={this.state.showInactive} onChange={(e) => this.toggleInactives(e)} color="primary" name="checkedB" inputProps={{ 'aria-label': 'primary checkbox' }}/>} label="Show Inactives" labelPlacement="bottom" />;

        const toolBar = <div>{buttons}{showInactive}</div>

        return (
            <React.Suspense fallback={<h1>Loading</h1>}>
                <div>
                    <DataTable toggleColumn={this.toggleColumn} toolBar={toolBar} style={{maxWidth: '80%', marginLeft: '10%', padding: 10}} columns={this.state.columns} table={"jobs"} title="Jobs" data={this.state.data} isLoading={this.state.loading}/>
                </div>

            </React.Suspense>
        )
    }
}

export default Jobs


