const api = "http://smartplumbing.ddns.net:8000/api"


// Get Token from localStorage
let token = localStorage.token

const headers = {
  'Accept': 'application/json',
  'Authorization': `Bearer ${token}`,
  'mode': 'cors'
}

  ////General

/**
 * ESTIMATE'S API
 *
 *
 */

/**
 *
 * Add a Estimate to the API
 */

export const importEstimate = (estimate) =>
fetch(`${api}/estimates/import`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify( estimate )
}).then(res => res.json())




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



