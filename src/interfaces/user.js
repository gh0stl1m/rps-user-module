// Use Cases
const { user } = require('../useCases');

// Error
const BusinessError = require('../BusinessError');
const errorMessages = require('../errors');

/**
 * Method to create a new user.
 * @param {String} firtsName - User first name
 * @param {String} lastName - User last name
 * @param {String} username - User email
 * @returns {Object} - The method returns an object with the
 *                     new user created.
 */
const Create = async ({ firstName, lastName, username } = {}) => {
  if (!firstName || !lastName || !username) throw new BusinessError(errorMessages.PARAMS_REQUIRED, 'rps-user-module');
  const userCreated = user.create({
    firstName: firstName.toLowerCase(),
    lastName: lastName.toLowerCase(),
    username: username.toLowerCase(),
  });

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
  const userFound = await user.readOne({ _id: userId }, select);

  return userFound;
};

module.exports = {
  Create,
  ReadById,
};
