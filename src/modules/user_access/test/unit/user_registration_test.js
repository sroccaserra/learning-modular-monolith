// @ts-check

const sinon = require('sinon');

const { expect } = require('../../../../building_blocks/test/test_harness');

const { BusinessRuleValidationError } = require('../../../../building_blocks/domain/business_rule_validation_error');

const { UserRegistration } = require('../../domain/user_registrations/user_registration');
const { UsersCounter } = require('../../domain/user_registrations/users_counter');

describe('New user registration', function() {
  it('is successful with unique login', async function() {
    // Given
    const usersCounter = new UsersCounter();
    sinon.stub(usersCounter, 'countUsersWithLogin').withArgs('login').resolves(0);

    // When
    const userRegistration = await UserRegistration.registerNewUser(
      'login',
      'password',
      'test@example.net',
      'firstName',
      'lastName',
      usersCounter,
      'confirmLink',
    );

    // Then
    const events = _getAllDomainEvents(userRegistration);
    const newUserRegisteredDomainEvent = events[0];
    expect(newUserRegisteredDomainEvent).to.exist;
    expect(newUserRegisteredDomainEvent.userRegistrationId).to.deep.equal(userRegistration.id);
  });

  it('breaks "user must be unique" rule with non unique login', async function() {
    // Given
    const usersCounter = new UsersCounter();
    sinon.stub(usersCounter, 'countUsersWithLogin').withArgs('login').resolves(1);

    // When
    const registrationPromise = UserRegistration.registerNewUser(
      'login',
      'password',
      'test@example.net',
      'firstName',
      'lastName',
      usersCounter,
      'confirmLink',
    );

    // Then
    await expect(registrationPromise).to.be.rejectedWith(BusinessRuleValidationError);
  });
});

function _getAllDomainEvents(aggregate) {
  return aggregate.domainEvents;
}
