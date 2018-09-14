// External libraries
const { Schema } = require('mongoose');
const MongooseLeanVirtuals = require('mongoose-lean-virtuals');

// Drivers
const { MongoConnection } = require('../drivers');

// Define Schema
const User = new Schema({
  username: { type: String, unique: true, required: true },
}, {
  timestamps: true,
  toObject: { virtuals: true },
});

// Define virtual variables
// Add 'id' field to virtuals
User.virtual('id').get(function () {
  return this._id.toString();
});

// Plugins
User.plugin(MongooseLeanVirtuals);

// Indexes
User.index({ username: 1 });

module.exports = MongoConnection.model('user', User);
