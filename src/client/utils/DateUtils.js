import moment from 'moment';

const precomputeInterval = function(lastDate) {
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
    var lastFrom = lastTill.clone().subtract().subtract(11, 'months').subtract(9, 'years');

    return toObj(lastFrom, lastTill);
};

const encodeInterval = function(interval) {
  return `${interval.from.month}.${interval.from.year}-${interval.till.month}.${interval.till.year}`;
}

const parseInterval = function(interval) {
  const intervalRegex = new RegExp('(\\d{1,2}).(\\d{4})-(\\d{1,2}).(\\d{4})');
  var parts = intervalRegex.exec(interval);
  return {
    from:{month:parts[1], year:parts[2]},
    till:{month:parts[3], year:parts[4]}
  }
}


module.exports = {
    precomputeInterval: precomputeInterval,
    parseInterval: parseInterval,
    encodeInterval: encodeInterval
}