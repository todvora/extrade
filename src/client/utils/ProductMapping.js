import _ from 'lodash';

var mapProducts = function(intervals) {
  var products = intervals
    .map(int => int.results)
    .reduce((acc, val) =>  acc.concat(val), [])
    .map(res => {
      return {code:res.code, name:res.name};
    });

  products = _.uniq(products, 'code');

  const periods = _.uniq(_.pluck(intervals, 'period'), (period => period.from + '-' + period.till));

  const filter = function(data, product, direction) {
    return data
       .filter(interval => interval.direction == direction)
       .map(i => i.results)
       .reduce((acc, val) =>  acc.concat(val), [])
       .filter(res => res.code == product.code)
       .map(res => _.omit(res, ['code', 'name']));
  }

  return products.map(product => {
    product.intervals = _.cloneDeep(periods);
    product.intervals.forEach(interval => {
      const importExport = intervals.filter(source => _.isEqual(source.period, interval));
      interval.import = filter(importExport, product, 'import');
      interval.export = filter(importExport, product, 'export');
    });

    return product;
  });
}

module.exports = {
  map:mapProducts
};