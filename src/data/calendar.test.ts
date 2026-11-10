import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  calendarDayISO,
  compareIsoDate,
  detroitToday,
  eventBadge,
  formatLongDate,
  isUpcoming,
} from "./calendar.ts";

describe("calendar dates", () => {
  it("reads today in America/Detroit", () => {
    assert.equal(detroitToday(new Date("2026-11-10T04:30:00Z")), "2026-11-09");
    assert.equal(detroitToday(new Date("2026-11-10T05:30:00Z")), "2026-11-10");
  });

  it("treats the Detroit calendar day as upcoming", () => {
    const today = "2026-11-10";
    assert.equal(isUpcoming("2026-11-10", today), true);
    assert.equal(isUpcoming("2026-11-09", today), false);
  });

  it("sorts YYYY-MM-DD strings in calendar order", () => {
    assert.equal(compareIsoDate("2026-11-09", "2026-11-10"), -1);
    assert.equal(compareIsoDate("2026-12-01", "2026-11-10"), 1);
  });

  it("formats a date without shifting the calendar day", () => {
    assert.equal(formatLongDate("2027-01-09"), "January 9, 2027");
    assert.deepEqual(eventBadge("2027-01-09"), { month: "JAN", day: "9" });
    assert.equal(calendarDayISO(new Date("2027-01-09T00:00:00Z")), "2027-01-09");
  });
});
