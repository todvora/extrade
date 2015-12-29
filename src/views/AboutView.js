import React from 'react'
import { Link } from 'react-router'

export class AboutView extends React.Component {
  render () {
    return (
      <div className='container text-center'>
        <h1>O aplikaci</h1>
        <p>Aplikace Statistiky zahraničního obchodu funguje jako alternativní rozhraní k oficiálním statistikám.
        Nabízí stejná data jinak prezentovaná.</p>
        <hr />
        <Link to='/'>Zpět na úvodní stránku</Link>
      </div>
    )
  }
}

export default AboutView
