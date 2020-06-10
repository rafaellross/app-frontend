import React, { useEffect, useState } from 'react'
import DataTable from '../../Components/DataTable/DataTable'
import * as API from './ApiCostX'

export default function Costx() {

    const columns = [
        {
            title: 'Project Key', field: 'projkey'
        },
        {
            title: 'Project', field: 'name'
        },
        {
            title: 'Date Added', field: 'dateadd', type: 'date'
        }
    ]

    const [projects, setProjects] = useState([])
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        loadProjects()
    });

    const loadProjects = () => {
        if (!loaded) {
            API.getAll('projects')
            .then((data) => {
                setProjects(data)
            })
            .catch(() => {
                setProjects([])
            })
            setLoaded(true)
        }

    }

    const handleImport = (data) => {
        data.forEach(element => {
            console.log(element.projkey)
        });
    }

    return (
        <DataTable
        filters={[]}
        style={{maxWidth: '100%'}}
        columns={columns}
        title="Estimates On CostX"
        data={projects}
        isLoading={false}
        import={true}
        handleImport={handleImport}

        />
    )
}
