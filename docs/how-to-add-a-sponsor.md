# How to add a Sponsor

A **Sponsor** is a company that gives the team money or materials. The Sponsors page lists each Sponsor with a logo, a name, a short description, and a link to the company's site.

A gift from a person or family is a **Donation**. That stays on the Donate page. Do not add a person as a Sponsor.

You add a Sponsor by creating one text file and uploading a logo, then sending both to the team through GitHub. You do not change the page design, and you do not publish the site yourself. Merging your change into `main` publishes it.

The live Sponsors page is [https://robgibbens.github.io/hackbots/sponsors](https://robgibbens.github.io/hackbots/sponsors).

## Before you start

You need a GitHub account and permission to edit [github.com/RobGibbens/hackbots](https://github.com/RobGibbens/hackbots). If GitHub says you cannot create a branch, ask a mentor to add you as a collaborator.

You also need the company's logo as a `.png`, `.jpg`, or `.webp` file, and the address of the company's website.

A few words you will see:

- A **branch** is your own copy of the site files, so your Sponsor does not change the live site until the team accepts it.
- A **commit** is a saved snapshot of that change, with a short message about what you did.
- A **pull request** is the note you send asking the team to review your branch and add it to the live site.
- **Deploy** means GitHub builds the site and updates [robgibbens.github.io/hackbots](https://robgibbens.github.io/hackbots). That happens after your pull request is merged into the `main` branch.

## 1. Write the Sponsor file

On GitHub, open the repo. Click **Add file**, then **Create new file**.

Name the file with the folder, lowercase words, and hyphens, and end it with `.md`:

`src/content/sponsors/example-company.md`

If that folder is not there yet, this name creates it.

Paste this, then replace the example with the real Sponsor:

```markdown
---
name: Example Company
tier: Gold
summary: "Example Company machines brackets for the Robot."
url: https://example.com
season: 2027
logo: ./example-company.png
logoAlt: Example Company logo
---
```

The file must start with `---`. Do not copy the lines of three backticks that surround the example in this guide. If those lines are in the Sponsor file, the site will not start.

This example is only a pattern. Replace every line with a real Sponsor before you commit. Do not add Example Company to the site.

| Line | What to type |
| --- | --- |
| `name` | The company name people should see. |
| `tier` | Exactly one of `Platinum`, `Gold`, `Silver`, `Bronze`, or `Friend`. |
| `summary` | One or two plain sentences about the company. Keep the quotes if the sentence contains a colon. |
| `url` | The company's website, starting with `https://`. |
| `season` | The year of the current Season, with no quotes. Right now that is `2027`. |
| `logo` | The logo file next to this file, with `./` in front. Example: `./example-company.png`. |
| `logoAlt` | A short description of the logo, such as `Example Company logo`. |

Leave the `---` lines in place. Do not add spaces before `name`, `tier`, `summary`, `url`, `season`, `logo`, or `logoAlt`.

The card uses `summary` only. Text under the second `---` is not shown. Leave that area empty.

Upload the logo into `src/content/sponsors`, next to the markdown file. On GitHub, use **Add file**, then **Upload files**. The file name must match `logo`, or the site will not build. Use the company's logo, not a photo of a building.

The Sponsors page lists a Sponsor only when `season` is the current Season. A Sponsor from another year stays in the repo and does not appear until that year is current. Sponsors do not get their own page. The logo and the name link to `url`.

## 2. Save the file on a new branch

On the same page, look for **Commit changes**.

1. In the message box, write what you added. Example: `Add Example Company as a Gold sponsor.` Use the real company name, not Example Company.
2. Choose **Create a new branch**.
3. Name the branch the same way as the file, such as `add-example-company`.
4. Click **Propose changes**.

That click does two things: it makes the commit, and it starts the pull request.

If the logo is a second commit, commit it on the same branch. Both files need to be in the pull request.

## 3. Open the pull request

GitHub shows a page titled **Open a pull request**.

1. Check that the base branch is `main` and the compare branch is your new branch.
2. In the description, say the company name, the tier, and the season year.
3. Click **Create pull request**.

Wait for a mentor to review it. If they ask for a change, edit the same file on your branch and commit again. The pull request updates on its own.

## 4. Merge, then wait for the deploy

When the review is done, a mentor clicks **Merge pull request** on GitHub. That puts your file on `main`.

GitHub then runs **Deploy to GitHub Pages**. You can watch it under the **Actions** tab in the repo. A green check means the new site is published. The first time, give it a couple of minutes.

Open [https://robgibbens.github.io/hackbots/sponsors](https://robgibbens.github.io/hackbots/sponsors) and refresh.

The company should appear under its tier, with its logo, name, description, and a link to its site.

## If the Sponsor is missing

- `season` is not the current Season. Right now the page shows `2027` only.
- `tier` is not exactly `Platinum`, `Gold`, `Silver`, `Bronze`, or `Friend`.
- The file is in the wrong folder. It must be `src/content/sponsors`.
- A `---` line is missing, `url` does not start with `https://`, or `season` has quotes around it.
- `logo` does not match the uploaded file name, or `logoAlt` is missing.
- The file includes the lines of three backticks from this guide. Delete them so the first line is `---`. A file like that stops `npm run dev` and the deploy with a schema error.
- The pull request is still open. The live site changes only after it is merged into `main`.
- The Actions run has a red X. Open that run and ask a mentor for help. Do not try to fix the site by editing files outside `src/content/sponsors`.

## Same steps with git on your computer

Use this only if a mentor has already helped you install Git and clone the repo. The GitHub steps above are the normal way.

From the repo folder:

```bash
git checkout main
git pull
git checkout -b add-example-company
```

Create `src/content/sponsors/example-company.md` with the text from step 1, and put the logo beside it. Replace the example with the real Sponsor. Then:

```bash
git add src/content/sponsors/example-company.md src/content/sponsors/example-company.png
git commit -m "Add Example Company as a Gold sponsor."
git push -u origin add-example-company
```

On GitHub, open a pull request from `add-example-company` into `main`. Merging that pull request deploys the site, the same way as in step 4.

To preview before you push, a mentor can run `npm run dev` and open `http://localhost:4321/hackbots/sponsors`.
