
const api = "http://192.168.1.102:7000/api"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'mode': 'no-cors'
}

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


