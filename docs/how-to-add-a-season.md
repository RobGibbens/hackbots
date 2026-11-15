# How to add a Season

A **Season** is one FRC competition year. The Seasons page lists every Season that has a file in the repo.

You add a Season to that list by creating one text file and one photo, then sending them to the team through GitHub. You do not change the page design, and you do not publish the site yourself. Merging your change into `main` publishes it.

The live Seasons page is [https://robgibbens.github.io/hackbots/seasons](https://robgibbens.github.io/hackbots/seasons).

The file you add puts a card on that list and creates that Season's page. A card for `2026.md` links to [https://robgibbens.github.io/hackbots/seasons/2026](https://robgibbens.github.io/hackbots/seasons/2026). The lines between the `---` marks are the card and the page. You do not add a separate page file. Text after the second `---` is not shown.

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
image: ./2026.jpg
imageAlt: The 2026 Robot
robot: Robot Name
record: 1x winner, 2x finalist
results:
  - name: District Event
    place: Winner
  - name: State Championship
    place: Finalist
links:
  - label: CAD
    href: "#"
  - label: Report
    href: "#"
  - label: The Blue Alliance
    href: https://www.thebluealliance.com/team/3414
---
```

Copy the frontmatter, including both `---` lines. The file must start with `---`. Do not copy the lines of three backticks that surround the example in this guide. If those lines are in the Season file, the site will not start. Do not write the Season under the second `---`. That text is not shown.

Every field between the `---` marks is required.

| Line | What to type |
| --- | --- |
| `title` | The heading on the card and on the Season page, such as `2026 Season`. |
| `subtitle` | The short line on the card, such as `Earlier Season`. |
| `game` | The Game name under the year on the Season page, such as `BioCore`. |
| `description` | One or two sentences on the card. Keep it on one line. |
| `image` | The photo on the card and at the top of the Season page. A path like `./2026.jpg`. |
| `imageAlt` | A short description of that photo. |
| `robot` | The Robot's name. It is the title of the Season page. |
| `record` | The line under the Robot name, such as `1x winner, 2x finalist`. |
| `results` | Each award or event. `name` is the award or event. `place` is the finish, such as `Winner` or `Finalist`. |
| `links` | The buttons at the bottom of the Season page. `label` is the words on the button. `href` is the address. CAD, Report, and The Blue Alliance are the usual three. |

Leave the `---` lines in place. Do not add spaces before `title`, `subtitle`, `game`, `description`, `image`, `imageAlt`, `robot`, `record`, `results`, or `links`.

Each result and each link starts with a dash, indented two spaces. `name`, `place`, `label`, and `href` are indented four spaces. Keep that spacing, or the site will not start. Put quotes around `#` when an address is not ready yet, as in `href: "#"`. A real address does not need quotes.

A file with nothing after the frontmatter still gets a card and a page. The page shows the Game under the year, then the Robot name, the record, the results, and the links.

Put the photo in `src/content/seasons`, next to the markdown file. On GitHub, use **Add file**, then **Upload files**. Set `image` to that file, with `./` in front. The image name must match the file, or the site will not build.

Do not edit `src/content.config.ts`. That file is the list's setup, not a Season.

## 2. Save the file on a new branch

On the same page, look for **Commit changes**.

1. In the message box, write what you added. Example: `Add the 2026 Season to the list.`
2. Choose **Create a new branch**.
3. Name the branch the same way as the file, such as `add-2026-season`.
4. Click **Propose changes**.

That click does two things: it makes the commit, and it starts the pull request.

If the photo is a second commit, add it on the same branch before you ask for review.

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

Your Season should appear with its photo, title, subtitle, and description. Newer years are listed first. Click the card to open `/seasons/` plus the file name. That page shows the Game name under the year, then the Robot name, the record, the results, and the links.

## If the Season is missing

- The file is in the wrong folder. It must be `src/content/seasons`.
- The file name is not a four-digit year, such as `2026.md`.
- A `---` line is missing, or one of `title`, `subtitle`, `game`, `description`, `image`, `imageAlt`, `robot`, `record`, `results`, or `links` is missing.
- A result is missing `name` or `place`, or a link is missing `label` or `href`. The dash lines need two spaces of indent, and the lines under them need four.
- `image` does not match a photo in that folder. `image: ./2026.jpg` needs a file named `2026.jpg` next to the markdown file.
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

Create `src/content/seasons/2026.md` with the text from step 1, and add `src/content/seasons/2026.jpg` beside it. Then:

```bash
git add src/content/seasons/2026.md src/content/seasons/2026.jpg
git commit -m "Add the 2026 Season to the list."
git push -u origin add-2026-season
```

On GitHub, open a pull request from `add-2026-season` into `main`. Merging that pull request deploys the site, the same way as in step 4.

To preview before you push, a mentor can run `npm run dev` and open `http://localhost:4321/hackbots/seasons`.
