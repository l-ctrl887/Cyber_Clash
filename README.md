# CYBER CLASH
**4 Threats. 5 Minutes. Can You Win?**

Official exhibition project title: *Cybersecurity Awareness Challenge: An Interactive Account Security Simulation*

A timed cybersecurity awareness game in plain HTML, CSS and JavaScript. No build step, no backend, no external requests. Everything in it is fictional and no personal data is collected.

## Stages (in order)
1. The Phishing Trap: email, fake login page, inspect the address
2. The Weak Password
3. The Suspicious App: permissions and Least Privilege
4. The Fake Call (final challenge): a three-round social-engineering conversation about an OTP

## Features
Two modes (Normal 5:00 with Inspect and hints; Expert 5:00 with hints but no Inspect and four different topics (ransomware, public Wi-Fi, data breach, incident response). Hints cost 10 points in both modes), evidence inspection in every stage, live ACCOUNT SECURITY progress, five ranks, sound effects with a mute toggle, a downloadable PNG result card, and a **local-only** top-10 leaderboard (browser localStorage; not shared, not university-wide).

## Run locally
Open `index.html` in a modern browser, or run `python3 -m http.server 8000` in this folder and visit http://localhost:8000

## Deploy publicly (free)
Upload the folder to GitHub Pages, Netlify Drop (app.netlify.com/drop) or Cloudflare Pages. No accounts needed for players.

## Files
- `index.html` screens
- `css/style.css` theme
- `js/timer.js` deadline-based 5:00 countdown
- `js/scoring.js` 100 per stage, −15 per wrong attempt, −10 per hint, 10 minimum
- `js/stages.js` Normal-mode challenges
- `js/expert.js` Expert-mode challenges
- `js/main.js` game flow
- `js/audio.js` sound effects (Web Audio, no files)
- `js/leaderboard.js` localStorage leaderboard
- `js/card.js` result-card image (canvas)
