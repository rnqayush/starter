// Dynamic model loader - uses MongoDB if available, fallback otherwise

let User;

const loadModels = () => {
  if (global.isMongoConnected) {
    // Use MongoDB models
    User = require('./User');
  } else {
    // Use fallback in-memory models
    User = require('../data/fallbackUsers');
  }
};

// Initialize models
loadModels();

module.exports = {
  User,
  loadModels,
};
