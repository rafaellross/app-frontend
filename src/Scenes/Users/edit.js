import React from 'react'
import User from '../../Components/User'
import { useParams } from "react-router-dom";



  
function EditUser() {
        let { id } = useParams();
        return (            
            <div>
                <h3>Edit User</h3>
                <User action="Edit User" user_id={id}/>                            

            </div>
        )
    }


export default EditUser
