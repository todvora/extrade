import { createAction, handleActions } from 'redux-actions'
import $ from 'jquery'
import ProductMapping from 'utils/ProductMapping'
import querystring from 'querystring'
import Q from 'q'
import update from 'react-addons-update'

const getApiUrl = (part, params) => {
  return 'https://extrade-tdvorak.rhcloud.com/api/v1/l' + part + '?callback=?&' + querystring.stringify(params)
}

// ------------------------------------
// Constants
// ------------------------------------
export const DATA_LOADING = 'DATA_LOADING'
export const DATA_RECEIVED = 'DATA_RECEIVED'
export const DATA_ERROR = 'DATA_ERROR'

// ------------------------------------
// Actions
// ------------------------------------
export const loading = createAction(DATA_LOADING, (totalCount, finishedCount) => {
  var finished = totalCount === finishedCount
  return {
    totalCount: totalCount,
    finishedCount: finishedCount,
    percents: Math.floor((100 / totalCount) * finishedCount),
    finished: finished
  }
})

export const received = createAction(DATA_RECEIVED, (value) => ProductMapping.map(value))
export const failed = createAction(DATA_ERROR, (value) => value)

const createCriteriaPromise = function (direction, criteria) {
  var {interval, selectedProducts, selectedCountries, groupBy} = criteria
  return Q({
    monthFrom: interval.from.month,
    yearFrom: interval.from.year,
    monthTill: interval.till.month,
    yearTill: interval.till.year,
    direction: direction,
    products: selectedProducts.map(product => product.code),
    countries: selectedCountries.map(country => country.code).filter(code => code !== 'ALL_COUNTRIES'),
    groupBy: groupBy
  })
}

export const readDataAsync = () => {
  return (dispatch, getState) => {
    var finishedCalls = 0
    var criteria = getState().criteria

    var parts = [
      createCriteriaPromise('d', criteria),
      createCriteriaPromise('v', criteria)
    ]

    // clear data
    dispatch(loading(parts.length, finishedCalls))
    dispatch(received([]))
    dispatch(failed(null))

    var promises = parts
      .map((promise, index, array) => {
        return promise
          .then(criteria => Q($.getJSON(getApiUrl('data', criteria))))
          .then(result => {
            finishedCalls = finishedCalls + 1
            dispatch(loading(array.length, finishedCalls))
            return result
          })
          .fail(ex => {
            if (ex.responseText) {
              dispatch(failed(`Error ${ex.status}: ${ex.statusText}; ${ex.responseText}`))
            } else {
              dispatch(failed('' + ex))
            }
          })
      })

    return Q.all(promises)
      .then(results => dispatch(received(results)))
  }
}

export const actions = {
  loading,
  received,
  failed,
  readDataAsync
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  DATA_LOADING: (state, { payload }) => update(state, {progress: {$set: payload}}),
  DATA_ERROR: (state, { payload }) => update(state, {error: {$set: payload}}),
  DATA_RECEIVED: (state, { payload }) => update(state, {products: {$set: payload}})
}, {
  products: [],
  progress: {
    finished: false,
    percents: 0
  }
})
