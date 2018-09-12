// Logger
const logger = require('../logger');

// Business Errors
const errorNames = require('../errors');
const BusinessError = require('../BusinessError');

// Entities
const { User } = require('../entities');

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
 * @param {Object} firtsName - User first name
 * @param {Object} lastName - User last name
 * @param {Object} username - User email
 * @returns {Object} - The method returns an object with the
 *                     new user created.
 */
const create = async ({ firstName, lastName, username }) => {
  // Validate if user already exists
  const userAlreadyExists = await readOne({ username }, { _id: 1, username: 1, profile: 1 });
  if (userAlreadyExists) return userAlreadyExists;
  // Will create a new user;
  let userCreated;
  try {
    userCreated = await User.create({
      username,
      'profile.firstName': firstName,
      'profile.lastName': lastName,
    });
  } catch (err) {
    logger.error(`(rps-user-module): Error creating user: ${err.message}`);
    throw new BusinessError(errorNames.DATABASE_ERROR, 'rps-user-module');
  }
  // TODO Create user statistics

  return userCreated;
};

module.exports = {
  readOne,
  create,
};
