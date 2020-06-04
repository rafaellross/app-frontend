import {
    RECEIVE_CHART
  } from '../Actions/charts'


  export default function timesheets (state = [], action) {
     switch(action.type) {
         case RECEIVE_CHART :
          return action.charts
       default :
         return state
     }
   }
