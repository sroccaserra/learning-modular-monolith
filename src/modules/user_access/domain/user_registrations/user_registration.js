// @ts-check

const { v4: uuidv4 } = require('uuid');

const { UserRegistrationId } = require('./user_registration_id');
const { NewUserRegisteredDomainEvent } = require('./events/new_user_registered_domain_event');

/** @typedef {import('./events/domain_event').DomainEvent} DomainEvent */
/** @typedef {any} UsersCounter */

class UserRegistration {
  /**
   * @param {string} login
   * @param {string} password
   * @param {string} email
   * @param {string} firstName
   * @param {string} lastName
   * @param {UsersCounter} _usersCounter
   * @param {string} confirmLink
   */
  constructor(login, password, email, firstName, lastName, _usersCounter, confirmLink) {
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
   * @returns {UserRegistration}
   */
  static registerNewUser(login, password, email, firstName, lastName, usersCounter, confirmLink) {
    return new UserRegistration(
      login, password, email, firstName, lastName,
      usersCounter, confirmLink,
    );
  }
}

module.exports = {
  UserRegistration,
};
