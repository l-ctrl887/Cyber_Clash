# KAU Cyber Escape Room
A 5-minute, four-stage cybersecurity awareness game. Plain HTML, CSS and JavaScript. No build step, no backend, no external requests. Everything in it is fictional.

## Run locally
Open `index.html` in any modern browser (double-click it), or serve the folder:
`python3 -m http.server 8000` then visit http://localhost:8000

## Deploy publicly (free)
Upload the whole folder to GitHub Pages, Netlify Drop (drag the folder onto app.netlify.com/drop), or Cloudflare Pages. Students open the link; no accounts needed.

## Structure
- `index.html` screens and layout
- `css/style.css` theme
- `js/timer.js` deadline-based 5:00 countdown (survives tab switching)
- `js/scoring.js` 100 points per stage, −15 per wrong attempt, −10 per hint, 10 minimum
- `js/stages.js` the four stage challenges and lessons
- `js/main.js` game flow and screens
