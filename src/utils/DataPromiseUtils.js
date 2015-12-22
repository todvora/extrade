import Q from 'q'
import ProductMapping from './ProductMapping'

const createCriteriaPromise = function (direction, criteria) {
  var {interval, products, countries, groupBy} = criteria
  return Q({
    monthFrom: interval.from.month,
    yearFrom: interval.from.year,
    monthTill: interval.till.month,
    yearTill: interval.till.year,
    direction: direction,
    products: products,
    countries: countries,
    groupBy: groupBy
  })
}

const loadData = function (criteria, queryDataFunction, progressCallback) {
  var finishedCalls = 0
  return Q.all([
    createCriteriaPromise('d', criteria),
    createCriteriaPromise('v', criteria)
  ]
    .map((promise, index, array) => {
      return promise
        .then(criteria => {
          return queryDataFunction(criteria)
            .then(result => {
              finishedCalls = finishedCalls + 1
              progressCallback(criteria, result, array.length, finishedCalls)
              return result
            })
        })
    }))
  .then(results => ProductMapping.map(results))
}

module.exports = {
  loadData: loadData
}
