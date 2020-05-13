
const api = "http://127.0.0.1:7000/api"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const get = (table, id) =>
  fetch(`${api}/${table}/${id}`, { headers })

    .then(res => res.json())
    .then(data => data)



export const getAll = (table, query) =>
  fetch(`${api}/${table}${query ? `/${query}` : ''}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const update = (table, model) =>
  fetch(`${api}/${table}/${model.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( model )
  }).then(res => res.json())


  export const save = (table, model) =>

  fetch(`${api}/${table}${model.id ? `/${model.id}` : ''}`, {
    method: model.id ? 'PUT' : 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( model )
  }).then(res => res.json())

export const search = (query) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  }).then(res => res.json())
    .then(data => data)
