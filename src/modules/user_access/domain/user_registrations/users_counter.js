// @ts-check

const { NotImplementedError } = require('../../../../building_blocks/domain/not_implemented_error');

/** @interface */
class UsersCounter {
  /**
   * @param {string} _login
   *
   * @returns {Promise<number>}
   */
  countUsersWithLogin(_login) {
    throw new NotImplementedError();
  }
}

module.exports = {
  UsersCounter,
};
