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
        const employee = props.employees.find(employee => employee.id === id)
        return (
            <Estimate action="Edit Employee" employee={employee} type="edit"/>
        )
    }


export default EditEstimate
