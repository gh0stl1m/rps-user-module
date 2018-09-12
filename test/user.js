// External libraries
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
const dirtyChai = require('dirty-chai');
const chaiAsPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');

// Entities
const { User } = require('../src/entities');

// Use cases
const { user } = require('../src/useCases');

// Chai expect
const expect = chai.expect;

// Add plugins to chai
chai.use(chaiAsPromised);
chai.use(dirtyChai);
chai.use(sinonChai);

describe('User Domain', function () {
  // logger
  const loggerStub = () => sinon.stub();

  // Before test
  let userUseCases;
  let userCreateStub;
  let sandbox;
  before(() => {
    userUseCases = proxyquire('../src/useCases/user', {
      logger: loggerStub,
    });
    sandbox = sinon.sandbox.create();
    // User entity
    userCreateStub = sandbox.stub(User, "create")
      .resolves({
        id: 'id1',
        profile: {
          firstName: 'test',
          lastName: 'user',
        },
        username: 'testUser',
      });
  });
  afterEach(() => {
    sandbox.reset();
  });
  after(() => {
    sandbox.restore();
  });

  context('Use Cases', function() {
    it('should create a new user, if it not exists', async () => {
      // User To Create
      const testUsername = 'testUser';
      const testFirstName = 'test';
      const testLastName = 'user';

      const newUser = await user.create({
        firstName: testFirstName,
        lastName: testLastName,
        username: testUsername,
      });
      // Validations
      sinon.assert.calledOnce(userCreateStub);
      sinon.assert.calledWith(userCreateStub, sinon.match({
        username: testUsername,
        'profile.firstName': testFirstName,
        'profile.lastName': testLastName,
      }));
      expect(newUser).to.be.an('object').with.property('id').and.equal('id1');
      expect(newUser).to.be.an('object').with.property('username').and.equal('testUser');
    });
  }); // context
}); // describe

