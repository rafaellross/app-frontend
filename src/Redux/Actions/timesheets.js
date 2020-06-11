
import * as API from '../../Api'

export const ADD_TIMESHEET = 'ADD_TIMESHEET'
export const REMOVE_TIMESHEET = 'REMOVE_TIMESHEET'
export const UPDATE_TIMESHEET = 'UPDATE_TIMESHEET'
export const RECEIVE_TIMESHEETS = 'RECEIVE_TIMESHEETS'

function addTimesheet (timesheet) {
    return {
      type: ADD_TIMESHEET,
      timesheet,
    }
  }

function removeTimesheet (id) {
  return {
    type: REMOVE_TIMESHEET,
    id,
  }
}

function updateTimesheet (timesheet) {
  return {
    type: UPDATE_TIMESHEET,
    timesheet,
  }
}

export function handleAddTimesheet (timesheet) {
    return (dispatch) => {
      return API.addTimesheet(timesheet)
        .then((timesheet) => {
          dispatch(addTimesheet(timesheet))
        })
        .catch((error) => {
          console.log(error)
          alert('There was an error. Try again.')
        })
    }
  }

export function handleDeleteTimesheet (timesheets) {
    return (dispatch) => {

      //Remove Timesheets from State
      timesheets.forEach(timesheet => {
        dispatch(removeTimesheet(timesheet.id))
      })


      return API.deleteTimesheet(timesheets.map(timesheet => timesheet.id))
        .catch(() => {
          timesheets.forEach(timesheet => {
            dispatch(addTimesheet(timesheet))
          })


          alert('An error occurred. Try again.')
        })
    }
  }

export function handleUpdateTimesheet (timesheet) {
    return (dispatch) => {
      dispatch(updateTimesheet(timesheet))

      return API.updateTimesheet(timesheet)
        .catch(() => {

          alert('An error occurred. Try again.')
        })
    }
  }



  function receiveTimeSheets (timesheets) {
    return {
      type: RECEIVE_TIMESHEETS,
      timesheets,
    }
  }

  export function handleReceiveTimeSheets () {

      return (dispatch) => {
       if(localStorage.token)
        return Promise.all([
          API.fetchTimesheets()
        ]).then(([ timesheets ]) => {
          dispatch(receiveTimeSheets(timesheets))
        })
      }
    }
