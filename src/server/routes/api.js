import client from 'extrade-cz-api';
import express from 'express';
import cache from '../lib/cache';
const router = express.Router();

const filter = function(result, query) {
 if(typeof query !== 'undefined') {
    const regex = new RegExp('^' + query, 'i');
    var filtered = Object.keys(result).reduce(function(acc, code) {
      var value = result[code];
      if(regex.test(value) || regex.test(code)) {
        acc[code] = value;
      }
      return acc;
    }
    ,{});
    return filtered;
  } else {
    return result;
 }
}

router.get('/data', (req, res) => {
  client.getStats({
             monthFrom : '04',
             yearFrom :  '2014',
             monthTill : '04',
             yearTill :  '2015',
             direction : 'd',
             products :  req.query.products,
             countries : req.query.countries || []
   })
   .then(result => {
      res.send(result);
    })
    .fail(ex => {
      console.log(ex); // prints to the error on the stdout
    })
    .done(); // called to be sure, that we consumed all available states
});

router.get('/products-preload', (req, res) => {
   cache.get('products', client.getProducts)
   .then(result => {
      res.send({count:Object.keys(result).length});
    })
    .fail(ex => {
      console.log(ex); // prints to the error on the stdout
    })
    .done(); // called to be sure, that we consumed all available states
});

router.get('/products', (req, res) => {
   cache.get('products', client.getProducts)
   .then(result => {
      res.send(filter(result, req.query.q));
    })
    .fail(ex => {
      console.log(ex); // prints to the error on the stdout
    })
    .done(); // called to be sure, that we consumed all available states
});

router.get('/countries', (req, res) => {
   cache.get('countries', client.getCountries)
   .then(result => {
      res.send(filter(result, req.query.q));
    })
    .fail(ex => {
      console.log(ex); // prints to the error on the stdout
    })
    .done(); // called to be sure, that we consumed all available states
});

router.get('/last-date', (req, res) => {
   cache.get('last-date', client.getLastDate)
   .then(result => {
      res.send(result);
    })
    .fail(ex => {
      console.log(ex); // prints to the error on the stdout
    })
    .done(); // called to be sure, that we consumed all available states
});

module.exports = router;