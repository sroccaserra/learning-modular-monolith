// @ts-check

const { DomainEvent } = require('../../../../../building_blocks/domain/domain_event');

/** @typedef {import('../user_registration_id').UserRegistrationId} UserRegistrationId */

class NewUserRegisteredDomainEvent extends DomainEvent {
  /**
   * @param {UserRegistrationId} userRegistrationId
   * @param {string} login
   * @param {string} email
   * @param {string} firstName
   * @param {string} lastName
   * @param {Date} registerDate
   * @param {string} confirmLink
   */
  constructor(userRegistrationId, login, email, firstName, lastName, registerDate, confirmLink) {
    super();

    this.userRegistrationId = userRegistrationId;
    this.login = login;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.registerDate = registerDate;
    this.confirmLink = confirmLink;
  }
}

module.exports = {
  NewUserRegisteredDomainEvent,
};
