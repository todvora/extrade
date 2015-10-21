import Q from 'q';
import ProductMapping from './ProductMapping';

const createCriteriaPromise = function(interval, direction, products, countries) {
      return Q({
        monthFrom : interval.from.month,
        yearFrom :  interval.from.year,
        monthTill : interval.till.month,
        yearTill :  interval.till.year,
        direction : direction,
        products :  products,
        countries : countries
      });
  };

const loadData = function(criteria, queryDataFunction, progressCallback) {

  var finishedCalls = 0;

  var {intervals, products, countries} = criteria;
  return Q.all(intervals
    .reduce((acc, interval) => {
      acc.push(createCriteriaPromise(interval, 'd', products, countries));
      acc.push(createCriteriaPromise(interval, 'v', products, countries));
      return acc;
    }, [])
    .map((promise, index, array) => {
      return promise
        .then(criteria => {
          return queryDataFunction(criteria)
            .then(result => {finishedCalls = finishedCalls + 1;progressCallback(criteria, result, array.length, finishedCalls); return result}); // progress callback?
        });
  }))
  .then(results => ProductMapping.map(results));
};

module.exports = {
  loadData: loadData
};