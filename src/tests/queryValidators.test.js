const { validType, validTop, validFrom } = require('../rest/validators');

test('query type parameter validator returns correct value', () => {
  const types = [
    'total',
    'cement',
    'gasflaring',
    'bunkerfuels',
    'liquidfuel',
    'gasfuel',
    'solidfuel',
    'percapita',
  ];

  const invalidTypes = ['this', 'is', 'invalid', '1234'];

  types.forEach((type) => {
    expect(validType(type)).toBe(true);
  });

  invalidTypes.forEach((invalidType) => {
    expect(validType(invalidType)).toBe(false);
  });
});

test('query top parameter validator returns correct value', () => {
  const validTopParameter = 50;
  const invalidTopParameter1 = -1;
  const invalidTopParameter2 = 500000;

  expect(validTop(validTopParameter)).toBe(true);
  expect(validTop(invalidTopParameter1)).toBe(false);
  expect(validTop(invalidTopParameter2)).toBe(false);
});

test('query from parameter validator returns correct value', () => {
  const validFromParameter = 2000;
  const invalidFromParameter1 = -1;
  const invalidFromParameter2 = 500000;

  expect(validFrom(validFromParameter)).toBe(true);
  expect(validFrom(invalidFromParameter1)).toBe(false);
  expect(validFrom(invalidFromParameter2)).toBe(false);
});
