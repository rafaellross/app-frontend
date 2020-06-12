import * as API from '../../Api'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'


function loginAction (user) {
    return {
      type: LOGIN,
      user,
    }
  }

export function logoutAction (user) {
  return {
    type: LOGOUT,
    user
  }
}

export function handleLogin (user) {
  return (dispatch) => {
    return API.login(user)
      .then((user) => {
        dispatch(loginAction(user))
        return user
      })
      .catch((error) => {
        console.log(error)
        alert('There was an error. Try again.')
        console.log(error)
      })
  }
}
