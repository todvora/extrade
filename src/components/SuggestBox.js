import React from 'react'
import '../styles/autosuggest.less'
import Autosuggest from 'react-autosuggest'
import update from 'react-addons-update'

export default class SuggestBox extends React.Component {

  constructor () {
    super()
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
    this.getSuggestions = this.getSuggestions.bind(this)

    this.state = {
      inputValue: ''
    }
  }

  renderSuggestion (suggestion, input) {
    const regex = new RegExp('^(.*)(' + input + ')(.*)$', 'i')
    const replaceWith = '$1<strong>$2</strong>$3'
    const text = suggestion.name.replace(regex, replaceWith)
    return (
      <span dangerouslySetInnerHTML={{__html: text}}></span>
    )
  }

  getSuggestionValue (suggestionObj) {
    return suggestionObj.name
  }

  onSuggestionSelected (suggestion, event) {
    event.preventDefault()
    this.props.onSelected(suggestion)
    this.setState(update(this.state, {inputValue: {$set: ''}}))
  }

  getSuggestions (input, callback) {
    this.props.getSuggestions(input, function (err, result) {
      var resultsArray = Object.keys(result).map(code => {
        return {'code': code, 'name': result[code]}
      })
      callback(err, resultsArray)
    })
  }

  render () {
    return (
      <div>
        <ul>
           {this.props.selectedValues.map(product => {
             return <li key={product.code}>
                  {product.name}
                    <a onClick={() => this.props.onDeselected(product)}>
                      <span className='glyphicon glyphicon-remove-circle remove-link'></span>
                    </a>
                </li>
           })}
        </ul>
        <Autosuggest suggestions={this.getSuggestions}
                     suggestionRenderer={this.renderSuggestion}
                     suggestionValue={this.getSuggestionValue}
                     onSuggestionSelected={this.onSuggestionSelected}
                     showWhen={input => input.trim().length >= 2}
                     value={this.state.inputValue}
                     inputAttributes={{placeholder: 'Začněte psát...'}}
        />
      </div>
    )
  }
}

SuggestBox.propTypes = {
  selectedValues: React.PropTypes.array.isRequired,
  getSuggestions: React.PropTypes.func.isRequired,
  onSelected: React.PropTypes.func.isRequired,
  onDeselected: React.PropTypes.func.isRequired
}
