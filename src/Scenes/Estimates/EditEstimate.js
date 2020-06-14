import React from 'react'
import Estimate from '../../Components/Estimate/Estimate'
import { useParams } from "react-router-dom";
import { connect } from 'react-redux'




function EditEstimate(props) {
        const { id } = useParams();
        if (props.isLoading) {
            return (
                <h1>Loading...</h1>
            )
        }

        return (
            <Estimate action="Edit Estimate" estimate={id} type="edit"/>
        )
    }


export default EditEstimate
