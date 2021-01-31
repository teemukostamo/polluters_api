const _ = require('lodash');
const db = require('../config/db');
const ErrorResponse = require('../utils/errorResponse');
const { validFrom, validTop, validType } = require('./validators');

exports.getPolluters = async (req, res, next) => {
  const { from, to, top, type } = req.query;

  if (!from || !type || !validType(type) || !validFrom(Number(from))) {
    return next(
      new ErrorResponse(
        'Please add valid parameters from (a year between 1751 - 2014) and type (type of pollution, total, cement, solidfuel, liquidfuel, gasfuel, gasflaring, percapita, bunkerfuels)',
        400,
      ),
    );
  }
  const lowerCaseType = type.toLowerCase();

  let limit;
  if (!top) {
    limit = 50;
  } else if (validTop(top)) {
    limit = Number(top);
  } else {
    return next(
      new ErrorResponse(
        'Please add valid parameter top (a number between 1-100). When omitted, top 50 polluters are shown ',
        400,
      ),
    );
  }

  let response = await new Promise((resolve, reject) => {
    db.find({ year: { $gte: Number(from) } }, (err, doc) => {
      if (err) reject(err);
      resolve(doc);
    });
  });

  if (to && to <= from) {
    return next(
      new ErrorResponse(
        'Please add valid parameter to (must be greater than from). If no parameter is provided, polluters until 2014 are shown',
        400,
      ),
    );
  }

  if (to) {
    response = response.filter((element) => element.year <= Number(to));
  }

  const resultModel = {
    country: null,
    [lowerCaseType]: null,
  };

  const filteredResults = [];

  response.forEach((r) => {
    const polluters = [];

    r.polluters.forEach((polluter) => {
      const result = _(polluter)
        .pick(_.keys(resultModel))
        .omitBy(_.isNil)
        .value();
      polluters.push(result);
    });

    const obj = {
      year: r.year,
      polluters: _.sortBy(polluters, [lowerCaseType]).reverse(),
    };

    filteredResults.push(obj);
  });

  filteredResults.sort((a, b) => a.year - b.year);

  return res.send(
    filteredResults.map((r) => {
      const result = {
        year: r.year,
        polluters: r.polluters
          .filter((obj) => Object.keys(obj).includes(lowerCaseType))
          .slice(0, limit),
      };

      return result;
    }),
  );
};
