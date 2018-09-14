// Use Cases
const { users } = require('../useCases');

// Error
const BusinessError = require('../BusinessError');
const errorMessages = require('../errors');

/**
 * Method to create a new user.
 * @param {String} username - User email
 * @returns {Object} - The method returns an object with the
 *                     new user created.
 */
const Create = async (username) => {
  if (!username) throw new BusinessError(errorMessages.PARAMS_REQUIRED, 'rps-user-module');
  const userCreated = users.create(username.toLowerCase());

  return userCreated;
};

/**
 * Method to read User by id
 * @param {String} userId - Id of user
 * @param {Object} select - Field to read
 * @returns {Object|undefined} - The method returns an object if the user exists,
 *                               else returns undefined.
 */
const ReadById = async (userId, select = { _id: 1 }) => {
  if (!userId) throw new BusinessError(errorMessages.PARAMS_REQUIRED, 'rps-user-module');
  const userFound = await users.readOne({ _id: userId }, select);

  return userFound;
};

module.exports = {
  Create,
  ReadById,
};
