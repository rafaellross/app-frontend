import React from 'react'
import Job from '../../Components/Job'
import { useParams } from "react-router-dom";
import { connect } from 'react-redux'

function EditJob(props) {

        const { id } = useParams();
        if (props.isLoading) {
            return (
                <h1>Loading...</h1>
            )
        }
        const job = props.jobs.find(job => job.id.toString() === id)
        return (
            <Job action="Edit Job" job={job} type="edit"/>
        )
}

export default connect((state) => ({
    jobs: state.jobs,
    isLoading: state.loading
  }))(EditJob)


