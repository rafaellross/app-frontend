const api = "/api"


// Get Token from localStorage
let token = localStorage.token

const headers = {
  'Accept': 'application/json',
  'Authorization': `Bearer ${token}`,
  'mode': 'no-cors'
}

/**
 *
 * Fetch all Employees
 */

export const fetchEmployees = () =>
 fetch(`${api}/employees`, { headers })
    .then(res => res.json())
    .then(data => data)



/**
 * EMPLOYEE'S API
 *
 *
 */

/**
 *
 * Add a Employee to the API
 */

export const addEmployee = (employee) =>
fetch(`${api}/employees`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify( employee )
}).then(res => res.json())


/**
 *
 * Update Employee
 *
 */
export const updateEmployee = (employee) =>
  fetch(`${api}/employees/${employee.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( employee )
  }).then(res => res.json())


/**
 *
 * Delete Employee
 *
 */

export const deleteEmployee = (employees) =>
  fetch(`${api}/employees/delete`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {"employees": employees} )
  }).then(res => res.json())




/**
 * JOB'S API
 *
 *
 */


/**
 *
 * Fetch all Jobs
 */

export const fetchJobs = () =>
fetch(`${api}/jobs`, { headers })
   .then(res => res.json())
   .then(data => data)

/**
 *
 * Add a Job to the API
 */

export const addJob = (job) =>
fetch(`${api}/jobs`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify( job )
}).then(res => res.json())


/**
 *
 * Update Job
 *
 */
export const updateJob = (job) =>
  fetch(`${api}/jobs/${job.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( job )
  }).then(res => res.json())


/**
 *
 * Delete Job
 *
 */

export const deleteJob = (jobs) =>
  fetch(`${api}/jobs/delete`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {"jobs": jobs} )
  }).then(res => res.json())




/**
 * USER'S API
 *
 *
 */

export const fetchUsers = () =>
fetch(`${api}/users`, { headers })
   .then(res => res.json())
   .then(data => data)



/**
 *
 * Add a User to the API
 */

export const addUser = (user) =>
fetch(`${api}/users`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify( user )
}).then(res => res.json())


/**
 *
 * Update User
 *
 */
export const updateUser = (user) =>
  fetch(`${api}/users/${user.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( user )
  }).then(res => res.json())


/**
 *
 * Delete User
 *
 */

export const deleteUser = (users) =>
  fetch(`${api}/users/delete`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {"users": users} )
  }).then(res => res.json())




/**
 * TIMESHEET'S API
 *
 *
 */

export const fetchTimesheets = () =>
fetch(`${api}/timesheets`, { headers })
   .then(res => res.json())
   .then(data => data)



/**
 *
 * Add a Timesheet to the API
 */

export const addTimesheet = (timesheet) =>
fetch(`${api}/timesheets`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify( timesheet )
}).then(res => res.json())


/**
 *
 * Update Timesheet
 *
 */
export const updateTimesheet = (timesheet) =>
  fetch(`${api}/timesheets/${timesheet.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( timesheet )
  }).then(res => res.json())


/**
 *
 * Delete Timesheet
 *
 */

export const deleteTimesheet = (timesheets) =>
  fetch(`${api}/timesheets/delete`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {"timesheets": timesheets} )
  }).then(res => res.json())




/**
 * QA'S API
 *
 *
 */

export const fetchQas = () =>
fetch(`${api}/q_a_users`, { headers })
   .then(res => res.json())
   .then(data => data)

/**
 *
 * Add a Qa to the API
 */

export const addQa = (qa) =>
fetch(`${api}/q_a_users`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify( qa )
}).then(res => res.json())


/**
 *
 * Update Qa
 *
 */
export const updateQa = (qa) =>
  fetch(`${api}/q_a_users/${qa.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( qa )
  }).then(res => res.json())


/**
 *
 * Delete Qa
 *
 */

export const deleteQa = (qas) =>
  fetch(`${api}/q_a_users/delete`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {"qas": qas} )
  }).then(res => res.json())


  ////General

export const get = (table, id) =>
  fetch(`${api}/${table}/${id}`, { headers })

    .then(res => res.json())
    .then(data => data)

export const getAll = async  (table, query) =>
 fetch(`${api}/${table}${query ? `/${query}` : ''}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const update = async (table, model) =>
  fetch(`${api}/${table}/${model.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( model )
  }).then(res => res.json())


  export const save = async (table, model, store = false) =>

  fetch(`${api}/${table}${model.id && !store ? `/${model.id}` : ''}`, {
    method: model.id && !store ? 'PUT' : 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( model )
  }).then(res => res.json())

export const search = async  (query) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  }).then(res => res.json())
    .then(data => data)



    export const login = async  (credentials) =>
    fetch(`${api}/login`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( credentials )
    }).then(res => res.json())
      .then(data => data)



