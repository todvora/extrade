jest.autoMockOff();

var fs = require('fs');
var path = require('path');
var mapping = require('../../../src/server/lib/ProductMapping');

describe('ProductMapping', function() {
  it('should convert returned values to product items', function() {
      var data = JSON.parse(fs.readFileSync(path.join(__dirname, 'ProductMapping.json'), 'utf8'));
      var expectedData = JSON.parse(fs.readFileSync(path.join(__dirname, 'ProductMapping_expected.json'), 'utf8'));
      expect(mapping.map(data)).toEqual(expectedData);
  });
});