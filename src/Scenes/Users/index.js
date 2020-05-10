import React, { Component } from 'react'
import DataTable from '../../Components/DataTable'
import * as API from '../../Api'
import IconButton from '@material-ui/core/IconButton';
import Block from '@material-ui/icons/Block';
import Edit from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
export class Users extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            columns: [
                    
                { title: '#', field: 'id', type: 'numeric'},
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
                data: data,
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

    enableDisableUser(id) {
        
        let users = this.state.data.map((user) => user.id !== id ? user :     
        Object.assign({}, user, {enabled: !user.enabled}));        
        this.setState(() => ({
            data: users            
        }))                
        
        API.update('users', users.filter(user => user.id === id)[0])
        .then((user) => {
            console.log(user)
        })
    }

    render() {
        return (
            <div>
                <DataTable style={{maxWidth: '80%', marginLeft: '10%', padding: 10}} columns={this.state.columns} table={"users"} title="Users" data={this.state.data} isLoading={this.state.loading}/>
            </div>
        )
    }
}

export default Users


