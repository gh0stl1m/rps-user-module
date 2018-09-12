// External libraries
const { Schema } = require('mongoose');
const MongooseLeanVirtuals = require('mongoose-lean-virtuals');

// Drivers
const { MongoConnection } = require('../drivers');

// Define Schema
const Statistics = new Schema({
  user: { type: String, unique: true, required: true },
  gamesWins: { type: Number, required: true, default: 0 },
  gamesDefeats: { type: Number, required: true, default: 0 },
  gamesTie: { type: Number, required: true, default: 0 },
}, {
  timestamps: true,
  toObject: { virtuals: true },
});

// Define virtual variables
// Add 'id' field to virtuals
Statistics.virtual('id').get(function () {
  return this._id.toString();
});

// Plugins
Statistics.plugin(MongooseLeanVirtuals);

// Indexes
Statistics.index({ user: 1 });

module.exports = MongoConnection.model('user', Statistics);
