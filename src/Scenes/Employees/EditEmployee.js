import React from 'react'
import Employee from '../../Components/Employee/Employee'
import { useParams } from "react-router-dom";
import { connect } from 'react-redux'




function EditEmployee(props) {
        const { id } = useParams();
        if (props.isLoading) {
            return (
                <h1>Loading...</h1>
            )
        }
        const employee = props.employees.find(employee => employee.id === id)
        return (
            <Employee action="Edit Employee" employee={employee} type="edit"/>
        )
    }


export default connect((state) => ({
    employees: state.employees,
    isLoading: state.loading
  }))(EditEmployee)


