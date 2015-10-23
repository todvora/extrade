import _ from 'lodash';

var mapProducts = function(inputData) {
  var products = inputData
    .map(int => int.results)
    .reduce((acc, val) =>  acc.concat(val), [])
    .map(res => {
      return {code:res.code, name:res.name};
    });



  products = _.uniq(products, 'code');

  const periods = _.uniq(_.pluck(inputData, 'results')
    .reduce((acc, val) =>  acc.concat(val), []) //flatten
    .map(function(row){return row.period;}));

  const filter = function(data, product, direction, period) {
    return data
       .filter(interval => interval.direction == direction)
       .map(i => i.results)
       .reduce((acc, val) =>  acc.concat(val), []) //flatten
       .filter(res => res.code == product.code && res.period == period)
       .map(res => _.pick(res, ['country', 'countryName', 'weight', 'price', 'unit', 'count']));
  }

  return products.map(product => {
    const intervals = _.cloneDeep(periods).map(period => {
      const importData = filter(inputData, product, 'import', period);
      const exportData = filter(inputData, product, 'export', period);
      return {
        period:period,
        import:importData,
        export:exportData
      };
    });

    return {
      name:product.name,
      code:product.code,
      intervals:intervals
    };
  });
}

module.exports = {
  map:mapProducts
};