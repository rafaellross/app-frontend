import * as API from '../../Api';

export const RECEIVE_DATA = 'RECEIVE_DATA'

function receiveDataAction (employees, jobs, users, timesheets, qas/*, charts*/) {
  return {
    type: RECEIVE_DATA,
    employees,
    jobs,
    users,
    timesheets,
    qas,
    /*charts*/
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
       API.fetchQas(),
       /*API.fetchTimesheetsChart()*/

     ]).then(([ employees, jobs, users, timesheets, qas/*, charts*/ ]) => {
       dispatch(receiveDataAction(employees, jobs, users, timesheets, qas/*, charts*/))
     })
   }
 }
