// @ts-check

const { expect, sinon, assertPublishedDomainEvent } = require('../../../../building_blocks/test/test_harness');

const { BusinessRuleValidationError } = require('../../../../building_blocks/domain/business_rule_validation_error');

const { UserRegistration } = require('../../domain/user_registrations/user_registration');
const { NewUserRegisteredDomainEvent } = require('../../domain/user_registrations/events/new_user_registered_domain_event');
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
    const newUserRegisteredDomainEvent = assertPublishedDomainEvent(
      NewUserRegisteredDomainEvent, userRegistration,
    );
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
