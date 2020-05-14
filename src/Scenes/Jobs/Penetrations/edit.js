import React from 'react'
import Penetration from '../../../Components/Job/Penetration/Penetration'
import { useParams } from "react-router-dom";



  
function EditPenetration() {
        let { id, job } = useParams();
        return (            
            <Penetration action="Edit Penetration" />                            
        )
    }


export default EditPenetration
