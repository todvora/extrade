import React from 'react';
import '../styles/autosuggest.less';
import Autosuggest from 'react-autosuggest';

export default class SuggestBox extends React.Component {

  constructor() {
    super();
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
  }

  renderSuggestion(suggestion, input) {
    return (
      <span>
        <strong>{suggestion.name.slice(0, input.length)}</strong>{suggestion.name.slice(input.length)}
      </span>
    );
  }

  getSuggestionValue(suggestionObj) {
    return suggestionObj.name;
  }

  onSuggestionSelected (suggestion, event) {
    event.preventDefault();
    this.props.onSelected(suggestion);
  }

  getSuggestions(input, callback) {
    this.props.getSuggestions(input, function(err, result) {
      var resultsArray = Object.keys(result).map(code => {
        return {'code':code, 'name':result[code]};
      })
      callback(err, resultsArray);
    });
  }

  render() {
    return (
      <div>
        <ul>
           {this.props.selectedValues.map(product => {
              return <li key={product.code}>
                  {product.name}
                    <a onClick={() => this.props.onDeselected(product)}>
                      <span className="glyphicon glyphicon-remove-circle remove-link"></span>
                    </a>
                </li>
           })}
        </ul>
        <Autosuggest suggestions={this.getSuggestions}
                     suggestionRenderer={this.renderSuggestion}
                     suggestionValue={this.getSuggestionValue}
                     onSuggestionSelected={this.onSuggestionSelected}
                     showWhen={input => input.trim().length >= 2}
        />
      </div>
    );
  }
}