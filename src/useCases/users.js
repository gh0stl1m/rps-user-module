// Logger
const logger = require('../logger');

// Business Errors
const errorNames = require('../errors');
const BusinessError = require('../BusinessError');

// Entities
const { User } = require('../entities');

// Use Cases
const statistics = require('./statistics');

/**
 * Method to read one user
 * @param {Object} query - Filter query
 * @param {Object} select - Fields of document to return
 * @returns {Object} - The method returns an object with the element found by
 *                     the query criteria
 */
const readOne = async (query, select = { _id: 1 }) => (await User.find(query, select)
  .limit(1)
  .lean({ virtuals: true }))[0];

/**
 * Method to create a new user.
 * @param {String} username - User email
 * @returns {Object} - The method returns an object with the
 *                     new user created.
 */
const create = async (username) => {
  // Validate if user already exists
  const userAlreadyExists = await readOne({ username }, { _id: 1, username: 1 });
  if (userAlreadyExists) return userAlreadyExists;
  // Will create a new user;
  let userCreated;
  try {
    userCreated = await User.create({ username });
  } catch (err) {
    logger.error(`(rps-user-module): Error creating user: ${err.message}`);
    throw new BusinessError(errorNames.DATABASE_ERROR, 'rps-user-module');
  }
  // Create user statistics
  statistics.create(userCreated._id)
    .then(() => logger.info(`(rps-user-module): Statistic created for user ${userCreated._id}`))
    .catch(err => logger.error(`(rps-user-module): Error creating user statistic: ${err.message}`));

  return userCreated;
};

module.exports = {
  readOne,
  create,
};
