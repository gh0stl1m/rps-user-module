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

module.exports = { ReportStatistics };
