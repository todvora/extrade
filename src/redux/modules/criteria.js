import { createAction, handleActions } from 'redux-actions'
import update from 'react-addons-update'

export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

export const ADD_COUNTRY = 'ADD_COUNTRY'
export const REMOVE_COUNTRY = 'REMOVE_COUNTRY'

export const SET_MAX_DATE = 'SET_MAX_DATE'
export const SET_INTERVAL = 'SET_INTERVAL'
export const SET_GROUPING = 'SET_GROUPING'

export const addProduct = createAction(ADD_PRODUCT, (product) => product)
export const removeProduct = createAction(REMOVE_PRODUCT, (product) => product)

export const addCountry = createAction(ADD_COUNTRY, (country) => country)
export const removeCountry = createAction(REMOVE_COUNTRY, (country) => country)

export const setMaxDate = createAction(SET_MAX_DATE, (date) => date)
export const setInterval = createAction(SET_INTERVAL, (date) => date)
export const setGroupBy = createAction(SET_GROUPING, (groupBy) => groupBy)

const defaultCriteria = {
  selectedProducts: [
    {code: '87120030', name: 'Jízdní kola, bez motoru (kromě bez kuličkových ložisek)'},
    {code: '87149110', name: 'Rámy pro vozidla čísel 8711 až 8713 (kromě pro motocykly,mopedy a vozí'},
    {code: '87149130', name: 'Přední vidlice pro vozidla čísel 8711 až 8713 (kromě pro motocykly,mop'}
  ],
  selectedCountries: [{code: 'ALL_COUNTRIES', name: 'Celý svět'}],
  maxDate: null,
  interval: null,
  groupBy: 'A'
}

export const actions = {
  addProduct,
  removeProduct,
  addCountry,
  removeCountry,
  setMaxDate,
  setInterval,
  setGroupBy
}

const arrayWithoutElement = function (arr, elem) {
  return arr.filter(item => item.code !== elem.code)
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  ADD_PRODUCT: (state, { payload }) => update(state, {selectedProducts: {$push: [payload]}}),
  REMOVE_PRODUCT: (state, { payload }) => update(state, {selectedProducts: {$set: arrayWithoutElement(state.selectedProducts, payload)}}),
  ADD_COUNTRY: (state, { payload }) => update(state, {selectedCountries: {$push: [payload]}}),
  REMOVE_COUNTRY: (state, { payload }) => update(state, {selectedCountries: {$set: arrayWithoutElement(state.selectedCountries, payload)}}),
  SET_MAX_DATE: (state, { payload }) => update(state, {maxDate: {$set: payload}}),
  SET_INTERVAL: (state, { payload }) => update(state, {interval: {$set: payload}}),
  SET_GROUPING: (state, { payload }) => update(state, {groupBy: {$set: payload}})
}, defaultCriteria)
