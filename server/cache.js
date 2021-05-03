class Cache {
  constructor(...args) {
    this.cache = args || [];
  }
  add(item) {
    this.cache.push(item);
  }
  isLast(item) {
    return this.cache[this.cache.length - 1] === item;
  }
  clear() {
    this.cache = [];
  }
}

module.exports = Cache;
