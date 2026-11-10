# How to add News

A **News** item is a dated story about the team.

A competition or an outreach appearance, with a date and a place, is an **Event**, not News. For the calendar, use [How to add an Event](how-to-add-events.md).

You add News by creating one text file and sending it to the team through GitHub. You do not change the page design, and you do not publish the site yourself. Merging your change into `main` publishes it.

The live News page is [https://robgibbens.github.io/hackbots/news](https://robgibbens.github.io/hackbots/news). The homepage shows the three newest stories.

## Before you start

You need a GitHub account and permission to edit [github.com/RobGibbens/hackbots](https://github.com/RobGibbens/hackbots). If GitHub says you cannot create a branch, ask a mentor to add you as a collaborator.

A few words you will see:

- A **branch** is your own copy of the site files, so your story does not change the live site until the team accepts it.
- A **commit** is a saved snapshot of that change, with a short message about what you did.
- A **pull request** is the note you send asking the team to review your branch and add it to the live site.
- **Deploy** means GitHub builds the site and updates [robgibbens.github.io/hackbots](https://robgibbens.github.io/hackbots). That happens after your pull request is merged into the `main` branch.

## 1. Write the News file

On GitHub, open the repo, then open this folder:

`src/content/news`

Click **Add file**, then **Create new file**.

Name the file with lowercase words and hyphens, and end it with `.md`. Example: `kickoff-night.md`.

Paste this, then replace the example with your story:

```markdown
---
title: Kickoff night
date: 2027-01-09
summary: The team met for the 2027 Game reveal.
---
```

Copy only those five lines. The file must start with `---`. Do not copy the lines of three backticks that surround the example in this guide. If those lines are in the News file, the site will not start.

The three lines between `---` are required.

| Line | What to type |
| --- | --- |
| `title` | The headline people should see. |
| `date` | The story date as year-month-day, such as `2027-01-09`. |
| `summary` | One or two sentences. This is the text on the card. Keep it on one line. |

Leave the `---` lines in place. Do not add spaces before `title`, `date`, or `summary`.

The News page lists every story, newest date first. The homepage shows only the three newest.

## 2. Save the file on a new branch

On the same page, look for **Commit changes**.

1. In the message box, write what you added. Example: `Add the kickoff night story to News.`
2. Choose **Create a new branch**.
3. Name the branch the same way as the file, such as `add-kickoff-night`.
4. Click **Propose changes**.

That click does two things: it makes the commit, and it starts the pull request.

## 3. Open the pull request

GitHub shows a page titled **Open a pull request**.

1. Check that the base branch is `main` and the compare branch is your new branch.
2. In the description, say what the story is about and the date.
3. Click **Create pull request**.

Wait for a mentor to review it. If they ask for a change, edit the same file on your branch and commit again. The pull request updates on its own.

## 4. Merge, then wait for the deploy

When the review is done, a mentor clicks **Merge pull request** on GitHub. That puts your file on `main`.

GitHub then runs **Deploy to GitHub Pages**. You can watch it under the **Actions** tab in the repo. A green check means the new site is published. The first time, give it a couple of minutes.

Open these pages and refresh:

- [https://robgibbens.github.io/hackbots/news](https://robgibbens.github.io/hackbots/news)
- [https://robgibbens.github.io/hackbots/](https://robgibbens.github.io/hackbots/)

Your story should appear with its date and summary. If three newer stories already exist, yours appears on the News page and not yet on the homepage.

## If the story is missing

- The file is in the wrong folder. It must be `src/content/news`, not `src/content/events`.
- A `---` line is missing, or `date` is not `YYYY-MM-DD`.
- The file includes the lines of three backticks from this guide. Delete them so the first line is `---`. A file like that stops `npm run dev` and the deploy with a schema error.
- The summary has a line break. Keep `summary` on one line.
- The pull request is still open. The live site changes only after it is merged into `main`.
- The Actions run has a red X. Open that run and ask a mentor for help. Do not try to fix the site by editing files outside `src/content/news`.

## Same steps with git on your computer

Use this only if a mentor has already helped you install Git and clone the repo. The GitHub steps above are the normal way.

From the repo folder:

```bash
git checkout main
git pull
git checkout -b add-kickoff-night
```

Create `src/content/news/kickoff-night.md` with the text from step 1. Then:

```bash
git add src/content/news/kickoff-night.md
git commit -m "Add the kickoff night story to News."
git push -u origin add-kickoff-night
```

On GitHub, open a pull request from `add-kickoff-night` into `main`. Merging that pull request deploys the site, the same way as in step 4.

To preview before you push, a mentor can run `npm run dev` and open `http://localhost:4321/hackbots/news`.
