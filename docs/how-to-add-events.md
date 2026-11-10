# How to add an Event

An **Event** is something on the team calendar: a competition or an outreach appearance. It has a date and a place.

A story about something that already happened is **News**, not an Event. For a story, use [How to add News](how-to-add-news.md).

You add an Event by creating one text file and sending it to the team through GitHub. You do not change the page design, and you do not publish the site yourself. Merging your change into `main` publishes it.

The live Events page is [https://robgibbens.github.io/hackbots/events](https://robgibbens.github.io/hackbots/events). The homepage shows the three soonest upcoming Events.

## Before you start

You need a GitHub account and permission to edit [github.com/RobGibbens/hackbots](https://github.com/RobGibbens/hackbots). If GitHub says you cannot create a branch, ask a mentor to add you as a collaborator.

A few words you will see:

- A **branch** is your own copy of the site files, so your Event does not change the live site until the team accepts it.
- A **commit** is a saved snapshot of that change, with a short message about what you did.
- A **pull request** is the note you send asking the team to review your branch and add it to the live site.
- **Deploy** means GitHub builds the site and updates [robgibbens.github.io/hackbots](https://robgibbens.github.io/hackbots). That happens after your pull request is merged into the `main` branch.

## 1. Write the Event file

On GitHub, open the repo, then open this folder:

`src/content/events`

Click **Add file**, then **Create new file**.

Name the file with lowercase words and hyphens, and end it with `.md`. Example: `district-championship.md`.

Paste this, then replace the example with your Event:

```markdown
---
title: District Championship
when: 2027-03-15
where: "Some Venue, MI"
image: ./district-championship.jpg
imageAlt: Robot on the field
---

The team competes at the District Championship.
```

The file must start with `---`. Do not copy the lines of three backticks that surround the example in this guide. If those lines are in the Event file, the site will not start.

The three lines `title`, `when`, and `where` are required. `image` and `imageAlt` are optional. Leave them out when the Event has no header photo.

| Line | What to type |
| --- | --- |
| `title` | The name people should see. |
| `when` | The date as year-month-day, such as `2027-03-15`. |
| `where` | The place. Keep the quotes if the place contains a colon. |
| `image` | Optional. The photo behind the title. A path like `./district-championship.jpg`. |
| `imageAlt` | Required when `image` is set. A short description of that photo. |

Leave the `---` lines in place. Do not add spaces before `title`, `when`, `where`, `image`, or `imageAlt`.

Text after the second `---` is the Event detail. People see it when they click the Event. Write normal sentences. You can add headings, lists, and links the same way you would in any markdown file.

To put a photo behind the title, put the image file in `src/content/events`, next to the markdown file. On GitHub, use **Add file**, then **Upload files**. Set `image` to that file, with `./` in front, and set `imageAlt` to a short description. The image name must match the file, or the site will not build. Leave both lines out if the Event has no header photo.

A photo that belongs in the write-up, under the title, stays in the text as `![Robot on the field](./district-championship-pit.jpg)`. The words in brackets are the description. That photo is not the header. Use a different file than `image` if you want both.

The file name, without `.md`, is the address of the detail page. `district-championship.md` opens at [https://robgibbens.github.io/hackbots/events/district-championship](https://robgibbens.github.io/hackbots/events/district-championship).

The Events page lists an Event only when its date is today or later in Detroit time. An Event dated yesterday stays in the repo and disappears from the lists. Its detail page stays at the same address. The homepage shows only the next three upcoming Events.

## 2. Save the file on a new branch

On the same page, look for **Commit changes**.

1. In the message box, write what you added. Example: `Add the district championship to Events.`
2. Choose **Create a new branch**.
3. Name the branch the same way as the file, such as `add-district-championship`.
4. Click **Propose changes**.

That click does two things: it makes the commit, and it starts the pull request.

## 3. Open the pull request

GitHub shows a page titled **Open a pull request**.

1. Check that the base branch is `main` and the compare branch is your new branch.
2. In the description, say what the Event is, the date, and the place.
3. Click **Create pull request**.

Wait for a mentor to review it. If they ask for a change, edit the same file on your branch and commit again. The pull request updates on its own.

## 4. Merge, then wait for the deploy

When the review is done, a mentor clicks **Merge pull request** on GitHub. That puts your file on `main`.

GitHub then runs **Deploy to GitHub Pages**. You can watch it under the **Actions** tab in the repo. A green check means the new site is published. The first time, give it a couple of minutes.

Open these pages and refresh:

- [https://robgibbens.github.io/hackbots/events](https://robgibbens.github.io/hackbots/events)
- [https://robgibbens.github.io/hackbots/](https://robgibbens.github.io/hackbots/)

Your Event should appear with its date and place. Click it to open the detail page, with the text and images from the file. If the homepage already has three sooner Events, yours appears on the Events page and not yet on the homepage.

## If the Event is missing

- The date is in the past. Change `when` to today or a future date.
- The file is in the wrong folder. It must be `src/content/events`, not `src/content/news`.
- A `---` line is missing, or `when` is not `YYYY-MM-DD`.
- The file includes the lines of three backticks from this guide. Delete them so the first line is `---`. A file like that stops `npm run dev` and the deploy with a schema error.
- The pull request is still open. The live site changes only after it is merged into `main`.
- The Actions run has a red X. Open that run and ask a mentor for help. Do not try to fix the site by editing files outside `src/content/events`.

## Same steps with git on your computer

Use this only if a mentor has already helped you install Git and clone the repo. The GitHub steps above are the normal way.

From the repo folder:

```bash
git checkout main
git pull
git checkout -b add-district-championship
```

Create `src/content/events/district-championship.md` with the text from step 1. Then:

```bash
git add src/content/events/district-championship.md
git commit -m "Add the district championship to Events."
git push -u origin add-district-championship
```

On GitHub, open a pull request from `add-district-championship` into `main`. Merging that pull request deploys the site, the same way as in step 4.

To preview before you push, a mentor can run `npm run dev` and open `http://localhost:4321/hackbots/events`.
