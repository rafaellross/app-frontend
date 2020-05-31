import {
    ADD_USER,
    REMOVE_USER,
    UPDATE_USER
  } from '../Actions/users'

  import {
    RECEIVE_DATA
  } from '../Actions/shared'


  export default function users (state = [], action) {
     switch(action.type) {
       case ADD_USER :
         return state.concat([action.user])
       case REMOVE_USER :
         return state.filter((user) => user.id !== action.id)
       case UPDATE_USER :
         return state.map((user) => user.id !== action.user.id ? user :
           action.user)
       case RECEIVE_DATA :
         return action.users
       default :
         return state
     }
   }
