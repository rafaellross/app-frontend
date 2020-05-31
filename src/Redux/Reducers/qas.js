import {
    ADD_QA,
    REMOVE_QA,
    UPDATE_QA
  } from '../Actions/qas'

  import {
    RECEIVE_DATA
  } from '../Actions/shared'

  export default function qas (state = [], action) {
     switch(action.type) {
       case ADD_QA :
         return state.concat([action.qa])
       case REMOVE_QA :
         return state.filter((qa) => qa.id !== action.id)
       case UPDATE_QA :
         return state.map((qa) => qa.id !== action.qa.id ? qa :
           action.qa)
       case RECEIVE_DATA :
         return action.qas
       default :
         return state
     }
   }
