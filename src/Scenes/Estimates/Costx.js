import React, { useEffect, useState } from 'react'
import DataTable from '../../Components/DataTable/DataTable'
import * as ApiCostX from './ApiCostX'
import * as API from '../../Api'

export default function Costx() {

    const columns = [
        {
            title: 'Project Key', field: 'external_id'
        },
        {
            title: 'Project', field: 'name'
        },
        {
            title: 'Date Added', field: 'add_dt', type: 'date'
        }
    ]

    const [projects, setProjects] = useState([])
    const [details, setDetails] = useState([])
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        loadProjects()
    });

    const loadProjects = () => {
        if (!loaded) {
            ApiCostX.getAll('projects')
            .then((data) => {
                setProjects(data)
            })
            .catch(() => {
                setProjects([])
            })
            setLoaded(true)
        }

    }

    const refresh = () => {
        ApiCostX.getAll('projects')
        .then((data) => {
            setProjects(data)
        })
        .catch(() => {
            setProjects([])
        })
        setLoaded(true)
    }

    const handleImport = (data) => {

        data.forEach(project => {
            //Import Estimate to API
            API.importEstimate(project)
            .then((estimate) =>{
                //Get Estimate Details from costx
                ApiCostX.getAll('projects', estimate.external_id)
                .then((details) => {
                    //Put details into API
                    API.importEstimateDetails({estimate: estimate.id, details: details})
                    .then((estimate_details) =>{
                        console.log(estimate_details)
                    })
                })
            })
        });
    }

    const getEstimateDetails = (external_id) => {
        let measurements = []
        ApiCostX.getAll('projects', external_id)
        .then((data) => {
            measurements = data
        })

        return measurements
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
        handleRefresh={refresh}

        />
    )
}
