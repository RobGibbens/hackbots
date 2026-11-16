import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildSeasonRecap } from "./season-recap.ts";
import { defaultLogoFromMap, pickSeasonImage, seasonImageAlt } from "./season-image.ts";

const teamNumber = 3414;

function event(overrides: Record<string, unknown>) {
  return {
    key: "2025mifer",
    name: "FIM District Ferndale Event",
    event_type: 1,
    city: "Ferndale",
    state_prov: "MI",
    start_date: "2025-02-28",
    end_date: "2025-03-02",
    ...overrides,
  };
}

describe("buildSeasonRecap", () => {
  it("calls out a winner and keeps that event in the official record", () => {
    const recap = buildSeasonRecap({
      year: 2025,
      teamNumber,
      events: [event({ key: "2025mifer" })],
      statuses: {
        "2025mifer": {
          qual: {
            num_teams: 40,
            ranking: { rank: 9, record: { wins: 8, losses: 4, ties: 0 }, sort_orders: [2.4] },
            sort_order_info: [{ name: "Ranking Score", precision: 2 }],
          },
          playoff: { level: "f", status: "won", record: { wins: 3, losses: 1, ties: 0 } },
        },
      },
      awards: [
        { award_type: 1, event_key: "2025mifer", name: "District Event Winner" },
        { award_type: 9, event_key: "2025mifer", name: "Excellence in Engineering Award" },
      ],
      districts: [{ key: "2025fim", year: 2025 }],
      rankings: [
        { team_key: "frc3414", rank: 70 },
        { team_key: "frc254", rank: 1 },
      ],
      statbotics: {
        epa: { breakdown: { total_points: 80.14, auto_points: 12, teleop_points: 40.2, endgame_points: 18 } },
        rank: { world: 120, country: { rank: 80, team_count: 2500 } },
      },
    });

    assert.equal(recap.record, "11–5–0");
    assert.equal(recap.started, true);
    assert.equal(recap.events[0]?.finish, "winner");
    assert.deepEqual(recap.events[0]?.awards, ["Excellence in Engineering Award"]);
    assert.equal(recap.events[0]?.rank, "9 of 40");
    assert.equal(recap.events[0]?.rankingPoints, "2.40");
    assert.equal(recap.events[0]?.record, "11–5–0");
    assert.equal(recap.events[0]?.dates, "February 28 – March 2, 2025");
    assert.equal(recap.districtRank, "70 of 2");
    assert.equal(recap.totalEpa, "80.1");
    assert.equal(recap.worldRank, "#120");
    assert.equal(recap.countryRank, "80 of 2500");
    assert.equal(recap.auto, "12.0");
  });

  it("calls out a finalist eliminated in the finals", () => {
    const recap = buildSeasonRecap({
      year: 2025,
      teamNumber,
      events: [event({})],
      statuses: {
        "2025mifer": {
          qual: { ranking: { rank: 9, record: { wins: 6, losses: 6, ties: 0 } } },
          playoff: { level: "f", status: "eliminated", record: { wins: 2, losses: 2, ties: 0 } },
        },
      },
      awards: [],
      districts: [],
      rankings: [],
      statbotics: null,
    });

    assert.equal(recap.events[0]?.finish, "finalist");
    assert.equal(recap.record, "8–8–0");
  });

  it("leaves an offseason win out of the season record and still lists it", () => {
    const recap = buildSeasonRecap({
      year: 2025,
      teamNumber,
      events: [
        event({ key: "2025mifer", start_date: "2025-02-28", end_date: "2025-03-02" }),
        event({
          key: "2025mibgr",
          name: "MI Bloomfield Girls Robotics Competition",
          event_type: 99,
          city: "Bloomfield Township",
          start_date: "2025-10-25",
          end_date: "2025-10-25",
        }),
      ],
      statuses: {
        "2025mifer": {
          qual: { ranking: { record: { wins: 6, losses: 6, ties: 0 } } },
          playoff: { record: { wins: 1, losses: 2, ties: 0 }, level: "sf", status: "eliminated" },
        },
        "2025mibgr": {
          qual: { ranking: { record: { wins: 6, losses: 1, ties: 0 } } },
          playoff: { level: "f", status: "won", record: { wins: 4, losses: 0, ties: 0 } },
        },
      },
      awards: [],
      districts: [],
      rankings: null,
      statbotics: null,
    });

    assert.equal(recap.record, "7–8–0");
    assert.equal(recap.events[1]?.offseason, true);
    assert.equal(recap.events[1]?.finish, "winner");
    assert.equal(recap.events[1]?.record, "10–1–0");
    assert.equal(recap.events[1]?.dates, "October 25, 2025");
  });

  it("omits ranking points when the year has no ranking score", () => {
    const recap = buildSeasonRecap({
      year: 2014,
      teamNumber,
      events: [event({ key: "2014mili", event_type: 0, start_date: "2014-03-01", end_date: "2014-03-01" })],
      statuses: {
        "2014mili": {
          qual: {
            ranking: { rank: 12, record: { wins: 4, losses: 4, ties: 1 }, sort_orders: [8] },
            sort_order_info: [{ name: "Qual Avg", precision: 0 }],
          },
        },
      },
      awards: [{ award_type: 2, event_key: "2014mili", name: "Finalist" }],
      districts: [],
      rankings: [],
      statbotics: null,
    });

    assert.equal(recap.events[0]?.rankingPoints, null);
    assert.equal(recap.events[0]?.finish, "finalist");
  });

  it("leaves district rank empty when the team was not in a district", () => {
    const recap = buildSeasonRecap({
      year: 2013,
      teamNumber,
      events: [],
      statuses: {},
      awards: [],
      districts: [{ key: "2014fim", year: 2014 }],
      rankings: [{ team_key: "frc3414", rank: 1 }],
      statbotics: null,
    });

    assert.equal(recap.districtRank, null);
    assert.equal(recap.started, false);
    assert.equal(recap.record, null);
  });

  it("leaves phase scores empty when Statbotics has no breakdown", () => {
    const recap = buildSeasonRecap({
      year: 2015,
      teamNumber,
      events: [],
      statuses: {},
      awards: [],
      districts: [],
      rankings: [],
      statbotics: { epa: { total_points: { mean: 22.5 } }, total_epa_rank: 400 },
    });

    assert.equal(recap.totalEpa, "22.5");
    assert.equal(recap.worldRank, "#400");
    assert.equal(recap.auto, null);
    assert.equal(recap.teleop, null);
    assert.equal(recap.endgame, null);
    assert.equal(recap.countryRank, null);
  });

  it("ignores a preseason event", () => {
    const recap = buildSeasonRecap({
      year: 2027,
      teamNumber,
      events: [event({ event_type: 100, key: "2027pre" })],
      statuses: {},
      awards: [],
      districts: [],
      rankings: [],
      statbotics: null,
    });

    assert.equal(recap.started, false);
    assert.equal(recap.events.length, 0);
  });
});

describe("season images", () => {
  it("uses the year file unless the season sets its own image", () => {
    const logos = {
      "../content/seasons/2025.webp": "logo",
      "../content/seasons/photos/2025/pit.jpg": "photo",
    };
    assert.equal(defaultLogoFromMap("2025", logos), "logo");
    assert.equal(pickSeasonImage(undefined, "logo"), "logo");
    assert.equal(pickSeasonImage("override", "logo"), "override");
    assert.equal(seasonImageAlt("Reefscape", undefined, false), "Reefscape game logo");
    assert.equal(seasonImageAlt("Reefscape", "The 2025 Robot", true), "The 2025 Robot");
  });
});
