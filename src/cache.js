const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes

function getFromCache(key) {
  return cache.get(key);
}

function saveToCache(key, value) {
  cache.set(key, value);
}

module.exports = { getFromCache, saveToCache };
