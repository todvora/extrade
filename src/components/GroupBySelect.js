import React from 'react'

export default class GroupBySelect extends React.Component {

  constructor (props) {
    super()
    this.getOptions = this.getOptions.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  getOptions () {
    return [
      {code: 'A', label: 'Po letech'},
      {code: 'Q', label: 'Po čtvrtletích'},
      {code: 'M', label: 'Po měsících'},
      {code: 'E', label: 'Celkem'}
    ]
  }

  handleChange (event) {
    this.props.onChange(event.target.value)
  }

  render () {
    return (
      <div>
       Seskupování: <select className='form-control' value={this.props.value} onChange={this.handleChange}>
      {this.getOptions().map(opt =>
        <option key={opt.code} value={opt.code}>{opt.label}</option>
      )}
       </select>
      </div>
    )
  }
}

GroupBySelect.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
}
