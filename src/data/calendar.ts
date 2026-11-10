const calendarDay = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Detroit",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const longDate = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  month: "long",
  day: "numeric",
  year: "numeric",
});

const shortMonth = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  month: "short",
});

function utcDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

export function calendarDayISO(value: Date | string) {
  const date = value instanceof Date ? value : utcDate(value);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function detroitToday(now = new Date()) {
  return calendarDay.format(now);
}

export function isUpcoming(isoDate: string, today = detroitToday()) {
  return isoDate >= today;
}

export function compareIsoDate(left: string, right: string) {
  return left < right ? -1 : left > right ? 1 : 0;
}

export function formatLongDate(isoDate: string) {
  return longDate.format(utcDate(isoDate));
}

export function eventBadge(isoDate: string) {
  const date = utcDate(isoDate);
  return {
    month: shortMonth.format(date).toUpperCase(),
    day: String(date.getUTCDate()),
  };
}
