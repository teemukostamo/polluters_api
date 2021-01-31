// eslint-disable-next-line node/no-unpublished-require
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('response is json and status code is 200', async () => {
  await api
    .get('/worst/polluters?from=2011&type=total')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('the right amount and right type of results is fetched', async () => {
  const results = await api
    .get('/worst/polluters?from=2011&type=total&to=2014&top=30')
    .expect(200);

  expect(results.body.length).toBe(4);

  results.body.forEach((result) => {
    expect(result.polluters.length).toBe(30);

    result.polluters.forEach((polluter) => {
      expect(polluter).toEqual(
        expect.objectContaining({
          country: expect.any(String),
          total: expect.any(Number),
        }),
      );
    });
  });
});

test('missing from parameter gives error', async () => {
  const result = await api
    .get('/worst/polluters?type=total&to=2014&top=30')
    .expect(400);

  console.log(result.body);

  expect(result.body.success).toBe(false);
  expect(result.body.error).toEqual(
    'Please add valid parameters from (a year between 1751 - 2014) and type (type of pollution, total, cement, solidfuel, liquidfuel, gasfuel, gasflaring, percapita, bunkerfuels)',
  );
});

test('invalid type gives error', async () => {
  const result = await api
    .get('/worst/polluters?type=nonexisting&from=1999')
    .expect(400);

  expect(result.body.success).toBe(false);
  expect(result.body.error).toEqual(
    'Please add valid parameters from (a year between 1751 - 2014) and type (type of pollution, total, cement, solidfuel, liquidfuel, gasfuel, gasflaring, percapita, bunkerfuels)',
  );
});

test('to is smaller than from gives error', async () => {
  const result = await api
    .get('/worst/polluters?from=1999&type=total&to=1995')
    .expect(400);

  console.log(result.body);

  expect(result.body.success).toBe(false);
  expect(result.body.error).toEqual(
    'Please add valid parameter to (must be greater than from). If no parameter is provided, polluters until 2014 are shown',
  );
});
