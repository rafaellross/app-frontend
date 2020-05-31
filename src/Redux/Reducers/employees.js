import {
  ADD_EMPLOYEE,
  REMOVE_EMPLOYEE,
  UPDATE_EMPLOYEE
} from '../Actions/employees'

import {
  RECEIVE_DATA
} from '../Actions/shared'


export default function employees (state = [], action) {
   switch(action.type) {
     case ADD_EMPLOYEE :
       return state.concat([action.employee])
     case REMOVE_EMPLOYEE :
       return state.filter((employee) => employee.id !== action.id)
     case UPDATE_EMPLOYEE :
       return state.map((employee) => employee.id !== action.employee.id ? employee :
         action.employee)
     case RECEIVE_DATA :
       return action.employees
     default :
       return state
   }
 }
