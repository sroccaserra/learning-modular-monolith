// @ts-check

/**
 * @typedef {import('../users_counter').UsersCounter} UsersCounter
 * @typedef {import('../../../../../building_blocks/domain/business_rule').BusinessRule}
 *          BusinessRule
 */

/** @implements {BusinessRule} */
class UserLoginMustBeUniqueRule {
  /**
   * @param {number} usersCount
   */
  constructor(usersCount) {
    this.usersCount = usersCount;
  }

  isBroken() {
    return this.usersCount > 0;
  }
}

module.exports = {
  UserLoginMustBeUniqueRule,
};
