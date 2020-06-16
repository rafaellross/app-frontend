import React, { useEffect, useState } from 'react'
import * as API from "../../Api";
import DataTable from '../DataTable/DataTable'
import TableEstimateDetails from './TableEstimateDetails'
export default function EstimateDetails(props) {

    const [loaded, setLoaded] = useState(false)
    const [details, setDetails] = useState([])
    const [folders, setFolders] = useState([])

    // ComponentDidMount and componentDidUpdate:
  useEffect(() => {
    if (!loaded) {
        API.get('estimates/details', props.project.id)
        .then((details) => {
            setDetails(details)

        })
        setLoaded(true)
    }});

    return (
        <div>
            {/**
             *
            <DataTable
            columns={[{ title: 'Folder', field: 'folder' },]}
            filters={[]}
            data={folders}/>

             */}
             <TableEstimateDetails
                project={props.project}
                data={details}
             />
        </div>
    )
}
