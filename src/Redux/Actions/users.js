import * as API from '../../Api'

export const ADD_USER = 'ADD_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const RECEIVE_USERS = 'RECEIVE_USERS'


function addUser (user) {
    return {
      type: ADD_USER,
      user,
    }
  }

function removeUser (id) {
  return {
    type: REMOVE_USER,
    id,
  }
}

function updateUser (user) {
  return {
    type: UPDATE_USER,
    user,
  }
}

export function handleAddUser (user, cb) {
    return (dispatch) => {
      return API.addUser(user)
        .then((user) => {
          dispatch(addUser(user))
        })
        .catch((error) => {
          console.log(error)
          alert('There was an error. Try again.')
          console.log(error)
        })
    }
  }

export function handleDeleteUser (users) {
    return (dispatch) => {

      //Remove Users from State
      users.forEach(user => {
        dispatch(removeUser(user.id))
      })


      return API.deleteUser(users.map(user => user.id))
        .catch((error) => {
          users.forEach(user => {
            dispatch(addUser(user))
          })
          alert('An error occurred. Try again.')
          console.log(error)
        })
    }
  }

export function handleUpdateUser (user) {
    return (dispatch) => {
      dispatch(updateUser(user))

      return API.updateUser(user)
        .catch((error) => {

          alert('An error occurred. Try again.')
          console.log(error)
        })
    }
  }




  function receiveUsers (users) {
    return {
      type: RECEIVE_USERS,
      users,
    }
  }

  export function handleReceiveUsers () {

      return (dispatch) => {
       if(localStorage.token)
        return Promise.all([
          API.fetchUsers()
        ]).then(([ users ]) => {
          dispatch(receiveUsers(users))
        })
      }
    }
