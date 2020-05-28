import React from 'react'
import Qa from '../../Components/Qa/Qa'
import { useParams } from "react-router-dom";



  
function EditQa() {
    let { id } = useParams();
        return (            
            <Qa action="Edit Qa" qa_id={id}/>                            
        )
    }


export default EditQa
