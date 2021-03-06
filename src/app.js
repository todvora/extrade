import React from 'react'
import ReactDOM from 'react-dom'
import { createHistory, useBasename } from 'history'
import { syncReduxAndRouter } from 'redux-simple-router'
import routes from './routes'
import Root from './containers/Root'
import configureStore from './redux/configureStore'
// import querystring from 'querystring'

// set root path of the react router to current address - needed for app residing in a subdirectory
const history = useBasename(createHistory)({
  basename: window.location.pathname
})

const store = configureStore(window.__INITIAL_STATE__)
// if (true) {
//  console.log('initial store status')
//  console.log(querystring.parse(window.location.search.substring(1)))
//  console.log(localStorage)
//  console.log('initial store status')
// }

syncReduxAndRouter(history, store, (state) => state.router)

// Render the React application to the DOM
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
)
