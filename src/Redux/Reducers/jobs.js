import {
    ADD_JOB,
    REMOVE_JOB,
    UPDATE_JOB
  } from '../Actions/jobs'

  import {
    RECEIVE_DATA
  } from '../Actions/shared'

  export default function jobs (state = [], action) {

     switch(action.type) {
       case ADD_JOB :
         return state.concat([action.job])
       case REMOVE_JOB :
         return state.filter((job) => job.id !== action.id)
       case UPDATE_JOB :
         return state.map((job) => job.id !== action.job.id ? job :
           action.job)
       case RECEIVE_DATA :
         return action.jobs
       default :
         return state
     }
   }
