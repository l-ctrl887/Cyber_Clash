# CYBER CLASH audio upgrade

## Files modified
- `js/audio.js` rewritten: local MP3 engine (effects + looping music), same API as before.
- `js/main.js` small additions (see below).
- `index.html` sound button now reads "🔊 ON" by default.
- `css/style.css` three appended lines: wider sound button, red when OFF.
- `qr_surprise.html` typing + alert sounds, small sound button (audio starts after the first tap).
- Everything else is unchanged.

## main.js changes (all audio-only)
- start: stop any old audio, startup sound, background music
- correct answer: success sound, then stage-complete (not on stage 4)
- each stage load: security alert (delayed so it does not overlap the startup sound)
- Inspect buttons: scanning sound
- time up: stop music, game-over (the results screen no longer replays it)
- all stages done: stop music, victory
- Play Again: stop all audio
- sound button: Sound.toggle()

## Sounds (assets/sounds/, all present, all original, synthesized)
startup, keyboard, alert, scan, correct, wrong, stage-complete, warning, critical, game-over, victory, background (45.7 s loop, plays at 18% volume).
Nothing is missing. They are synthesized, not recorded. To swap one, replace the file with the same name.
Free sources if you want recorded versions: pixabay.com/sound-effects, freesound.org (check each license), mixkit.co.
Search terms: "computer startup", "mechanical keyboard typing", "security alert beep", "scanner sweep", "success chime", "error buzz", "level complete", "warning beep", "critical alarm", "power down", "victory fanfare", "dark ambient cyberpunk loop".

## Testing checklist
- [ ] Sound ON/OFF: button label changes, music stops/resumes, setting survives a reload
- [ ] No audio before the first tap or click
- [ ] Background music starts once, loops, no overlapping copies, subtle
- [ ] Correct and wrong answers in both modes
- [ ] Inspect plays scan in Normal; Expert has no Inspect
- [ ] 30 s warning and 10 s critical play once each
- [ ] Time up: music stops, game-over once
- [ ] Victory: music stops, victory once
- [ ] Play Again stops everything
- [ ] Phone: iPhone Safari and Android Chrome (including screen lock and switching tabs)
- [ ] QR page: tap once to enable sound, typing plays, alert on "SYSTEM COMPROMISED"
