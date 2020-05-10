import React, { Component } from 'react'
import DataTable from '../../Components/DataTable'
import * as API from '../../Api'
import Fireplace from '@material-ui/icons/Fireplace';

import Edit from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom'
import Switch from '@material-ui/core/Switch';

export class Jobs extends Component {
    constructor(props) {
        super(props)
    
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
                                checked={rowData.inactive === 1 || rowData.inactive ? false : true}
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
                            <Link to={`/reports/jobs/fire/${rowData.id}`}><Fireplace /></Link>                        
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
                data: data,
                loading: false
          }))                    
        })    
    }

    enableDisableJob(id) {
        
        let jobs = this.state.data.map((job) => job.id !== id ? job :     
        Object.assign({}, job, {inactive: !job.inactive}));        
        this.setState(() => ({
            data: jobs            
        }))                
        
        API.update('jobs', jobs.filter(job => job.id === id)[0])
        .then((job) => {
            console.log(job)
        })
    }


    componentDidMount() {
        this.loadData('jobs')
    }

    render() {
        return (
            <div>
                <DataTable style={{maxWidth: '80%', marginLeft: '10%', padding: 10}} columns={this.state.columns} table={"jobs"} title="Jobs" data={this.state.data} isLoading={this.state.loading}/>
            </div>
        )
    }
}

export default Jobs


