import { Model } from 'objection';

export class BaseModel extends Model {
  static get useLimitInFirst() {
    return true;
  }

  $beforeInsert() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }

  $beforeUpdate() {
    if (!this.updatedAt) {
      this.updatedAt = new Date();
    }
  }

  static get idColumn() {
    return 'id';
  }

  static get nameColumn() {
    return 'name';
  }

  static get yearColumn() {
    return 'year';
  }

  static get totalColumn() {
    return 'total';
  }

  static get solidFuelColumn() {
    return 'solidFuel';
  }

  static get liquidFuelColumn() {
    return 'liquidFuel';
  }

  static get gasFuelColumn() {
    return 'gasFuel';
  }

  static get cementColumn() {
    return 'cement';
  }

  static get gasFlaringColumn() {
    return 'gasFlaring';
  }

  static get perCapitaColumn() {
    return 'perCapita';
  }

  static get bunkerFuelsColumn() {
    return 'bunkerFuels';
  }
}

export default BaseModel;
