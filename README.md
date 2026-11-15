# Dung Tran · Personal Portfolio

A responsive, beginner-friendly portfolio site made using **HTML, CSS, and vanilla JavaScript**. No paid hosting, backend, dependencies, or build step required.

## What is included?

- `index.html`: English content and project descriptions, with `data-i18n` identifiers for translation.
- `translations.js`: German text for each `data-i18n` identifier. Edit translations here.
- `styles.css`: Visual design, colors, responsive layouts, dark/light mode.
- `app.js`: English/German switching, interactive filters, mobile menu, theme toggle, and optional email/LinkedIn links.
- `assets/favicon.svg`: Small browser-tab icon.

## English / German language switch

Use the **EN / DE** buttons in the site header. English is the initial default. A visitor's choice is saved locally in the browser and restored on future visits. No translation service, backend, cookies, or API key is needed.

To update the wording:

1. Edit the English text directly in `index.html`.
2. Edit the matching German entry in `translations.js`. Each translatable element has a `data-i18n` key such as `hero.heading`.
3. Test by opening `index.html` and clicking **DE**, then **EN**. Check on mobile as well.
4. Commit and push **all** updated files: `index.html`, `translations.js`, `app.js` and `styles.css`.

If you add a new visible text element, add a unique `data-i18n="your.key"` attribute in `index.html` and a matching translation in `translations.js`. Some decorative Python code and standard technical keywords intentionally stay in English in both versions.

## Preview on your computer

Open `index.html` in Chrome, or in VS Code use the *Live Server* extension.

## Publish for FREE with GitHub Pages

1. On GitHub, create a **public** repository named `YOUR_USERNAME.github.io` (replace `YOUR_USERNAME` with your GitHub username), or another name such as `my-portfolio`.
2. Add the **contents of this folder** to the repository. Important: keep `index.html` at the repository root, not nested within an extra folder.
3. Navigate to **Settings → Pages → Build and deployment**.
4. Set **Source: Deploy from a branch**. Choose **main** and **/(root)**, then click **Save**.
5. Your site will be available at `https://YOUR_USERNAME.github.io/` if the repository was named `YOUR_USERNAME.github.io`; otherwise at `https://YOUR_USERNAME.github.io/my-portfolio/` if the repository was named `my-portfolio`.
6. New commits pushed to `main` will publish updates automatically, typically within minutes (GitHub says it may take up to 10 minutes).

For Git usage in a new local folder:

```bash
git init
git add .
git commit -m "Launch personal portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
git push -u origin main
```

**If you created the repository with a README on GitHub**, the histories may differ. Easiest route: create an *empty* repository without initialization before running these commands, or upload files through the GitHub web interface.

## Things to customize BEFORE publishing

- [ ] Verify the name and availability statement in `index.html`.
- [ ] Verify research metrics and dates, descriptions, employer, education and titles. This draft is based on past discussions and should be reviewed before publishing.
- [ ] Replace or remove any project you do not wish to make public.
- [ ] Add URLs to your projects only once their GitHub repositories are ready.
- [ ] Verify the GitHub profile URL (`https://github.com/TranNTD`) matches your account.
- [ ] Enter your own `email` and `linkedin` URLs in the top `CONTACT` object of `app.js` if you'd like buttons for those.
- [ ] Optional: use your own photo, resume PDF, or custom domain. Don't publish private data or secrets.

## Suggested next improvements

- Add a separate case study page for each project.
- Add a downloadable, up-to-date public CV.
- Add an automated GitHub Actions check for broken links / accessibility as a CI project.
- Add a third language, such as Vietnamese, using the same translation system.
- Add a small Python/ML project demo hosted on a separate service (GitHub Pages itself only serves static content).

## Official documentation

- https://docs.github.com/en/pages/quickstart
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
