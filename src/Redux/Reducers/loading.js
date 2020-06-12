import {
    RECEIVE_DATA,
    SET_LOADING
  } from '../Actions/shared'

import { RECEIVE_USERS } from "../Actions/users";
import { RECEIVE_TIMESHEETS } from "../Actions/timesheets";

  export default function loading (state = true, action) {
    switch(action.type) {
      case RECEIVE_DATA :
        return false
      case RECEIVE_USERS :
        return false
      case RECEIVE_TIMESHEETS :
        return false
      case SET_LOADING :
        return action.loading
      default :
        return state
    }
  }
