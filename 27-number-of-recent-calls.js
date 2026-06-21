class RecentCounter {
  constructor() {
    this.queue = [];
  }
}
/**
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function (t) {
  this.queue.push(t);

  while (this.queue[0] < t - 3000) {
    this.queue.shift();
  }

  return this.queue.length;
};

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */

const assert = require("node:assert/strict");
const { test } = require("node:test");

test("example 1 - oldest ping drops out of the window", () => {
  const counter = new RecentCounter();
  assert.equal(counter.ping(1), 1);
  assert.equal(counter.ping(100), 2);
  assert.equal(counter.ping(3001), 3);
  assert.equal(counter.ping(3002), 3);
});

test("first ping always returns 1", () => {
  const counter = new RecentCounter();
  assert.equal(counter.ping(0), 1);
});

test("ping exactly 3000 apart is still in range (inclusive)", () => {
  const counter = new RecentCounter();
  assert.equal(counter.ping(1), 1);
  assert.equal(counter.ping(3001), 2); // range [1, 3001] includes the ping at 1
});

test("ping more than 3000 apart drops the earlier one", () => {
  const counter = new RecentCounter();
  assert.equal(counter.ping(1), 1);
  assert.equal(counter.ping(3002), 1); // range [2, 3002] excludes the ping at 1
});

test("boundary: difference of exactly 3000 stays, 3001 drops", () => {
  const counter = new RecentCounter();
  assert.equal(counter.ping(100), 1);
  assert.equal(counter.ping(3100), 2); // 3100 - 100 = 3000, inclusive
  assert.equal(counter.ping(3101), 2); // 3101 - 100 = 3001, the ping at 100 drops
});

test("many pings all within the window", () => {
  const counter = new RecentCounter();
  assert.equal(counter.ping(1), 1);
  assert.equal(counter.ping(2), 2);
  assert.equal(counter.ping(3), 3);
  assert.equal(counter.ping(4), 4);
  assert.equal(counter.ping(5), 5);
});

test("large gap resets the effective window to a single ping", () => {
  const counter = new RecentCounter();
  assert.equal(counter.ping(1), 1);
  assert.equal(counter.ping(2), 2);
  assert.equal(counter.ping(10000), 1); // both earlier pings are far outside [7000, 10000]
});

test("independent counters do not share state", () => {
  const a = new RecentCounter();
  const b = new RecentCounter();
  assert.equal(a.ping(1), 1);
  assert.equal(a.ping(2), 2);
  assert.equal(b.ping(5000), 1); // b has its own empty history
});
