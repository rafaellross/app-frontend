import {
    ADD_ESTIMATE,
    REMOVE_ESTIMATE,
    UPDATE_ESTIMATE
  } from '../Actions/estimates'

  import {
    RECEIVE_ESTIMATE
  } from '../Actions/estimates'

  export default function estimates (state = [], action) {
     switch(action.type) {
       case ADD_ESTIMATE :
         return state.concat([action.estimate])
       case REMOVE_ESTIMATE :
         return state.filter((estimate) => estimate.id !== action.id)
       case UPDATE_ESTIMATE :
         return state.map((estimate) => estimate.id !== action.estimate.id ? estimate :
           action.estimate)
       case RECEIVE_ESTIMATE :
         return action.estimates
       default :
         return state
     }
   }
