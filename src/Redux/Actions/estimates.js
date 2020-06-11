import * as API from '../../Api'

export const ADD_ESTIMATE = 'ADD_ESTIMATE'
export const REMOVE_ESTIMATE = 'REMOVE_ESTIMATE'
export const UPDATE_ESTIMATE = 'UPDATE_ESTIMATE'
export const RECEIVE_ESTIMATE = 'RECEIVE_ESTIMATE'

function addEstimate (estimate) {
    return {
      type: ADD_ESTIMATE,
      estimate,
    }
  }

function removeEstimate (id) {
  return {
    type: REMOVE_ESTIMATE,
    id,
  }
}

function updateEstimate (estimate) {
  return {
    type: UPDATE_ESTIMATE,
    estimate,
  }
}

export function handleAddEstimate (estimate, cb) {
    return (dispatch) => {
      return API.addEstimate(estimate)
        .then((estimate) => {
          dispatch(addEstimate(estimate))
        })
        .catch((error) => {
          console.log(error)
          alert('There was an error. Try again.')
          console.log(error)
        })
    }
  }

export function handleDeleteEstimate (estimates) {
    return (dispatch) => {

      //Remove Estimates from State
      estimates.forEach(estimate => {
        dispatch(removeEstimate(estimate.id))
      })


      return API.deleteEstimate(estimates.map(estimate => estimate.id))
        .catch((error) => {
          estimates.forEach(estimate => {
            dispatch(addEstimate(estimate))
          })
          alert('An error occurred. Try again.')
          console.log(error)
        })
    }
  }

export function handleUpdateEstimate (estimate) {
    return (dispatch) => {
      dispatch(updateEstimate(estimate))

      return API.updateEstimate(estimate)
        .catch((error) => {

          alert('An error occurred. Try again.')
          console.log(error)
        })
    }
  }


  function receiveEstimates (estimates) {
    return {
      type: RECEIVE_ESTIMATE,
      estimates,
    }
  }

  export function handleReceiveEstimates () {

      return (dispatch) => {
       if(localStorage.token)
        return Promise.all([
          API.fetchEstimates()
        ]).then(([ estimates ]) => {
          dispatch(receiveEstimates(estimates))
        })
      }
    }

