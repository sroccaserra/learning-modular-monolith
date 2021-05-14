// @ts-check

const { expect } = require('chai');

const { UserRegistration } = require('../../domain/user_registrations/user_registration');

describe('New user registration with unique login', function() {
  it('is successful', function() {
    // When
    const userRegistration = UserRegistration.registerNewUser(
      'login',
      'password',
      'test@example.net',
      'firstName',
      'lastName',
      null,
      'confirmLink',
    );

    // Then
    const events = _getAllDomainEvents(userRegistration);
    const newUserRegisteredDomainEvent = events[0];
    expect(newUserRegisteredDomainEvent).to.exist;
    expect(newUserRegisteredDomainEvent.userRegistrationId).to.deep.equal(userRegistration.id);
  });
});

function _getAllDomainEvents(aggregate) {
  return aggregate.domainEvents;
}
