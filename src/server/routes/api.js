import client from 'extrade-cz-api';
import express from 'express';
import cache from '../lib/cache';
import Q from 'q';
import ProductMapping from '../lib/ProductMapping';

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

const parseIntervals = function(intervals) {
  const intervalRegex = new RegExp('(\\d{2}).(\\d{4})-(\\d{2}).(\\d{4})');
  return intervals.map(serialized => {
      var parts = intervalRegex.exec(serialized);
      return {
        from:{month:parts[1], year:parts[2]},
        till:{month:parts[3], year:parts[4]}
      }
    });
}

router.get('/data', (req, res) => {

  const intervals = parseIntervals(req.query.interval);

  const createClientPromise = function(interval, direction, products, countries) {
    const criteria = {
      monthFrom : interval.from.month,
      yearFrom :  interval.from.year,
      monthTill : interval.till.month,
      yearTill :  interval.till.year,
      direction : direction,
      products :  products,
      countries : countries
    };
    return client.getStats(criteria);
  }

  const promises = [];

  intervals.forEach(interval => {
    const products = req.query.product;
    const countries = req.query.country || [];
    promises.push(createClientPromise(interval, 'd', products, countries))
    promises.push(createClientPromise(interval, 'v', products, countries))
  });

   Q.all(promises)
   .then(results => {
      res.send(ProductMapping.map(results));
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