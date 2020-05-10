import React from 'react'
import Employee from '../../Components/Employee'
import { useParams } from "react-router-dom";



  
function EditEmployee() {
        let { id } = useParams();
        return (            
            <Employee action="Edit Employee" employee_id={id}/>                            
        )
    }


export default EditEmployee
