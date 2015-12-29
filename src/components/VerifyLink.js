import React from 'react'

export default class VerifyLink extends React.Component {

 constructor () {
   super()
   this.buildLink = this.buildLink.bind(this)
 }

 buildLink () {
   console.log(this.props.product)
   const dir = this.props.direction === 'import' ? 'd' : 'v'
   const product = this.props.product.code
   console.log(this.props.criteria)
   const countries = this.props.criteria.selectedCountries.filter(c => c.code !== 'ALL_COUNTRIES').map(c => c.code).join(',')
   const monthFrom = this.props.criteria.interval.from.month
   const monthTill = this.props.criteria.interval.till.month
   const yearFrom = this.props.criteria.interval.from.year
   const yearTill = this.props.criteria.interval.till.year
   const group = this.props.criteria.groupBy

   return 'http://apl.czso.cz/pll/stazo/!presso.STAZO.PRIPRAV_ZOBRAZ?mesic_od=' + monthFrom + '&rok_od=' + yearFrom + '&mesic_do=' + monthTill + '&rok_do=' + yearTill + '&seskup=' + group + '&typ_vyst=1&mena=CZK&dov_vyv=' + dir + '&omez=99999&tab=A&zb_zem=3&razeni1=x&smer1=+&razeni2=x&smer2=+&razeni3=x&smer3=+&nomen=18&ur_nomen=18&kod_zbozi=' + product + '&n_kod_zbozi=' + product + '&skup_zeme=1&vyber_zemi=1&kod_zeme=' + countries + '&n_kod_zeme=' + countries + '&jazyk=CS&par=D&max_obd=201510&email=&jmdot=&popdot='
 }

  render () {
    return (
      <div>
        <a href={this.buildLink()} target='_blank'><i className='glyphicon glyphicon-check'></i>&nbsp;Zobrazit zdrojová data na stránkách czso.cz</a>
      </div>
    )
  }
}

VerifyLink.propTypes = {
  product: React.PropTypes.object.isRequired,
  direction: React.PropTypes.string.isRequired,
  criteria: React.PropTypes.object.isRequired
}
