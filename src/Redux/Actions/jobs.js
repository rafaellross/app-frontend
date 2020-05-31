
import * as API from '../../Api';

export const ADD_JOB = 'ADD_JOB'
export const REMOVE_JOB = 'REMOVE_JOB'
export const UPDATE_JOB = 'UPDATE_JOB'

function addJob (job) {
    return {
      type: ADD_JOB,
      job,
    }
  }

function removeJob (id) {
  return {
    type: REMOVE_JOB,
    id,
  }
}

function updateJob (job) {
  return {
    type: UPDATE_JOB,
    job,
  }
}

export function handleAddJob (job, cb) {
    return (dispatch) => {
      return API.addJob(job)
        .then((job) => {
          dispatch(addJob(job))
        })
        .catch((error) => {
          console.log(error)
          alert('There was an error. Try again.')
        })
    }
  }

export function handleDeleteJob (jobs) {
    return (dispatch) => {

      //Remove Jobs from State
      jobs.forEach(job => {
        dispatch(removeJob(job.id))
      });


      return API.deleteJob(jobs.map(job => job.id))
        .catch(() => {
          jobs.forEach(job => {
            dispatch(addJob(job))
          });


          alert('An error occurred. Try again.')
        })
    }
  }

export function handleUpdateJob (job) {
    return (dispatch) => {
      dispatch(updateJob(job))

      return API.updateJob(job)
        .catch(() => {

          alert('An error occurred. Try again.')
        })
    }
  }
