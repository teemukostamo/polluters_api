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
