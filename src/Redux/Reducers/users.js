import {
    ADD_USER,
    REMOVE_USER,
    UPDATE_USER,
    RECEIVE_USERS
  } from '../Actions/users'


  export default function users (state = [], action) {
     switch(action.type) {
       case ADD_USER :
         return state.concat([action.user])
       case REMOVE_USER :
         return state.filter((user) => user.id !== action.id)
       case UPDATE_USER :
         return state.map((user) => user.id !== action.user.id ? user :
           action.user)
       case RECEIVE_USERS :
         return action.users
       default :
         return state
     }
   }
