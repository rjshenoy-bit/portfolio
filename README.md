# Portfolio site

A dark, editorial, "browse the work" portfolio — inspired by the row-based
browsing pattern of streaming interfaces, rebuilt for finance work: models,
valuations, and case studies instead of shows.

Plain HTML/CSS/JS. No build step, no framework, no dependencies. Everything
you'll want to personalize lives in one file.

## 1. Preview it locally

You don't strictly need a server — you can just double-click `index.html`.
But fonts and the smoothest experience come from serving it properly:

```bash
# from inside this folder
python3 -m http.server 8000
# then open http://localhost:8000
```

Or, in VS Code, use the "Live Server" extension and click "Go Live."

## 2. Add your own content

Open **`js/data.js`**. Every piece of text and every link on the site comes
from this one file — your name, tagline, projects, case studies, skills,
experience, education, certifications, and contact links. Everything marked
`REPLACE ME` is a placeholder.

You do **not** need to touch `index.html`, `css/styles.css`, or `js/main.js`
to update your content.

### Linking your actual models (DCF, LBO, etc.)

Each entry in `projects` and `writeups` has a `link` field. A few good
options:

- **Google Sheets / Drive**: open the file → Share → "Anyone with the link"
  → Viewer → paste that URL in as `link`.
- **GitHub**: push the file to a repo and link either the repo itself or,
  for a direct file, the "raw" URL.
- **A PDF export**: drop the PDF in the `assets/` folder and set
  `link: "assets/my-model.pdf"`.

### Adding your photo

There's a small circular photo above the "Let's talk numbers" heading, near
the contact section. It ships with a placeholder silhouette and a visible
"Placeholder — swap for your photo" tag so it's obvious it's a stand-in.

To replace it:

1. Drop your photo into `assets/images/` (a roughly square crop works best
   for the circular frame — e.g. `assets/images/portrait.jpg`).
2. In `js/data.js`, update `portraitUrl` to point at it and set
   `portraitIsPlaceholder` to `false` (this removes the placeholder tag).

The page also has a faint grid texture running behind the sections
(`assets/images/texture-grid.svg`) — that one's generated, not a photo, and
you don't need to touch it unless you want to restyle the background.

### Adding your résumé

Drop `resume.pdf` into the `assets/` folder. It's already wired up to the
"Download résumé" button and the contact section. If you name the file
something else, update `resumeUrl` in `js/data.js` to match.

### Colors, icons, categories

- Each card has an `accent` (`"blue"`, `"green"`, or `"gold"`) — this drives
  both the tag color and the thumbnail color. Use it meaningfully (e.g. gold
  for your best/featured piece, green for anything with a strong upside
  number, blue as your default).
- Each card has an `icon` (`"bar"`, `"line"`, `"pie"`, `"coins"`,
  `"building"`, `"calculator"`, `"doc"`, `"growth"`) — pick whichever best
  matches the piece.
- Set `featured: true` on at most one or two items — it adds a small "Featured"
  ribbon. Don't overuse it.

## 3. Publish it with GitHub Pages

If you already have this folder locally and just need to push it:

```bash
cd finance-portfolio
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

(Replace `YOUR-USERNAME/YOUR-REPO` with a real repo you've created on
GitHub — click **New repository** on github.com, leave it empty, no README,
no license, since you already have these files locally.)

Then turn on Pages:

1. On GitHub, open your repo → **Settings** → **Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Set **Branch** to `main` and folder to `/ (root)`. Save.
4. GitHub gives you a URL after a minute or two, typically:
   `https://YOUR-USERNAME.github.io/YOUR-REPO/`

### Optional: a custom domain

In the same **Settings → Pages** screen, there's a **Custom domain** field.
Add a `CNAME` record at your DNS provider pointing your domain (or a
subdomain like `www`) at `YOUR-USERNAME.github.io`, then enter that domain
in the Pages settings and enable **Enforce HTTPS** once it's verified.

## 4. Making future edits

Any time you want to change content, edit `js/data.js`, then:

```bash
git add .
git commit -m "Update portfolio content"
git push
```

GitHub Pages redeploys automatically within a minute or two of a push to
`main`.

## File structure

```
index.html          Page structure / sections
css/styles.css       All styling and design tokens (colors, type, spacing)
js/data.js           <- Your content lives here. Edit this file.
js/main.js           Rendering + interaction logic (nav, scroll rows, hero animation)
assets/              Your résumé, exported PDFs, favicon
```
