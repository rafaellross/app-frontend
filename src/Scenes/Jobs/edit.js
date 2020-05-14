
import React from 'react'
import Job from '../../Components/Job'
import { useParams } from "react-router-dom";



  
function EditJob() {
        let { id } = useParams();
        return (            
            <Job action="Edit Job" job_id={id}/>                            
        )
    }


export default EditJob
