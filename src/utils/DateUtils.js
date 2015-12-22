const encodeInterval = function (interval) {
  return `${interval.from.month}.${interval.from.year}-${interval.till.month}.${interval.till.year}`
}

const parseInterval = function (interval) {
  const intervalRegex = new RegExp('(\\d{1,2}).(\\d{4})-(\\d{1,2}).(\\d{4})')
  var parts = intervalRegex.exec(interval)
  return {
    from: {month: parts[1], year: parts[2]},
    till: {month: parts[3], year: parts[4]}
  }
}

module.exports = {
  parseInterval: parseInterval,
  encodeInterval: encodeInterval
}
