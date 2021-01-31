const validFrom = (number) => {
  if (number > 1750 && number < 2015) {
    return true;
  }
  return false;
};

const validTop = (number) => {
  if (number > 0 && number < 101) {
    return true;
  }
  return false;
};

const validType = (type) => {
  switch (type.toLowerCase()) {
    case 'total':
      return true;
    case 'cement':
      return true;
    case 'solidfuel':
      return true;
    case 'liquidfuel':
      return true;
    case 'gasfuel':
      return true;
    case 'gasflaring':
      return true;
    case 'percapita':
      return true;
    case 'bunkerfuels':
      return true;
    default:
      return false;
  }
};

module.exports = {
  validType,
  validTop,
  validFrom,
};
