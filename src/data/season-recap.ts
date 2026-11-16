const OFFSEASON = 99;
const PRESEASON = 100;
const AWARD_WINNER = 1;
const AWARD_FINALIST = 2;

export type EventFinish = "winner" | "finalist";

export type SeasonEventRecap = {
  key: string;
  name: string;
  place: string;
  dates: string;
  offseason: boolean;
  record: string | null;
  rank: string | null;
  rankingPoints: string | null;
  awards: string[];
  finish: EventFinish | null;
  href: string;
};

export type SeasonRecap = {
  record: string | null;
  worldRank: string | null;
  totalEpa: string | null;
  countryRank: string | null;
  districtRank: string | null;
  auto: string | null;
  teleop: string | null;
  endgame: string | null;
  events: SeasonEventRecap[];
  started: boolean;
};

type RecordParts = {
  wins: number;
  losses: number;
  ties: number;
};

type SortInfo = {
  name?: string;
  precision?: number;
};

type EventStatus = {
  playoff?: {
    level?: string;
    status?: string;
    record?: RecordParts | null;
  } | null;
  qual?: {
    num_teams?: number | null;
    ranking?: {
      rank?: number | null;
      record?: RecordParts | null;
      sort_orders?: Array<number | null> | null;
    } | null;
    sort_order_info?: SortInfo[] | null;
  } | null;
};

type EventAward = {
  award_type?: number;
  event_key?: string;
  name?: string;
};

type ListedEvent = {
  key: string;
  name: string;
  event_type: number;
  city?: string | null;
  state_prov?: string | null;
  country?: string | null;
  start_date: string;
  end_date: string;
};

export type SeasonRecapInput = {
  year: number;
  teamNumber: number;
  events: unknown;
  statuses: unknown;
  awards: unknown;
  districts: unknown;
  rankings: unknown;
  statbotics: unknown;
};

export function buildSeasonRecap(input: SeasonRecapInput): SeasonRecap {
  const teamKey = `frc${input.teamNumber}`;
  const statuses = asRecord(input.statuses) ?? {};
  const awards = asAwards(input.awards);
  const events = asEvents(input.events)
    .filter((event) => event.event_type !== PRESEASON)
    .sort((left, right) => left.start_date.localeCompare(right.start_date) || left.name.localeCompare(right.name));

  let record = emptyRecord();
  let sawOfficialRecord = false;
  for (const event of events) {
    if (event.event_type === OFFSEASON) continue;
    const status = asStatus(statuses[event.key]);
    const next = addRecords(record, status);
    if (next.saw) sawOfficialRecord = true;
    record = next.record;
  }

  const headlines = statboticsHeadlines(input.statbotics);

  return {
    record: sawOfficialRecord ? formatRecord(record) : null,
    worldRank: headlines.worldRank,
    totalEpa: headlines.totalEpa,
    countryRank: headlines.countryRank,
    districtRank: districtRank(input.districts, input.rankings, input.year, teamKey),
    auto: headlines.auto,
    teleop: headlines.teleop,
    endgame: headlines.endgame,
    events: events.map((event) => eventRecap(event, asStatus(statuses[event.key]), awards)),
    started: events.length > 0,
  };
}

function eventRecap(event: ListedEvent, status: EventStatus | null, awards: EventAward[]): SeasonEventRecap {
  const eventAwards = awards.filter((award) => award.event_key === event.key);
  const ranking = status?.qual?.ranking;
  const rank = typeof ranking?.rank === "number" ? ranking.rank : null;
  const field = typeof status?.qual?.num_teams === "number" ? status.qual.num_teams : null;
  const combined = addRecords(emptyRecord(), status);

  return {
    key: event.key,
    name: event.name,
    place: eventPlace(event),
    dates: formatEventDates(event.start_date, event.end_date),
    offseason: event.event_type === OFFSEASON,
    record: combined.saw ? formatRecord(combined.record) : null,
    rank: rank === null ? null : field === null ? String(rank) : `${rank} of ${field}`,
    rankingPoints: rankingPoints(status),
    awards: awardNames(eventAwards),
    finish: finishOf(status, eventAwards),
    href: `https://www.thebluealliance.com/event/${event.key}`,
  };
}

function finishOf(status: EventStatus | null, awards: EventAward[]): EventFinish | null {
  const playoff = status?.playoff;
  if (playoff?.status === "won") return "winner";
  if (playoff?.level === "f" && playoff.status === "eliminated") return "finalist";
  if (awards.some((award) => award.award_type === AWARD_WINNER)) return "winner";
  if (awards.some((award) => award.award_type === AWARD_FINALIST)) return "finalist";
  return null;
}

function awardNames(awards: EventAward[]): string[] {
  const names: string[] = [];
  for (const award of awards) {
    if (award.award_type === AWARD_WINNER || award.award_type === AWARD_FINALIST) continue;
    const name = award.name?.trim();
    if (!name || names.includes(name)) continue;
    names.push(name);
  }
  return names;
}

function rankingPoints(status: EventStatus | null): string | null {
  const info = status?.qual?.sort_order_info ?? [];
  const orders = status?.qual?.ranking?.sort_orders ?? [];
  const index = info.findIndex((item) => item?.name === "Ranking Score");
  if (index < 0) return null;
  const value = orders[index];
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  const precision = info[index]?.precision;
  const digits = typeof precision === "number" && precision >= 0 ? precision : 2;
  return value.toFixed(digits);
}

function addRecords(record: RecordParts, status: EventStatus | null): { record: RecordParts; saw: boolean } {
  let saw = false;
  let next = record;
  for (const part of [status?.qual?.ranking?.record, status?.playoff?.record]) {
    if (!part) continue;
    saw = true;
    next = {
      wins: next.wins + numberOrZero(part.wins),
      losses: next.losses + numberOrZero(part.losses),
      ties: next.ties + numberOrZero(part.ties),
    };
  }
  return { record: next, saw };
}

function districtRank(districts: unknown, rankings: unknown, year: number, teamKey: string): string | null {
  const district = asDistricts(districts).find((item) => item.year === year);
  if (!district) return null;
  const rows = asRankings(rankings);
  const row = rows.find((item) => item.team_key === teamKey);
  if (!row || typeof row.rank !== "number") return null;
  return rows.length > 0 ? `${row.rank} of ${rows.length}` : `#${row.rank}`;
}

function statboticsHeadlines(payload: unknown): Pick<SeasonRecap, "worldRank" | "totalEpa" | "countryRank" | "auto" | "teleop" | "endgame"> {
  return {
    totalEpa: formatEpa(firstNumber(payload, [
      ["epa", "breakdown", "total_points"],
      ["epa", "total_points"],
      ["epa_end"],
      ["total_epa"],
      ["epa"],
    ])),
    auto: formatEpa(firstNumber(payload, [
      ["epa", "breakdown", "auto_points"],
      ["auto_epa"],
      ["epa", "auto_points"],
    ])),
    teleop: formatEpa(firstNumber(payload, [
      ["epa", "breakdown", "teleop_points"],
      ["teleop_epa"],
      ["epa", "teleop_points"],
    ])),
    endgame: formatEpa(firstNumber(payload, [
      ["epa", "breakdown", "endgame_points"],
      ["endgame_epa"],
      ["epa", "endgame_points"],
    ])),
    worldRank: formatRank(firstValue(payload, [
      ["rank", "world"],
      ["ranks", "world"],
      ["epa", "ranks", "total"],
      ["total_epa_rank"],
      ["world_rank"],
    ])),
    countryRank: formatRank(firstValue(payload, [
      ["rank", "country"],
      ["ranks", "country"],
      ["epa", "ranks", "country"],
      ["country_epa_rank"],
      ["country_rank"],
    ])),
  };
}

function formatEpa(value: number | null): string | null {
  if (value === null) return null;
  return value.toFixed(1);
}

function formatRank(value: unknown): string | null {
  if (typeof value === "number" && Number.isFinite(value)) return `#${Math.round(value)}`;
  const record = asRecord(value);
  if (!record) return null;
  const rank = asNumber(record.rank);
  if (rank === null) return null;
  const count = asNumber(record.team_count ?? record.count);
  if (count !== null && count > 0) return `${Math.round(rank)} of ${Math.round(count)}`;
  return `#${Math.round(rank)}`;
}

function formatRecord(record: RecordParts): string {
  return `${record.wins}–${record.losses}–${record.ties}`;
}

function formatEventDates(start: string, end: string): string {
  const startDate = utcDate(start);
  const endDate = utcDate(end);
  const full = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  if (start === end) return full.format(startDate);
  const sameMonth = start.slice(0, 7) === end.slice(0, 7);
  if (sameMonth) {
    const month = new Intl.DateTimeFormat("en-US", { timeZone: "UTC", month: "long" }).format(startDate);
    return `${month} ${startDate.getUTCDate()}–${endDate.getUTCDate()}, ${endDate.getUTCFullYear()}`;
  }
  const monthDay = new Intl.DateTimeFormat("en-US", { timeZone: "UTC", month: "long", day: "numeric" });
  return `${monthDay.format(startDate)} – ${full.format(endDate)}`;
}

function eventPlace(event: ListedEvent): string {
  const city = event.city?.trim();
  const state = event.state_prov?.trim();
  if (city && state) return `${city}, ${state}`;
  return city || state || event.country?.trim() || "";
}

function emptyRecord(): RecordParts {
  return { wins: 0, losses: 0, ties: 0 };
}

function numberOrZero(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function utcDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(year, (month || 1) - 1, day || 1));
}

function asEvents(value: unknown): ListedEvent[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isEvent);
}

function isEvent(value: unknown): value is ListedEvent {
  const record = asRecord(value);
  return Boolean(
    record &&
      typeof record.key === "string" &&
      typeof record.name === "string" &&
      typeof record.event_type === "number" &&
      typeof record.start_date === "string" &&
      typeof record.end_date === "string",
  );
}

function asStatus(value: unknown): EventStatus | null {
  return asRecord(value) as EventStatus | null;
}

function asAwards(value: unknown): EventAward[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item) => asRecord(item)) as EventAward[];
}

function asDistricts(value: unknown): Array<{ key: string; year: number }> {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is { key: string; year: number } => {
    const record = asRecord(item);
    return Boolean(record && typeof record.key === "string" && typeof record.year === "number");
  });
}

function asRankings(value: unknown): Array<{ rank?: number; team_key?: string }> {
  const list = Array.isArray(value) ? value : asRecord(value)?.rankings;
  if (!Array.isArray(list)) return [];
  return list.filter((item) => asRecord(item)) as Array<{ rank?: number; team_key?: string }>;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const record = asRecord(value);
  if (!record) return null;
  return asNumber(record.mean);
}

function firstNumber(root: unknown, paths: string[][]): number | null {
  for (const path of paths) {
    const value = asNumber(readPath(root, path));
    if (value !== null) return value;
  }
  return null;
}

function firstValue(root: unknown, paths: string[][]): unknown {
  for (const path of paths) {
    const value = readPath(root, path);
    if (value !== undefined && value !== null) return value;
  }
  return null;
}

function readPath(root: unknown, path: string[]): unknown {
  let current: unknown = root;
  for (const key of path) {
    const record = asRecord(current);
    if (!record || !(key in record)) return undefined;
    current = record[key];
  }
  return current;
}
