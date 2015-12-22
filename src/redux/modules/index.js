import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import counter from './counter'
import criteria from './criteria'
import api from './api'

export default combineReducers({
  criteria,
  counter,
  api,
  router: routeReducer
})
