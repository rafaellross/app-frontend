import {
    ADD_TIMESHEET,
    REMOVE_TIMESHEET,
    UPDATE_TIMESHEET
  } from '../Actions/timesheets'

  import {
    RECEIVE_DATA
  } from '../Actions/shared'


  export default function timesheets (state = [], action) {
     switch(action.type) {
       case ADD_TIMESHEET :
         return state.concat([action.timesheet])
       case REMOVE_TIMESHEET :
         return state.filter((timesheet) => timesheet.id !== action.id)
       case UPDATE_TIMESHEET :
         return state.map((timesheet) => timesheet.id !== action.timesheet.id ? timesheet :
           action.timesheet)
       case RECEIVE_DATA :
         return action.timesheets
       default :
         return state
     }
   }
