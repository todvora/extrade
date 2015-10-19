import React from 'react';
import update from 'react-addons-update';
import dateUtils from '../utils/DateUtils';


import SuggestBox from './SuggestBox';
import DateInterval from './DateInterval';

import querystring from 'querystring';
import $ from 'jquery';
import { Router, Route, Link, History } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

export default class SearchForm extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedProducts:[
        {code:'87120030', name:'Jízdní kola, bez motoru (kromě bez kuličkových ložisek)'},
        {code:'87149110', name:'Rámy pro vozidla čísel 8711 až 8713 (kromě pro motocykly,mopedy a vozí'},
        {code:'87149130', name:'Přední vidlice pro vozidla čísel 8711 až 8713 (kromě pro motocykly,mop'}
      ],
      selectedCountries:[{code:'ALL_COUNTRIES', name: 'Celý svět'}],
      intervals:[]
    };

     this.onProductSelected = this.onProductSelected.bind(this);
     this.onProductDeselected = this.onProductDeselected.bind(this);

     this.onCountrySelected = this.onCountrySelected.bind(this);
     this.onCountryDeselected = this.onCountryDeselected.bind(this);

     this.onIntervalChange = this.onIntervalChange.bind(this);

     this.handleSubmit = this.handleSubmit.bind(this);
  }

   componentDidMount() {
      $.get('/api/products-preload', function(result){console.log(result)});
      $.get('/api/last-date', function(maxDate) {
        var precomputed = dateUtils.precomputeIntervals(maxDate);
        this.setState(update(this.state,{
          maxDate:{$set: maxDate},
          intervals:{$set: precomputed}
        }));
      }.bind(this));
   }

  onProductSelected(product) {
    this.setState(update(this.state, {selectedProducts:{$push: [product]}}));
  }

  onProductDeselected(productToRemove) {
    var newProducts = this.state.selectedProducts.filter(product => product.code !== productToRemove.code);
    this.setState(update(this.state, {selectedProducts:{$set: newProducts}}));
  }

  getProductSuggestions(input, callback) {
    $.get('/api/products?q=' + input, function(result) {
      callback(null, result);
    });
  }

  onCountrySelected(country) {
    this.setState(update(this.state, {selectedCountries:{$push: [country]}}));
  }

  onCountryDeselected (itemToRemove) {
    var newCountries = this.state.selectedCountries.filter(country => country.code !== itemToRemove.code);
    this.setState(update(this.state, {selectedCountries:{$set: newCountries}}));
  }

  getCountrySuggestions(input, callback) {
    $.get('/api/countries?q=' + input, function(result) {
      callback(null, result);
    });
  }

  handleSubmit() {



    var query = querystring.stringify({
     product: this.state.selectedProducts.map(product => product.code),
     country: this.state.selectedCountries.map(country => country.code).filter(code => code !== 'ALL_COUNTRIES'),
     interval: this.state.intervals.map(i => `${i.from.month}.${i.from.year}-${i.till.month}.${i.till.year}`)
    });

    this.props.history.replaceState(null, '/app/stats?' + query)
  }

  onIntervalChange(index, date) {
    this.setState(update(this.state, {intervals : {index: {$set:date}}}));
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <h3>Intervaly</h3>
        {this.state.intervals.map((interval, index) => {
           return <DateInterval interval={interval} maxDate={this.state.maxDate} index={index} onChange={this.onIntervalChange}/>
        }, this)}
        <h3>Produkty</h3>
        <SuggestBox selectedValues={this.state.selectedProducts}
                    onSelected={this.onProductSelected}
                    onDeselected={this.onProductDeselected}
                    getSuggestions={this.getProductSuggestions}
        />
        <h3>Země</h3>
        <SuggestBox selectedValues={this.state.selectedCountries}
                    onSelected={this.onCountrySelected}
                    onDeselected={this.onCountryDeselected}
                    getSuggestions={this.getCountrySuggestions}
        />
        <br />
        <button className="btn btn-primary btn-lg" onClick={this.handleSubmit}>
          Zobrazit statistiky
        </button>
      </div>
    );
  }
}
