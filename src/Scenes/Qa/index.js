import React, { Component } from 'react'
import DataTable from '../../Components/DataTable'
import * as API from '../../Api'
import Print from '@material-ui/icons/Print';

import Edit from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom'
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Image from '@material-ui/icons/Image';
import HighlightOff from '@material-ui/icons/HighlightOff';
export class Qas extends Component {
    constructor(props) {
        super(props)
        this.toggleColumn = this.toggleColumn.bind(this);
        this.state = {
            columns: [

                { title: '#', field: 'id', type: 'numeric'},
                { title: 'username', field: 'username' },
                { title: 'Q.A Type', field: 'qa_type'},
                { title: 'Job', field: 'job'},
                { title: 'Customer', field: 'customer'},
                { title: 'Site Manager', field: 'site_manager'},
                { title: 'Update Date', field: 'updated_at'},
                {
                    field: 'edit',
                    title: 'Edit',
                    render: rowData => (
                        <div>
                            <Link to={`/qa/edit/${rowData.id}`}><Edit /></Link>
                        </div>
                        )
                } ,
                {
                    field: 'print_qa',
                    title: 'Print Q.A',
                    render: rowData => (
                        <div>
                            <Link to={`/qa/report/${rowData.id}`} target="_blank"><Print /></Link>
                        </div>
                        )
                } ,
                {
                    field: 'photos',
                    title: 'Photo',
                    render: rowData => (
                        <div>
                              {rowData.photos > 0 ? <Tooltip title={`This Q.A has ${rowData.photos} photo(s)`} aria-label="photo"><Image/></Tooltip> : <Tooltip title="No Photo" aria-label="photo"><HighlightOff color="secondary"/></Tooltip>}
                        </div>
                        )
                } ,




            ],
            jobs: [
            ],
            data: []
        }

    }

    loadData (table) {
        //console.log(this.props.match.params.job)
        API.getAll(table, this.props.match.params.job)
        .then((data) => {
            this.setState(() => ({
                data: data,
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
        this.loadData('q_a_users')

    }



    componentDidMount() {

        this.loadData('q_a_users')
    }

    render() {
        const buttons = <ButtonGroup aria-label="outlined primary button group" style={{minWidth: 200+'px', marginLeft: 10+'px'}}>
                            <Button variant="contained" color="primary" style={{width: '100%', padding: '10px'}} component={Link} to="/qa/add">Add</Button>
                        </ButtonGroup>

        const showInactive = <FormControlLabel value="inactives" control={<Switch checked={this.state.showInactive} onChange={(e) => this.toggleInactives(e)} color="primary" name="checkedB" inputProps={{ 'aria-label': 'primary checkbox' }}/>} label="Show Inactives" labelPlacement="bottom" />;

        const toolBar = <div>{buttons}{showInactive}</div>

        return (
            <div>
                <DataTable toggleColumn={this.toggleColumn} toolBar={toolBar} style={{maxWidth: '80%', marginLeft: '10%', padding: 10}} columns={this.state.columns} title={`Q.A Sign Off (${this.state.data.length})`} data={this.state.data} isLoading={this.state.loading}/>
            </div>
        )
    }
}

export default Qas
