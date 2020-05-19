import React, { Component } from 'react'
import DataTable from '../../Components/DataTable'
import * as API from '../../Api'
import IconButton from '@material-ui/core/IconButton';
import Block from '@material-ui/icons/Block';
import Edit from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


export class Users extends Component {
    constructor(props) {
        super(props)
        this.toggleColumn = this.toggleColumn.bind(this);
        this.state = {
            showInactive: false,
            columns: [
                    
                { title: '#', field: 'id', type: 'numeric'},
                { title: 'Name', field: 'name' },
                { title: 'User', field: 'username' },
                { title: 'Administrator', field: 'description', render: rowData => rowData.administrator ? 'Yes' : 'No'},
                { title: 'Date Created', field: 'created_at', type: 'date'},
                {
                    field: 'inactive',
                    title: 'Active?',                
                    render: rowData => (
                        <Switch
                                checked={rowData.enabled === 1 || rowData.enabled ? true : false}
                                onChange={() => this.enableDisableUser(rowData.id)}
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
                            <Link to={`/users/edit/${rowData.id}`}><Edit /></Link>                        
                        </div>
                        )
                }            
    
                
            ],        
            data: [
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

    componentDidMount() {
        this.loadData('users');

    }

    updateUser(user) {
        console.log(user);
        
        API.update('users', user)
        .then(
            this.loadData('users')
        )
        
    }

    toggleInactives() {        
        console.log('toggle')
        this.setState((prevState, props) => ({
            showInactive: !prevState.showInactive            
        }))                
        this.loadData('users')

    }    

    filterInactives(data) {
        if (this.state.showInactive) {            
            return data;
        } else {
            return data.filter(user => user.enabled)
            
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


    enableDisableUser(id) {
        
        let users = this.state.data.map((user) => user.id !== id ? user :     
        Object.assign({}, user, {enabled: !user.enabled, password: user.password, password_confirmation: user.password}));        
        this.setState(() => ({
            data: this.filterInactives(users)            
        }))                
        
        API.update('users', users.filter(user => user.id === id)[0])
        .then((user) => {
            console.log(user)
        })
    }

    render() {
        const buttons = <ButtonGroup aria-label="outlined primary button group" style={{minWidth: 200+'px', marginLeft: 10+'px'}}>
                            <Button variant="contained" color="primary" style={{width: '100%', padding: '10px'}} component={Link} to="/users/add">Add</Button>                                                
                        </ButtonGroup>

        const showInactive = <FormControlLabel value="inactives" control={<Switch checked={this.state.showInactive} onChange={(e) => this.toggleInactives(e)} color="primary" name="checkedB" inputProps={{ 'aria-label': 'primary checkbox' }}/>} label="Show Inactives" labelPlacement="bottom" />;

        const toolBar = <div>{buttons}{showInactive}</div>

        return (
            <React.Fragment>                
                <DataTable toggleColumn={this.toggleColumn} toolBar={toolBar} style={{maxWidth: '80%', marginLeft: '10%', padding: 10}} columns={this.state.columns} table={"users"} title="Users" data={this.state.data} isLoading={this.state.loading}/>
            </React.Fragment>                
        )
    }
}

export default Users


