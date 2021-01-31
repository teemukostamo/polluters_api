const { isStringMissing, isNumberMissing } = require('../utils/utils');

test('string validator returns correct values', () => {
  const emptyString = '';
  const nonEmptyString = 'this is a string';

  expect(isStringMissing(emptyString)).toEqual('corrupt data');
  expect(isStringMissing(nonEmptyString)).toEqual(nonEmptyString);
});

test('number validator returns correct values', () => {
  const emptyNumber = '';
  const nonEmptyNumber = '1234';

  expect(isNumberMissing(emptyNumber)).toBe(null);
  expect(isNumberMissing(nonEmptyNumber)).toEqual(1234);
});
