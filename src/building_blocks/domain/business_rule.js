// @ts-check

const { NotImplementedError } = require('./not_implemented_error');

/** @interface */
class BusinessRule {
  /** @returns {Boolean} */
  isBroken() {
    throw new NotImplementedError();
  }
}

module.exports = {
  BusinessRule,
};
