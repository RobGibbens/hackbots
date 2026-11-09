import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  currentSeason,
  donation,
  groups,
  joinFormUrl,
  memberEligibility,
  nav,
  routes,
  shirtOffer,
  shirtOfferIsOpen,
  social,
  sponsorTiers,
  team,
  withBase,
} from "./site.ts";

describe("shirt offer", () => {
  it("is open on the evening of December 1, 2026 in Detroit", () => {
    const evening = new Date("2026-12-02T04:30:00Z");
    assert.equal(shirtOfferIsOpen(evening), true);
  });

  it("is closed on the morning of December 2, 2026 in Detroit", () => {
    const morning = new Date("2026-12-02T05:30:00Z");
    assert.equal(shirtOfferIsOpen(morning), false);
  });

  it("costs 250 dollars per name and names the 2027 deadline", () => {
    assert.equal(shirtOffer.amountUsd, 250);
    assert.equal(shirtOffer.deadline, "2026-12-01");
    assert.equal(shirtOffer.deadlineLabel, "December 1, 2026");
    assert.equal(currentSeason.year, 2027);
    assert.equal(currentSeason.hasShirtOffer, true);
  });
});

describe("public site facts", () => {
  it("lists the agreed nav in order", () => {
    assert.deepEqual(
      nav.map((item) => item.label),
      [
        "Home",
        "About",
        "Our Robot",
        "Seasons",
        "News",
        "Events",
        "Sponsors",
        "Outreach",
        "Contact",
      ],
    );
    assert.deepEqual(
      nav.map((item) => item.href),
      [
        routes.home,
        routes.about,
        routes.ourRobot,
        routes.seasons,
        routes.news,
        routes.events,
        routes.sponsors,
        routes.outreach,
        routes.contact,
      ],
    );
    assert.equal(routes.currentSeason, "/seasons/2027");
  });

  it("sends join and donations to the agreed places", () => {
    assert.equal(joinFormUrl, "https://forms.gle/r57zxPEY1oQATjX46");
    assert.equal(donation.url, "https://fpsalum.nationbuilder.com/donate");
    assert.equal(donation.memo, "3414 Hackbots");
    assert.equal(
      donation.payableTo,
      "Farmington/Farmington Hills Education Foundation",
    );
    assert.equal(donation.mailAddress, "33000 Freedom Road, Farmington, MI 48336");
  });

  it("keeps contact, social links, groups, and sponsor tiers", () => {
    assert.equal(team.email, "team3414hackbots@gmail.com");
    assert.equal(team.shopAddress, "32000 Shiawassee St., Farmington, MI 48336");
    assert.equal(social.instagram, "https://www.instagram.com/hackbots3414/");
    assert.equal(social.facebook, "https://www.facebook.com/Hackbots3414/");
    assert.deepEqual(groups, [
      "Computer Aided Design",
      "Mechanical",
      "Programming",
      "Business",
      "Graphics",
      "Electrical",
    ]);
    assert.deepEqual(sponsorTiers, [
      "Platinum",
      "Gold",
      "Silver",
      "Bronze",
      "Friend",
    ]);
  });

  it("states who can be a member", () => {
    assert.match(memberEligibility, /grades 9–12/);
    assert.match(memberEligibility, /Farmington High School/);
    assert.match(memberEligibility, /North Farmington High School/);
    assert.match(memberEligibility, /Farmington Central High School/);
    assert.match(memberEligibility, /home-schooled/);
    assert.match(memberEligibility, /Farmington or Farmington Hills/);
    assert.match(memberEligibility, /do not cut/);
  });

  it("names the 2027 game without claiming the rules are public", () => {
    assert.equal(currentSeason.gameName, "BIOCORE");
    assert.equal(currentSeason.gamePresentedBy, "Haas");
    assert.equal(currentSeason.kickoffLabel, "January 9, 2027");
    assert.equal(currentSeason.robotBuilt, false);
  });
});

describe("withBase", () => {
  it("prefixes site paths with the GitHub Pages base", () => {
    assert.equal(withBase("/hackbots/", "/about"), "/hackbots/about");
    assert.equal(withBase("/hackbots/", "/"), "/hackbots/");
    assert.equal(withBase("/", "/about"), "/about");
  });
});
