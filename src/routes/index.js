import React from 'react'
import { Route, IndexRoute } from 'react-router'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout'
import AboutView from 'views/AboutView'
import ContactView from 'views/ContactView'
import CriteriaView from 'views/CriteriaView'
import StatsView from 'views/StatsView'

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={CriteriaView} />
    <Route path='/about' component={AboutView} />
    <Route path='/contact' component={ContactView} />
    <Route path='/stats' component={StatsView} />
  </Route>
)
