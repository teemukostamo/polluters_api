import Polluter from './Polluter';

export const bindModels = (knex) => {
  return {
    Polluter: Polluter.bindKnex(knex),
  };
};

export default bindModels;
