const NodeCache = require("node-cache");

class CacheService {
  constructor() {
    this.cache = new NodeCache({ stdTTL: 5 * 60, checkperiod: 60 });
  }

  set(key, value, ttl = 5 * 60) {
    value = JSON.stringify(value);
    this.cache.set(key, value, ttl);
  }
  get(key) {
    return this.cache.get(key);
  }
  del(key) {
    this.cache.del(key);
  }
  flushAll() {
    this.cache.flushAll();
  }
  has(key) {
    return this.cache.has(key);
  }
  keys() {
    return this.cache.keys();
  }
  async getOrSet(key, fetchFn, ttl = 5 * 60) {
    console.log("keys:>>", this.keys());
    if (this.has(key)) {
      console.log("from Cache>>>");
      return this.get(key);
    }
    console.log("from Database>>>");

    const value = await fetchFn();
    this.set(key, value, ttl);
    return value;
  }

  getStats() {
    return this.cache.getStats();
  }
}

// module.exports = new CacheService();
const cacheService = new CacheService();
module.exports = {
  cacheService,
  CacheService,
};
