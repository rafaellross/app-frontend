import {
    RECEIVE_DATA
  } from '../Actions/shared'

  import {
    RECEIVE_CHART
  } from '../Actions/charts'


  export default function loading (state = true, action) {
    switch(action.type) {
      case RECEIVE_DATA :
        return false
      case RECEIVE_CHART :
        return true
      default :
        return state
    }
  }
