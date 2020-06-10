import React, { useEffect, useState } from 'react'
import DataTable from '../../Components/DataTable/DataTable'
import * as API from './ApiCostX'

export default function Costx() {

    const columns = [
        {
            title: '#', field: 'projkey'
        },
        {
            title: 'Project', field: 'name'
        },
        {
            title: 'Date Added', field: 'dateadd', type: 'date'
        }
    ]

    const [projects, setProjects] = useState([])
    useEffect(() => {
        API.getAll('projects')
        .then((data) => {
            setProjects(data)
        })
      });

    return (
        <DataTable
        addPath={'/employees/add'}

        filters={[]}
        toggleColumn={this.toggleColumn}

        style={{maxWidth: '100%'}}
        columns={this.state.columns}
        title="Employees"
        data={this.filterEmployees(this.props.employees)}
        isLoading={this.props.loading}
        handleDelete={this.handleDelete}
        />
    )
}
