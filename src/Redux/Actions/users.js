import * as API from '../../Api'

export const ADD_USER = 'ADD_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const UPDATE_USER = 'UPDATE_USER'

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
        .catch(() => {
          users.forEach(user => {
            dispatch(addUser(user))
          })
          alert('An error occurred. Try again.')
        })
    }
  }

export function handleUpdateUser (user) {
    return (dispatch) => {
      dispatch(updateUser(user))

      return API.updateUser(user)
        .catch(() => {

          alert('An error occurred. Try again.')
        })
    }
  }
