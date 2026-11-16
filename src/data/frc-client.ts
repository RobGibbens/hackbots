import { team } from "./site.ts";
import { buildSeasonRecap, type SeasonRecap } from "./season-recap.ts";

const TBA_ORIGIN = "https://www.thebluealliance.com/api/v3";
const STATBOTICS_ORIGIN = "https://api.statbotics.io/v3";
/** Whole remote load, including the follow-up district rankings request. */
const DEFAULT_LOAD_TIMEOUT_MS = 60_000;

export type SeasonLoad = {
  recap: SeasonRecap | null;
  tbaError: boolean;
  statboticsError: boolean;
};

type LoadOptions = {
  fetch?: typeof fetch;
  apiKey?: string;
  teamNumber?: number;
  timeoutMs?: number;
};

export async function loadSeasonRecap(year: number, options: LoadOptions = {}): Promise<SeasonLoad> {
  const fetchImpl = options.fetch ?? fetch;
  const teamNumber = options.teamNumber ?? team.number;
  const apiKey = options.apiKey?.trim() ?? "";
  if (!apiKey) return { recap: null, tbaError: true, statboticsError: false };

  const timeoutMs = options.timeoutMs ?? DEFAULT_LOAD_TIMEOUT_MS;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const teamKey = `frc${teamNumber}`;
  const headers = { Accept: "application/json", "X-TBA-Auth-Key": apiKey };

  async function getJson(url: string, init?: RequestInit): Promise<unknown> {
    const response = await fetchImpl(url, { ...init, signal: controller.signal });
    if (!response.ok) throw new Error(String(response.status));
    return response.json();
  }

  const tbaUrls = [
    `${TBA_ORIGIN}/team/${teamKey}/events/${year}`,
    `${TBA_ORIGIN}/team/${teamKey}/events/${year}/statuses`,
    `${TBA_ORIGIN}/team/${teamKey}/awards/${year}`,
    `${TBA_ORIGIN}/team/${teamKey}/districts`,
  ];

  try {
    const [tbaResult, statboticsResult] = await Promise.all([
      Promise.all(tbaUrls.map((url) => getJson(url, { headers })))
        .then((values) => ({ ok: true as const, values }))
        .catch(() => ({ ok: false as const, values: [] as unknown[] })),
      getJson(`${STATBOTICS_ORIGIN}/team_year/${teamNumber}/${year}`)
        .then((value) => ({ ok: true as const, value }))
        .catch(() => ({ ok: false as const, value: null })),
    ]);

    if (!tbaResult.ok) {
      return { recap: null, tbaError: true, statboticsError: !statboticsResult.ok };
    }

    const [events, statuses, awards, districts] = tbaResult.values;
    let rankings: unknown = null;
    const district = Array.isArray(districts)
      ? districts.find((item) => {
          if (!item || typeof item !== "object") return false;
          const record = item as { year?: unknown; key?: unknown };
          return record.year === year && typeof record.key === "string";
        })
      : undefined;
    if (district && typeof district === "object" && "key" in district && typeof district.key === "string") {
      try {
        rankings = await getJson(`${TBA_ORIGIN}/district/${district.key}/rankings`, { headers });
      } catch {
        rankings = null;
      }
    }

    return {
      recap: buildSeasonRecap({
        year,
        teamNumber,
        events,
        statuses,
        awards,
        districts,
        rankings,
        statbotics: statboticsResult.value,
      }),
      tbaError: false,
      statboticsError: !statboticsResult.ok,
    };
  } finally {
    clearTimeout(timer);
  }
}
