
import * as API from '../../Api'

export const ADD_QA = 'ADD_QA'
export const REMOVE_QA = 'REMOVE_QA'
export const UPDATE_QA = 'UPDATE_QA'
export const RECEIVE_QAS = 'RECEIVE_QAS'

function addQa (qa) {
    return {
      type: ADD_QA,
      qa,
    }
  }

function removeQa (id) {
  return {
    type: REMOVE_QA,
    id,
  }
}

function updateQa (qa) {
  return {
    type: UPDATE_QA,
    qa,
  }
}

export function handleAddQa (qa, cb) {
    return (dispatch) => {
      return API.addQa(qa)
        .then((qa) => {
          dispatch(addQa(qa))
        })
        .catch((error) => {
          console.log(error)
          alert('There was an error. Try again.')
        })
    }
  }

export function handleDeleteQa (qas) {
    return (dispatch) => {

      //Remove Qas from State
      qas.forEach(qa => {
        dispatch(removeQa(qa.id))
      })


      return API.deleteQa(qas.map(qa => qa.id))
        .catch(() => {
          qas.forEach(qa => {
            dispatch(addQa(qa))
          })
          alert('An error occurred. Try again.')
        })
    }
  }

export function handleUpdateQa (qa) {
    return (dispatch) => {
      dispatch(updateQa(qa))

      return API.updateQa(qa)
        .catch(() => {

          alert('An error occurred. Try again.')
        })
    }
  }

  function receiveQas (qas) {
    return {
      type: RECEIVE_QAS,
      qas,
    }
  }

  export function handleReceiveQas () {
      return (dispatch) => {
       if(localStorage.token)
        return Promise.all([
          API.fetchQas()
        ]).then(([ qas ]) => {
          dispatch(receiveQas(qas))
        })
      }
    }
