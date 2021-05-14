// @ts-check

const { v4: uuidv4 } = require('uuid');

const { BusinessRuleValidationError } = require('../../../../building_blocks/domain/business_rule_validation_error');

const { UserRegistrationId } = require('./user_registration_id');
const { NewUserRegisteredDomainEvent } = require('./events/new_user_registered_domain_event');
const { UserLoginMustBeUniqueRule } = require('./rules/user_login_must_be_unique_rule');

/**
 * @typedef {import('../../../../building_blocks/domain/domain_event').DomainEvent} DomainEvent
 * @typedef {import('../../../../building_blocks/domain/business_rule').BusinessRule} BusinessRule
 *
 * @typedef {import('./users_counter').UsersCounter} UsersCounter
 */

class UserRegistration {
  /**
   * @param {string} login
   * @param {string} password
   * @param {string} email
   * @param {string} firstName
   * @param {string} lastName
   * @param {number} usersCount
   * @param {string} confirmLink
   */
  constructor(login, password, email, firstName, lastName, usersCount, confirmLink) {
    this.checkRule(new UserLoginMustBeUniqueRule(usersCount));

    const userRegistrationId = new UserRegistrationId(uuidv4());

    /** @type {UserRegistrationId} */
    this.id = userRegistrationId;

    this.login = login;
    this.password = password;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;

    /** @type {Date} */
    this.registerDate = new Date();
    /** @type {DomainEvent[]} */
    this.domainEvents = [];

    this.addDomainEvent(new NewUserRegisteredDomainEvent(
      this.id, this.login, this.email, this.firstName, this.lastName,
      this.registerDate, confirmLink,
    ));
  }

  /** @param {BusinessRule} rule */
  checkRule(rule) {
    const result = rule.isBroken();
    if (result) {
      throw new BusinessRuleValidationError(rule);
    }
  }

  /** @param {DomainEvent} aDomainEvent */
  addDomainEvent(aDomainEvent) {
    this.domainEvents.push(aDomainEvent);
  }

  /**
   * @param {string} login
   * @param {string} password
   * @param {string} email
   * @param {string} firstName
   * @param {string} lastName
   * @param {UsersCounter} usersCounter
   * @param {string} confirmLink
   *
   * @returns {Promise<UserRegistration>}
   */
  static async registerNewUser(
    login, password, email, firstName, lastName,
    usersCounter, confirmLink,
  ) {
    const usersCount = await usersCounter.countUsersWithLogin(login);
    return new UserRegistration(
      login, password, email, firstName, lastName, usersCount, confirmLink,
    );
  }
}

module.exports = {
  UserRegistration,
};
