import checker from './checker'
import logger from './logger'
import authInterceptor from './auth'
import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'

export default applyMiddleware(
  thunk,
  checker,
  logger,
  authInterceptor
)
