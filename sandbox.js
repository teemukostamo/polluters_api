const _ = require('lodash');

const data = [
  {
    year: 1999,
    polluters: [
      { name: 'usa', total: 'unknown', cement: 0 },
      { name: 'russia', total: 100, cement: 25 },
      { name: 'aruba', total: 3, cement: null },
    ],
  },
  {
    year: 1555,
    polluters: [
      { cement: 4, total: 300, name: 'USA' },
      { name: 'russia', total: 200, cement: 75 },
      { name: 'aruba', total: 4, cement: 0 },
    ],
  },
  {
    year: 2001,
    polluters: [
      { cement: 200, total: 0, name: 'USA' },
      { name: 'russia', total: 200, cement: 400 },
      { name: 'aruba', total: 4, cement: 2 },
    ],
  },
];

// data.forEach((d) => {
//   _.sortBy(d.polluters, ['cement']);
// });

// take types into an array
const arr = ['cement', 'name', 'total'];

// add types into a model object, include name
let model = {
  name: null,
};

// add types from req.query into model
arr.forEach((a) => {
  console.log(a);
  model = {
    ...model,
    [a]: null,
  };
});

// create an array for results
const arr2 = [];

// pick only required fields for results, filter out null values, sort by given type
data.forEach((d) => {
  let obj = {
    year: d.year,
    polluters: [],
  };
  d.polluters.forEach((polluter) => {
    let result = _(polluter).pick(_.keys(model)).pickBy(_.identity).value();
    console.log(result);
    obj.polluters.push(result);
  });

  obj = {
    year: obj.year,
    polluters: _.sortBy(obj.polluters, ['cement']),
  };

  arr2.push(obj);
});

console.log('TOLOWERCASE'.toLowerCase());

console.log(
  arr2.forEach((a) => {
    console.log(a.polluters);
  }),
);

// const validType = (type) => {
//   if (type !== 'total' || type !== 'cement' || !type) {
//     return false;
//   } else {
//     return true;
//   }
// };

// const type = 'tits';

// console.log(!validType(type));

const validTop = (number) => {
  if (number > 0 && number < 101) {
    return true;
  } else if (number === undefined) {
    return true;
  } else {
    return false;
  }
};

data.sort((a, b) => a.year - b.year);

data.forEach((d) => {
  let data = _.sortBy(d, (o) => o.total);
  console.log('yo', data);
});
