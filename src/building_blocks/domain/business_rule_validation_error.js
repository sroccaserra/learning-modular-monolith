// @ts-check

/** @typedef {import('./business_rule').BusinessRule} BusinessRule */

class BusinessRuleValidationError extends Error {
  /** @param {BusinessRule} rule */
  constructor(rule) {
    super();
    this.rule = rule;
  }
}

module.exports = {
  BusinessRuleValidationError,
};
