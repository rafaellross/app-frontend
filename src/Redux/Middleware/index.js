import checker from './checker'
import logger from './logger'
import authInterceptor from './auth'
import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
export default composeWithDevTools(applyMiddleware(
  thunk,
  checker,
  logger,
  authInterceptor
))
