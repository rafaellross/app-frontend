import { combineReducers } from 'redux'

import employees from './employees'
import jobs from './jobs'
import users from './users'
import timesheets from './timesheets'
import qas from './qas'
import charts from './charts'
import loading from './loading'


export default combineReducers({
  employees,
  jobs,
  users,
  timesheets,
  loading,
  qas,
  charts
})
