export const team = {
  name: "Hackbots",
  number: 3414,
  email: "team3414hackbots@gmail.com",
  shopAddress: "32000 Shiawassee St., Farmington, MI 48336",
};

export const memberEligibility =
  "All students in grades 9–12 are welcome to join the Hackbots. We do not cut a roster.";

export const groups = [
  "Computer Aided Design",
  "Mechanical",
  "Programming",
  "Business",
  "Graphics",
  "Electrical",
] as const;

export const sponsorTierIds = ["platinum", "gold", "silver", "bronze", "friend"] as const;
export type SponsorTierId = (typeof sponsorTierIds)[number];

export const sponsorTierNames = ["Platinum", "Gold", "Silver", "Bronze", "Friend"] as const;
export type SponsorTierName = (typeof sponsorTierNames)[number];

export type SponsorBenefitCell = true | false | string;

export type SponsorBenefit = {
  label: string;
  href?: string;
  values: Record<SponsorTierId, SponsorBenefitCell>;
};

export const sponsorTiers: readonly {
  id: SponsorTierId;
  name: SponsorTierName;
  amount: string;
}[] = [
  { id: "platinum", name: "Platinum", amount: "$5,000+" },
  { id: "gold", name: "Gold", amount: "$2,000–$4,999" },
  { id: "silver", name: "Silver", amount: "$1,000–$1,999" },
  { id: "bronze", name: "Bronze", amount: "$500–$999" },
  { id: "friend", name: "Friend", amount: "$50–$499" },
];

export const sponsorBenefits: readonly SponsorBenefit[] = [
  {
    label: "Sponsorship board in the pit",
    values: {
      platinum: "Headliner",
      gold: "Headliner",
      silver: "Silver",
      bronze: "Bronze",
      friend: "Friend",
    },
  },
  {
    label: "Hackbots website",
    values: {
      platinum: true,
      gold: true,
      silver: true,
      bronze: true,
      friend: true,
    },
  },
  {
    label: "Press releases",
    values: {
      platinum: true,
      gold: true,
      silver: true,
      bronze: true,
      friend: false,
    },
  },
  {
    label: "Facebook and Instagram",
    values: {
      platinum: true,
      gold: true,
      silver: true,
      bronze: false,
      friend: false,
    },
  },
  {
    label: "Team t-shirts",
    values: {
      platinum: true,
      gold: true,
      silver: true,
      bronze: false,
      friend: false,
    },
  },
  {
    label: "Robot",
    values: {
      platinum: "Large sticker",
      gold: "Large sticker",
      silver: "Name or logo",
      bronze: false,
      friend: false,
    },
  },
  {
    label: "FIRST website",
    href: "https://www.firstinspires.org",
    values: {
      platinum: true,
      gold: true,
      silver: false,
      bronze: false,
      friend: false,
    },
  },
  {
    label: "8 ft × 3 ft arena banner",
    values: {
      platinum: true,
      gold: true,
      silver: false,
      bronze: false,
      friend: false,
    },
  },
  {
    label: "Name announced when the team is introduced",
    values: {
      platinum: true,
      gold: true,
      silver: false,
      bronze: false,
      friend: false,
    },
  },
];

export const joinFormUrl = "https://forms.gle/ErHKkkmXMxSXHR6r6";

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
  seasons: "/seasons",
  currentSeason: "/seasons/2027",
  news: "/news",
  calendar: "/calendar",
  sponsors: "/sponsors",
  donate: "/donate",
  impact: "/impact",
  contact: "/contact",
} as const;

export const nav = [
  { href: routes.home, label: "Home" },
  { href: routes.donate, label: "Donate" },
  { href: routes.news, label: "News" },
  { href: routes.calendar, label: "Calendar" },
  { href: routes.seasons, label: "Seasons" },
  { href: routes.sponsors, label: "Sponsors" },
  { href: routes.impact, label: "Impact" },
  { href: routes.about, label: "About" },
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
