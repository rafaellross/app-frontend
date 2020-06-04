import * as API from '../../Api';

export const RECEIVE_DATA = 'RECEIVE_DATA'

function receiveDataAction (employees, jobs, users, timesheets, qas) {
  return {
    type: RECEIVE_DATA,
    employees,
    jobs,
    users,
    timesheets,
    qas
  }
}

export function handleInitialData () {

   return (dispatch) => {
    if(localStorage.token)
     return Promise.all([
       API.fetchEmployees(),
       API.fetchJobs(),
       API.fetchUsers(),
       API.fetchTimesheets(),
       API.fetchQas()

     ]).then(([ employees, jobs, users, timesheets, qas ]) => {
       dispatch(receiveDataAction(employees, jobs, users, timesheets, qas))
     })
   }
 }
