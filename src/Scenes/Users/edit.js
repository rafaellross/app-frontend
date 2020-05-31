import React from 'react'
import User from '../../Components/User'
import { useParams } from "react-router-dom";
import { connect } from 'react-redux'



function EditUser(props) {

    const { id } = useParams();
    if (props.isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }
    const user = props.users.find(user => user.id.toString() === id)

    return (
        <User action="Edit User" user={user} type="edit"/>
    )
}
export default connect((state) => ({
    users: state.users,
    isLoading: state.loading
  }))(EditUser)
