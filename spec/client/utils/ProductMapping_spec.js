jest.autoMockOff();

var fs = require('fs');
var path = require('path');
var mapping = require('../../../src/client/utils/ProductMapping');

describe('ProductMapping', function() {
  it('should convert returned values to product items', function() {
      var data = JSON.parse(fs.readFileSync(path.join(__dirname, 'ProductMapping.json'), 'utf8'));
      var expectedData = JSON.parse(fs.readFileSync(path.join(__dirname, 'ProductMapping_expected.json'), 'utf8'));
      var result = mapping.map(data);
      console.log(result);
      expect(result).toEqual(expectedData);
  });
});