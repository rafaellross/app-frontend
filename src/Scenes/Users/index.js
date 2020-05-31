import React, { Component } from 'react'
import DataTable from '../../Components/DataTable'

import Edit from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';

import { connect } from 'react-redux'
import {
    handleUpdateUser,
    handleDeleteUser
 } from "../../Redux/Actions/users";


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
                                checked={rowData.enabled === "1"}
                                onChange={() => this.enableDisableUser(rowData)}
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

    toggleInactives() {
        this.setState((prevState, props) => ({
            showInactive: !prevState.showInactive
        }))
    }

    filterInactives(data) {
        if (this.state.showInactive) {
            return data;
        } else {
            return data.filter(user => user.enabled === "1")

        }
    }

    toggleColumn(columnToggle) {

        let fields = this.state.columns.map((column) => column.field !== columnToggle ? column :
        Object.assign({}, column, {hidden: !column.hidden, export: column.export}));
        this.setState((prevState, props) => ({
            columns: fields
        }))
    }

    enableDisableUser(user) {
        this.props.dispatch(handleUpdateUser(
            Object.assign({}, user, {enabled: Number(!Boolean(Number(user.enabled))).toString()})
        ))
    }

    handleDelete = (selecteds) => {
        this.props.dispatch(handleDeleteUser(selecteds))
    }


    render() {

        return (
            <React.Fragment>
                <DataTable
                    buttons={[{color: 'primary', path: '/users/add'}]}
                    filters={[]}
                    toggleColumn={this.toggleColumn}
                    style={{maxWidth: '80%', marginLeft: '10%', padding: 10}}
                    columns={this.state.columns}
                    table={"users"}
                    title="Users"
                    data={this.filterInactives(this.props.users)}
                    isLoading={this.state.loading}
                    handleDelete={this.handleDelete}
                    />
            </React.Fragment>
        )
    }
}

export default connect((state) => ({
    users: state.users,
    loading: state.loading
  }))(Users)


