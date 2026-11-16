import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadSeasonRecap } from "./frc-client.ts";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

describe("loadSeasonRecap", () => {
  it("does not call The Blue Alliance without a read key", async () => {
    let called = false;
    const result = await loadSeasonRecap(2025, {
      apiKey: "  ",
      fetch: async () => {
        called = true;
        return jsonResponse({});
      },
    });
    assert.equal(called, false);
    assert.equal(result.tbaError, true);
    assert.equal(result.recap, null);
  });

  it("loads events when Statbotics fails", async () => {
    const requested: string[] = [];
    const result = await loadSeasonRecap(2025, {
      apiKey: "test-key",
      teamNumber: 3414,
      fetch: async (input, init) => {
        const url = String(input);
        requested.push(url);
        const headers = new Headers(init?.headers);
        assert.equal(headers.get("X-TBA-Auth-Key"), url.includes("statbotics") ? null : "test-key");
        if (url.includes("statbotics")) return jsonResponse({}, 500);
        if (url.endsWith("/events/2025")) {
          return jsonResponse([
            {
              key: "2025mifer",
              name: "Ferndale",
              event_type: 1,
              city: "Ferndale",
              state_prov: "MI",
              start_date: "2025-02-28",
              end_date: "2025-03-02",
            },
          ]);
        }
        if (url.endsWith("/statuses")) {
          return jsonResponse({
            "2025mifer": {
              qual: { num_teams: 40, ranking: { rank: 9, record: { wins: 8, losses: 4, ties: 0 } } },
              playoff: { level: "f", status: "eliminated", record: { wins: 2, losses: 2, ties: 0 } },
            },
          });
        }
        if (url.endsWith("/awards/2025")) {
          return jsonResponse([{ award_type: 9, event_key: "2025mifer", name: "Excellence in Engineering Award" }]);
        }
        if (url.endsWith("/districts")) return jsonResponse([{ key: "2025fim", year: 2025 }]);
        if (url.endsWith("/district/2025fim/rankings")) {
          return jsonResponse([{ team_key: "frc3414", rank: 70 }, { team_key: "frc254", rank: 1 }]);
        }
        return jsonResponse({}, 404);
      },
    });

    assert.equal(result.tbaError, false);
    assert.equal(result.statboticsError, true);
    assert.equal(result.recap?.events[0]?.finish, "finalist");
    assert.equal(result.recap?.events[0]?.awards[0], "Excellence in Engineering Award");
    assert.equal(result.recap?.districtRank, "70 of 2");
    assert.equal(result.recap?.totalEpa, null);
    assert.ok(requested.some((url) => url.endsWith("/district/2025fim/rankings")));
  });

  it("reports a Blue Alliance failure without a recap", async () => {
    const result = await loadSeasonRecap(2025, {
      apiKey: "test-key",
      fetch: async (input) => {
        const url = String(input);
        if (url.includes("statbotics")) {
          return jsonResponse({ epa: { breakdown: { total_points: 10 } } });
        }
        return jsonResponse({}, 401);
      },
    });
    assert.equal(result.tbaError, true);
    assert.equal(result.statboticsError, false);
    assert.equal(result.recap, null);
  });
});
