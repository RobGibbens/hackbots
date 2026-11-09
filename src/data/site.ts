export const team = {
  name: "Hackbots",
  number: 3414,
  email: "team3414hackbots@gmail.com",
  shopAddress: "32000 Shiawassee St., Farmington, MI 48336",
};

export const memberEligibility =
  "A student in grades 9–12 from Farmington High School, North Farmington High School, or Farmington Central High School can join, as can a home-schooled student in Farmington or Farmington Hills. We do not cut a roster.";

export const groups = [
  "Computer Aided Design",
  "Mechanical",
  "Programming",
  "Business",
  "Graphics",
  "Electrical",
] as const;

export const sponsorTiers = ["Platinum", "Gold", "Silver", "Bronze", "Friend"] as const;

export const joinFormUrl = "https://forms.gle/r57zxPEY1oQATjX46";

export const donation = {
  url: "https://fpsalum.nationbuilder.com/donate",
  memo: "3414 Hackbots",
  payableTo: "Farmington/Farmington Hills Education Foundation",
  mailAddress: "33000 Freedom Road, Farmington, MI 48336",
};

export const social = {
  instagram: "https://www.instagram.com/hackbots3414/",
  facebook: "https://www.facebook.com/Hackbots3414/",
};

export const shirtOffer = {
  amountUsd: 250,
  deadline: "2026-12-01",
  deadlineLabel: "December 1, 2026",
};

export const currentSeason = {
  year: 2027,
  gameName: "BIOCORE",
  gamePresentedBy: "Haas",
  kickoffLabel: "January 9, 2027",
  robotBuilt: false,
  hasShirtOffer: true,
};

export const routes = {
  home: "/",
  about: "/about",
  ourRobot: "/our-robot",
  seasons: "/seasons",
  currentSeason: "/seasons/2027",
  news: "/news",
  events: "/events",
  sponsors: "/sponsors",
  outreach: "/outreach",
  contact: "/contact",
} as const;

export const nav = [
  { href: routes.home, label: "Home" },
  { href: routes.about, label: "About" },
  { href: routes.ourRobot, label: "Our Robot" },
  { href: routes.seasons, label: "Seasons" },
  { href: routes.news, label: "News" },
  { href: routes.events, label: "Events" },
  { href: routes.sponsors, label: "Sponsors" },
  { href: routes.outreach, label: "Outreach" },
  { href: routes.contact, label: "Contact" },
] as const;

const shirtDeadlineTimeZone = "America/Detroit";

export function shirtOfferIsOpen(
  today: Date,
  timeZone = shirtDeadlineTimeZone,
): boolean {
  if (!currentSeason.hasShirtOffer) return false;
  const day = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(today);
  return day <= shirtOffer.deadline;
}

export function withBase(base: string, path: string): string {
  const prefix = base.endsWith("/") ? base.slice(0, -1) : base;
  if (path === "/") return prefix === "" ? "/" : `${prefix}/`;
  return `${prefix}${path}`;
}
