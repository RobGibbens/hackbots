# How to add a Season

A **Season** is one FRC competition year. The Seasons page lists every Season that has a file in the repo.

You add a Season to that list by creating one text file and one game logo, then sending them to the team through GitHub. You do not change the page design, and you do not publish the site yourself. Merging your change into `main` publishes it.

The live Seasons page is [https://robgibbens.github.io/hackbots/seasons](https://robgibbens.github.io/hackbots/seasons).

The file you add puts a card on that list and creates that Season's page. A card for `2026.md` links to [https://robgibbens.github.io/hackbots/seasons/2026](https://robgibbens.github.io/hackbots/seasons/2026). The lines between the `---` marks are the card. You do not add a separate page file. Text after the second `---` is the team's comment on that Season, and it is shown on the Season page. You can leave that part blank.

The Season page loads events, records, and awards on its own. You do not type them into the file.

## Before you start

You need a GitHub account and permission to edit [github.com/RobGibbens/hackbots](https://github.com/RobGibbens/hackbots). If GitHub says you cannot create a branch, ask a mentor to add you as a collaborator.

A few words you will see:

- A **branch** is your own copy of the site files, so your Season does not change the live site until the team accepts it.
- A **commit** is a saved snapshot of that change, with a short message about what you did.
- A **pull request** is the note you send asking the team to review your branch and add it to the live site.
- **Deploy** means GitHub builds the site and updates [robgibbens.github.io/hackbots](https://robgibbens.github.io/hackbots). That happens after your pull request is merged into the `main` branch.

## 1. Write the Season file

On GitHub, open the repo, then open this folder:

`src/content/seasons`

Click **Add file**, then **Create new file**.

Name the file with the four-digit year, and end it with `.md`. Example: `2026.md`. The name is the year people open, and the list sorts by it, newest year first.

Paste this, then replace the example with your Season:

```markdown
---
title: 2026 Season
subtitle: Earlier Season
game: Game Name
description: A short note about that year's Robot and Game.
robot: Robot Name
---

A few sentences about what the team wants people to remember from this Season.
```

Copy the frontmatter, including both `---` lines. The file must start with `---`. Do not copy the lines of three backticks that surround the example in this guide. If those lines are in the Season file, the site will not start.

Write the team's comment after the second `---`. That text is shown on the Season page. A file with nothing after the frontmatter still gets a card and a page. The page then shows the sentence from `description`.

| Line | What to type |
| --- | --- |
| `title` | The heading on the card and on the Season page, such as `2026 Season`. |
| `subtitle` | The short line on the card, such as `Earlier Season`. |
| `game` | The Game name under the year on the Season page, such as `BioCore`. |
| `description` | One or two sentences on the card. Keep it on one line. |
| `robot` | The Robot's name. It is shown under the Game on the Season page. |
| `image` | Optional. Leave this out to use the game logo. Set it only when the card should use a different picture, such as `image: ./2026-robot.jpg`. |
| `imageAlt` | Required when `image` is set. A short description of that picture. |
| `links` | Optional buttons at the bottom of the Season page, such as CAD or Report. The page already links to The Blue Alliance. |

Leave the `---` lines in place. Do not add spaces before `title`, `subtitle`, `game`, `description`, or `robot`.

Each link starts with a dash, indented two spaces. `label` and `href` are indented four spaces. Keep that spacing, or the site will not start. Put quotes around `#` when an address is not ready yet, as in `href: "#"`. A real address does not need quotes.

```markdown
links:
  - label: CAD
    href: "#"
  - label: Report
    href: "#"
```

Put the game logo in `src/content/seasons`, next to the markdown file. Name it with the year, such as `2026.webp`. On GitHub, use **Add file**, then **Upload files**. The list and the top of the Season page use that logo. You do not set `image` unless you want a different picture.

Robot photos are optional. Put them in `src/content/seasons/photos/2026/`. The Season page shows them as a carousel when that folder has photos. A Season with no photos simply has no carousel.

Do not edit `src/content.config.ts`. That file is the list's setup, not a Season.

## 2. Save the file on a new branch

On the same page, look for **Commit changes**.

1. In the message box, write what you added. Example: `Add the 2026 Season to the list.`
2. Choose **Create a new branch**.
3. Name the branch the same way as the file, such as `add-2026-season`.
4. Click **Propose changes**.

That click does two things: it makes the commit, and it starts the pull request.

If the logo is a second commit, add it on the same branch before you ask for review.

## 3. Open the pull request

GitHub shows a page titled **Open a pull request**.

1. Check that the base branch is `main` and the compare branch is your new branch.
2. In the description, say which year you added.
3. Click **Create pull request**.

Wait for a mentor to review it. If they ask for a change, edit the same file on your branch and commit again. The pull request updates on its own.

## 4. Merge, then wait for the deploy

When the review is done, a mentor clicks **Merge pull request** on GitHub. That puts your file on `main`.

GitHub then runs **Deploy to GitHub Pages**. You can watch it under the **Actions** tab in the repo. A green check means the new site is published. The first time, give it a couple of minutes.

Open [https://robgibbens.github.io/hackbots/seasons](https://robgibbens.github.io/hackbots/seasons) and refresh.

Your Season should appear with its game logo, title, subtitle, and description. Newer years are listed first. Click the card to open `/seasons/` plus the file name. That page shows the Game name under the year, then the Robot name, the team's comment, and the events for that Season.

## If the Season is missing

- The file is in the wrong folder. It must be `src/content/seasons`.
- The file name is not a four-digit year, such as `2026.md`.
- A `---` line is missing, or one of `title`, `subtitle`, `game`, `description`, or `robot` is missing.
- `image` is set and `imageAlt` is missing.
- A link is missing `label` or `href`. The dash lines need two spaces of indent, and the lines under them need four.
- The game logo is missing. `2026.md` needs a file named `2026.jpg`, `2026.png`, or `2026.webp` next to it, unless `image` points at a different picture in that folder.
- The description has a line break. Keep `description` on one line.
- The file includes the lines of three backticks from this guide. Delete them so the first line is `---`. A file like that stops `npm run dev` and the deploy with a schema error.
- The pull request is still open. The live site changes only after it is merged into `main`.
- The Actions run has a red X. Open that run and ask a mentor for help. Do not try to fix the site by editing `src/content.config.ts` or files outside `src/content/seasons`.

## Same steps with git on your computer

Use this only if a mentor has already helped you install Git and clone the repo. The GitHub steps above are the normal way.

From the repo folder:

```bash
git checkout main
git pull
git checkout -b add-2026-season
```

Create `src/content/seasons/2026.md` with the text from step 1, and add `src/content/seasons/2026.webp` beside it. Then:

```bash
git add src/content/seasons/2026.md src/content/seasons/2026.webp
git commit -m "Add the 2026 Season to the list."
git push -u origin add-2026-season
```

On GitHub, open a pull request from `add-2026-season` into `main`. Merging that pull request deploys the site, the same way as in step 4.

To preview before you push, a mentor can run `npm run dev` and open `http://localhost:4321/hackbots/seasons`.
