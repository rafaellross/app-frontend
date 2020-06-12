import {
    LOGIN,
    LOGOUT
  } from '../Actions/login'


  export default function login (state = {user: localStorage.user && JSON.parse(localStorage.user), token: localStorage.token}, action) {
     switch(action.type) {
       case LOGIN :
         return {user: action.user.user, token: action.user.token}
       case LOGOUT :
         return {}
       default :
         return state
     }
   }
