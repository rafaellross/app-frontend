import * as API from '../../Api'

export const RECEIVE_DATA = 'RECEIVE_DATA'
export const SET_LOADING = 'SET_LOADING'

function receiveDataAction (employees, jobs) {
  return {
    type: RECEIVE_DATA,
    employees,
    jobs

  }
}

export function setLoading (loading = true) {
  return {
    type: SET_LOADING,
    loading

  }
}


export function handleInitialData () {

   return (dispatch) => {
     return Promise.all([
       API.fetchEmployees(),
       API.fetchJobs()

     ]).then(([ employees, jobs]) => {
       dispatch(receiveDataAction(employees, jobs))
     })
   }
 }
