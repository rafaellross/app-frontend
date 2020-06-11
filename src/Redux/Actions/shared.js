import * as API from '../../Api'

export const RECEIVE_DATA = 'RECEIVE_DATA'

function receiveDataAction (employees, jobs, users) {
  return {
    type: RECEIVE_DATA,
    employees,
    jobs,
    users
  }
}

export function handleInitialData () {

   return (dispatch) => {

     return Promise.all([
       API.fetchEmployees(),
       API.fetchJobs(),
       API.fetchUsers(),

     ]).then(([ employees, jobs, users]) => {
       dispatch(receiveDataAction(employees, jobs, users))
     })
   }
 }
