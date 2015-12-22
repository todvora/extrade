import React from 'react'

import { Link } from 'react-router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '../styles/core.scss'

// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Statelesss Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// CoreLayout is a pure function of it's props, so we can
// define it with a plain javascript function...
function CoreLayout ({ children }) {
  return (
     <div>
        <div className='navbar navbar-default navbar-static-top' role='navigation'>
            <div className='container'>
              <div className='navbar-header'>
                <button className='navbar-toggle' type='button' data-toggle='collapse' data-target='.navbar-collapse'/>
                  <span className='span sr-only'>Toggle navigation</span>
                  <span className='icon-bar'></span>
                  <span className='icon-bar'></span>
                  <span className='icon-bar'></span>
                  <Link className='navbar-brand' to='/'>Statistiky zahraničního obchodu</Link>
              </div>
              <div className='navbar-collapse collapse'>
                <ul className='nav navbar-nav navbar-right'>
                  <li><Link to='/'>Úvod</Link></li>
                  <li><Link to='/about'>O aplikaci</Link></li>
                  <li><Link to='/contact'>Kontakt</Link></li>
                </ul>
              </div>
            </div>
        </div>
        <div className='container'>
          {children}
        </div>
      </div>
    )
}

CoreLayout.propTypes = {
  children: React.PropTypes.element
}

export default CoreLayout
