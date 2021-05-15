// @ts-check

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const sinon = require('sinon');

module.exports = {
  expect: chai.expect,
  sinon,
  assertPublishedDomainEvent,
};

function assertPublishedDomainEvent(eventType, aggregate) {
  const events = _getAllDomainEvents(aggregate).filter((event) => event instanceof eventType);
  chai.expect(events).to.have.length(1, `${eventType.name} event not published`);
  return events[0];
}

function _getAllDomainEvents(aggregate) {
  return aggregate.domainEvents;
}
