import moment from 'moment';

const precomputeIntervals = function(lastDate) {
    var y = function(stamp) {
      return stamp.format('YYYY');
    };

    var m = function(stamp) {
      return stamp.format('MM');
    };

    var toObj = function(from, till) {
      return {from:{month:m(from), year:y(from)}, till:{month:m(till), year:y(till)}};
    };

    var lastTill = moment({ year :lastDate.year, month :parseInt(lastDate.month) - 1}); // months are zero-based
    var lastFrom = lastTill.clone().subtract().subtract(11, 'months');

    var results = [toObj(lastFrom, lastTill)];

    for(var i = 1; i< 10; i++) {
      var from = lastFrom.clone().subtract(i, 'year');
      var till = lastTill.clone().subtract(i, 'year');
      results.push(toObj(from, till));
    }
    return results.reverse();
};

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


module.exports = {
    precomputeIntervals: precomputeIntervals,
    parseIntervals: parseIntervals
}