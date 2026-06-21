/**
 * @param {string} senate
 * @return {string}
 */
const predictPartyVictory = function (senate) {
  const radiant = [];
  const dire = [];
  const n = senate.length;

  for (let i = 0; i < n; i++) {
    if (senate[i] === "R") radiant.push(i);
    else dire.push(i);
  }

  while (radiant.length && dire.length) {
    const r = radiant.shift();
    const d = dire.shift();

    if (r < d) {
      radiant.push(r + n);
    } else {
      dire.push(d + n);
    }
  }

  return radiant.length ? "Radiant" : "Dire";
};

const assert = require("node:assert/strict");
const { test } = require("node:test");

test("example 1 - Radiant bans the next senator then wins", () => {
  assert.equal(predictPartyVictory("RD"), "Radiant");
});

test("example 2 - Dire wins with a majority", () => {
  assert.equal(predictPartyVictory("RDD"), "Dire");
});

test("single Radiant senator wins immediately", () => {
  assert.equal(predictPartyVictory("R"), "Radiant");
});

test("single Dire senator wins immediately", () => {
  assert.equal(predictPartyVictory("D"), "Dire");
});

test("DR - the earlier senator acts first and wins", () => {
  assert.equal(predictPartyVictory("DR"), "Dire");
});

test("all Radiant - Radiant wins", () => {
  assert.equal(predictPartyVictory("RRRR"), "Radiant");
});

test("all Dire - Dire wins", () => {
  assert.equal(predictPartyVictory("DDDD"), "Dire");
});

test("equal counts, Radiant leads - Radiant wins by acting first", () => {
  assert.equal(predictPartyVictory("RDRD"), "Radiant");
});

test("equal counts, Dire leads - Dire wins by acting first", () => {
  assert.equal(predictPartyVictory("DRDR"), "Dire");
});

test("Dire majority across mixed order", () => {
  assert.equal(predictPartyVictory("RDDDR"), "Dire");
});

test("Radiant majority across mixed order", () => {
  assert.equal(predictPartyVictory("RRDRD"), "Radiant");
});

test("Dire wins despite minority - earlier senators ban the Radiant majority", () => {
  assert.equal(predictPartyVictory("DDRRR"), "Dire");
});

test("Radiant wins despite minority - order beats raw counts", () => {
  assert.equal(predictPartyVictory("RRDDD"), "Radiant");
});
