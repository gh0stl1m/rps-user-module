// External libraries
const _ = require('lodash');

// Errors
const BusinessError = require('../BusinessError');
const errorNames = require('../errors');

// Use Cases
const { statistics } = require('../useCases');

/**
 * Method to report statistics
 * @param {String} userId - Id of user
 * @param {String} kind - Type of statistic
 */
const ReportStatistics = async (userId, kind) => {
  if (!userId || !kind) throw new BusinessError(errorNames.PARAMS_REQUIRED, 'rps-user-module');
  if (!(_.includes(['WIN', 'DEFEAT', 'TIE'], kind.toUpperCase()))) throw new BusinessError(errorNames.KIND_NOT_ALLOWED, 'rps-user-module');

  // Report statistic
  await statistics.reportStatistic(userId, kind.toUpperCase());
};

/**
 * Method to read the user statistics
 * @param {String} userId - Id of user
 * @param {Object} select - Fields to return
 * @returns {Object} - The method returns an object with the user statistics if it exists
 */
const ReadStatistics = async (userId, select = { _id: 1 }) => {
  if (!userId) throw new BusinessError(errorNames.PARAMS_REQUIRED, 'rps-user-module');
  const userStatistics = await statistics.readOne({
    user: userId,
  }, select);

  return userStatistics;
};

module.exports = { ReportStatistics, ReadStatistics };
