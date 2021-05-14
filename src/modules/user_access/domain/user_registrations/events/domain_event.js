// @ts-check

const { v4: uuidv4 } = require('uuid');

class DomainEvent {
  constructor() {
    this.id = uuidv4();
  }
}

module.exports = {
  DomainEvent,
};
