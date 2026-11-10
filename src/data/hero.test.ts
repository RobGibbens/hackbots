import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { heroTiming } from "./hero.ts";

describe("hero crossfade", () => {
  it("keeps the original three-photo loop", () => {
    const timing = heroTiming(3);
    assert.equal(timing.animate, true);
    assert.equal(timing.duration, 21);
    assert.deepEqual(timing.delays, [-1.4, 5.6, 12.6]);
    assert.equal(timing.fade, 6.667);
    assert.equal(timing.hold, 33.333);
    assert.equal(timing.out, 40);
  });

  it("scales the loop with the photo count", () => {
    const timing = heroTiming(4);
    assert.equal(timing.duration, 28);
    assert.deepEqual(timing.delays, [-1.4, 5.6, 12.6, 19.6]);
    assert.equal(timing.fade, 5);
    assert.equal(timing.hold, 25);
    assert.equal(timing.out, 30);
  });

  it("leaves a single photo and an empty folder still", () => {
    assert.equal(heroTiming(1).animate, false);
    assert.equal(heroTiming(0).animate, false);
    assert.deepEqual(heroTiming(1).delays, []);
  });
});
