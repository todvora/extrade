import moment from 'moment';

var precomputeIntervals = function(lastDate) {
      var y = function(stamp) {
        return stamp.format('YYYY');
      };

      var m = function(stamp) {
        return stamp.format('MM');
      };

      var toObj = function(from, till) {
        return {from:{month:m(from), year:y(from)}, till:{month:m(till), year:y(till)}};
      };

      var till3 = moment({ year :lastDate.year, month :parseInt(lastDate.month) - 1}); // months are zero-based
      var from3 = till3.clone().subtract().subtract(11, 'months');

      var till2 = till3.clone().subtract(1, 'year');
      var from2 = till2.clone().subtract(11, 'months');

      var till1 = till3.clone().subtract(2, 'years');
      var from1 = till1.clone().subtract(11, 'months');

      return [
        toObj(from1, till1),
        toObj(from2, till2),
        toObj(from3, till3),
      ];
  }


module.exports = {
    precomputeIntervals:precomputeIntervals
}