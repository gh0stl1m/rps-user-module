// Logger
const logger = require('../logger');

// Business Errors
const errorNames = require('../errors');
const BusinessError = require('../BusinessError');

// Entities
const { Statistics } = require('../entities');

/**
 * Method to read the statistics
 * @param {Object} query - Filter query
 * @param {Object} select - Fields of document to return
 * @returns {Object} - The method returns an object with the element found by
 *                     the query criteria
 */
const readOne = async (query, select = { _id: 1 }) => (await Statistics.find(query, select)
  .limit(1)
  .lean({ virtuals: true }))[0];

/**
 * Method to create a new user statistic.
 * @param {Object} userId - Id of the User
 * @returns {Object} - The method returns an object with the
 *                     new user created.
 */
const create = async (userId) => {
  // Will create a new user;
  let userCreated;
  try {
    userCreated = await Statistics.create({
      user: userId,
      gamesWins: 0,
      gamesDefeats: 0,
      gamesTie: 0,
    });
  } catch (err) {
    logger.error(`(rps-user-module): Error creating user statistic: ${err.message}`);
    throw new BusinessError(errorNames.DATABASE_ERROR, 'rps-user-module');
  }

  return userCreated;
};

/**
 * Method to report statistics
 * @param {String} userId - Id of user
 * @param {String} kind - Type of statistic
 */

const reportStatistic = async (userId, kind) => {
  let paramsToUpdate = {};
  switch (kind) {
    case 'WIN':
      paramsToUpdate = { $inc: { gamesWins: 1 } };
      break;
    case 'DEFEAT':
      paramsToUpdate = { $inc: { gamesDefeats: 1 } };
      break;
    case 'TIE':
      paramsToUpdate = { $inc: { gamesTie: 1 } };
      break;
    default:
      paramsToUpdate = {};
  }
  // Update statistics
  const updateStatus = await Statistics.update({
    user: userId,
  }, paramsToUpdate);

  if ((updateStatus.ok === 0) || (updateStatus.nModified === 0)) {
    throw new BusinessError(errorNames.USER_DOES_NOT_EXISTS, 'rps-user-module');
  }
};

module.exports = {
  readOne,
  create,
  reportStatistic,
};
