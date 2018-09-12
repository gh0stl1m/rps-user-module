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
  // TODO Create user statistics

  return userCreated;
};

module.exports = {
  readOne,
  create,
};
