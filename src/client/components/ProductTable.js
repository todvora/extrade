import React from 'react';

export default class ProductTable extends React.Component {

  render() {
    return (
      <div>
        <h3>Products</h3>
        <table className="table">
          <thead>
            <tr>
             <th>Kód zboží</th>
             <th>Název zboží</th>
             <th>Kód země</th>
             <th>Název země</th>
             <th>Netto (kg)</th>
             <th>Stat. hodnota CZK(tis.)</th>
             <th>MJ</th>
             <th>Množství v MJ</th>
            </tr>
          </thead>
        <tbody>
          {this.props.products.map(row => {
              return <tr key={row.code + '_' + row.country}>
                  <td>{row.code}</td>
                  <td>{row.name}</td>
                  <td>{row.country}</td>
                  <td>{row.countryName}</td>
                  <td>{row.weight}</td>
                  <td>{row.price}</td>
                  <td>{row.unit}</td>
                  <td>{row.count}</td>
                </tr>
          })}
        </tbody>
        </table>
      </div>
    );
  }
}

ProductTable.propTypes = {
  products: React.PropTypes.array.isRequired
};