import React from 'react'
import User from '../../Components/User'
import { useParams } from "react-router-dom";



  
function EditUser() {
        let { id } = useParams();
        return (            
            <React.Fragment>                
                <User action="Edit User" user_id={id}/>                            
            </React.Fragment>
        )
    }


export default EditUser
