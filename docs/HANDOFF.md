# ICT-1013 — Complete handoff (web portal + Android app)

Last updated: 12 Nov 2026. Give this file to a new Claude chat and say: "Read D:\Fall 2026\ICT\HANDOFF.md first, then continue."

Course: **Applications of Information and Communication Technologies (ICT-1013)**, BS Psychology, 3 credit hours, 16 weeks + Final (Week 17).
Instructor: Muhammad Tahir Mehmood. Course outline source: `D:\Fall 2026\ICT\Applications of Information and Communication technologies.doc`.

---

## 1. Links

| What | Where |
|---|---|
| Live website | https://applications-of-ict.vercel.app |
| GitHub repo (public) | https://github.com/tahir8203/Applications-of-ICT (branch `main`) |
| Android APK (always latest) | https://github.com/tahir8203/Applications-of-ICT/releases/latest/download/ICT-1013.apk |
| Release v1.0.0 | https://github.com/tahir8203/Applications-of-ICT/releases/tag/v1.0.0 |
| Portfolio card | https://tahir-portfolio-teal.vercel.app/#teaching (repo tahir8203/Portfolio, PR #8 merged) |
| Useful deep links | `#/p/1/0` present Session 1 · `#/w/1` Watch mode Session 1 · `#/s/90` Midterm · `#/s/99` Final |

## 2. Folders on this PC

```
D:\Fall 2026\ICT\
  HANDOFF.md                     <- this file
  ICT-1013_v1.0.0.apk            <- copy of the signed APK
  Applications of ...doc         <- official course outline
  ict\                           <- the git repo (website + android app)
    index.html                   shell + window.COURSE metadata (outline, LO1-LO4, books, policies)
    assets\styles.css            design system, presentation, animations, instructor card, print
    assets\app.js                router, study view, presentation engine, Watch mode, assessments, flashcards, glossary
    assets\demos.js              80 animations (flow / choice / custom SVG widgets)
    assets\sessions\part1-4.js   ALL course content as data
    assets\instructor.webp       instructor photo (same as Mobile App Dev course)
    docs\MASTER-PROMPT.md        refined project brief (the improved prompt)
    docs\PROGRESS.md             progress checklist
    android\                     Android app source + build script
    .claude\launch.json          local preview servers (not committed)
C:\Users\Hameed Computers\Documents\ICT-1013-Signing\   <- APK signing key (NOT in git) — BACK THIS UP
```

## 3. Website — how it works

- Static site, **no build step**. Hash router: `#/` home, `#/sessions`, `#/s/<id>` study page, `#/p/<id>/<slide>` presentation, `#/w/<id>` Watch mode, `#/assess`, `#/revision`, `#/flash`, `#/glossary`, `#/outline`, `#/bookmarks`.
- Content is data only. To change a lecture edit `assets/sessions/part*.js`; no UI changes needed. The slide deck is generated automatically: title → intro → objectives → concept slides → mistakes → lab → discussion → summary → quiz → assessment → homework → end.
- Units (32): S1–S16 = Weeks 1–8; Midterm = id **90** (Week 9); S17–S30 = Weeks 10–16; Final = id **99** (Week 17).
  - part1.js: S1–S8 (Assignment 1 in S6, Quiz 1 in S8)
  - part2.js: S9–S16 (Assignment 2 in S12, Quiz 2 in S14)
  - part3.js: Midterm (90) + S17–S24 (Assignment 3 in S20, Quiz 3 in S22)
  - part4.js: S25–S30 (Assignment 4 in S26, Quiz 4 in S28, Project guide S29, Presentations S30) + Final (99)
- Session fields: `id, week, unit, ic, lo, book, title, sub, assess, intro, obj, slides[{k,h,p,ic,pts,cmp,demo,ex,psy,tk,n}], lab{t,steps,out}, disc, mistakes, rev, hw, quiz[{q,o,a,e}], assessment{kind:'quiz'|'assignment'|'exam'|'project', title, covers, instructions, scenario, tasks, submission, reflection, example, mcq, tf[{q,a,e}], short[{q,a}], app[{q,a}], note}, terms`. Exam units have `exam:true, label, short`.
- Animations: `ICTDemos.mount(el,id)` with Play/Pause/Step/Reset; a slide uses one via `demo:'<id>'`.
- Watch mode (W key): auto-advances slides, auto-plays demos, auto-reveals quiz answers.
- Presentation keys: → / Space next, ← back, Home/End, number+Enter jump, W watch, F fullscreen, N notes, O overview, S/P/R step/play/reset animation, L theme, Esc exit.
- Storage: localStorage key `ict1013-v2` (done, bm, quiz, last); theme key `ict-theme`.
- In-app detection: `IS_APP` (user agent contains `ICT1013App`) hides the "📱 Android app" home button inside the app.
- Totals: 32 units, 382 concept slides, **950 deck slides**, 80 animations.

### Content rules followed (keep following them)
- No invented official marks, grading weights or exam policies (instructor announces them).
- Fictional data only; never ask for real banking credentials; non-graphic examples; health tools are not a substitute for professional judgement; privacy/confidentiality stressed.
- Cyberbullying reporting refers to NCCIA (formerly FIA Cyber Crime Wing) under PECA 2016. Easypaisa phrased as "originally launched by Telenor Microfinance Bank (now operating under the easypaisa brand)".
- Facts that change often are flagged in presenter notes for checking before class (Zong PayMax, Keenu Wallet, Telemart/Shophive policies, free cloud storage sizes).

## 4. Hosting / deployment

- Vercel project **applications-of-ict** (id `prj_t5j9sQGWOz7XLtnY6EdHxpeCZvgO`), team `tahirs-projects-44e2c3df` (`team_ecFlVoTYGOiRvqFH4V7yLhif`). Linked to GitHub: **every push to `main` deploys to production** automatically.
- `.vercelignore` excludes `android/` and `docs/` from the website.
- Git author used for commits: `tahir8203 <tahir8203@users.noreply.github.com>` (no global git identity on this PC, so pass `-c user.name=... -c user.email=...`).
- If the Vercel MCP connector says 403 for the team, it needs a team-access approval link (authorize_team_access) signed in to Vercel.

## 5. Run locally

```bash
cd "D:/Fall 2026/ICT/ict"
python -m http.server 5173
```
Then open http://localhost:5173. (Or open `index.html` directly.) In Claude Code, `.claude/launch.json` has two configs: `course` (site on 5173) and `apkweb` (the copy bundled in the APK, on 5174, after a build).

## 6. Android app

- Package **`pk.edu.ict1013`** (never change it), version **1.0.0 / versionCode 1**, minSdk 24 (Android 7.0), targetSdk/compileSdk 36. Size ≈ 0.3 MB.
- Plain Java WebView app (no libraries): `android/app/src/main/java/pk/edu/ict1013/MainActivity.java`.
  - Serves the bundled site from `https://appassets.androidplatform.net/www/index.html` (assets), so localStorage progress works offline.
  - Back button walks back through pages/slides, then exits (predictive back on Android 13+).
  - Fullscreen presentations hide system bars; screen kept on; `window.print()` → Android print / Save as PDF; external links open in the browser; edge-to-edge insets handled.
  - Fonts come from Google Fonts when online, system fonts offline.
- Build toolchain on this PC (shared with the DEA Okara app): JDK `C:\dev\jdk21`, SDK `C:\dev\android-sdk` (platforms 34–36, build-tools 36.0.0), Gradle 9.3.1 wrapper, AGP 9.1.0 (both cached in `~/.gradle`).
- Signing: `Documents\ICT-1013-Signing\ict1013-release.jks` + `key.properties` (alias `ict1013`). Certificate SHA-256 `01b02943545000a02cf8de0f456febd2d09400fefe78d2952423b45957167a03`. Losing this key = phones can't update the app.

### Build a new APK
```bash
cd "D:/Fall 2026/ICT/ict/android"
export JAVA_HOME=/c/dev/jdk21 ANDROID_HOME=/c/dev/android-sdk
export ICT_SIGNING_PROPERTIES="$USERPROFILE/Documents/ICT-1013-Signing/key.properties"
./build-apk.sh        # copies ../index.html + ../assets into the APK -> release/ICT-1013.apk + SHA256SUMS.txt
```
For an update: raise `versionCode` and `versionName` in `android/app/build.gradle.kts`, build, then
```bash
gh release create v1.0.1 android/release/ICT-1013.apk android/release/SHA256SUMS.txt --title "ICT-1013 Android app v1.0.1" --notes "..."
```
(The `releases/latest/download/ICT-1013.apk` link then serves the new version.) Website content edits also need a rebuilt APK for the app to get them.

Verify: `apksigner verify --print-certs` and `aapt2 dump badging` from `C:\dev\android-sdk\build-tools\36.0.0`.

## 7. Portfolio entry (tahir8203/Portfolio, Next.js)

- `lib/data.ts` → `teaching` array: first card "Applications of ICT" (image `/shots/ict.jpg`, tags 30 sessions · 80 animations · Watch mode); also in `fallbackRepos`.
- `app/page.tsx` → `PINNED` (first) and `DESCRIPTIONS`.
- `public/shots/ict.jpg` = 1440×900 screenshot of the course home (headless Edge).
- Workflow used: branch → PR → merge; Vercel deploys tahir-portfolio automatically.

## 8. Testing done

- Node validation: all demo ids and answer indexes valid.
- Browser sweep: every unit page + all 950 slides opened, demos stepped, no console errors; 1600×900 projector and 375px phone (no horizontal scroll).
- Live site and portfolio card checked after deploy. Downloaded release APK hash matches the build.

## 9. Not done / to check

- **APK not yet run on a real phone** (no emulator: Hyper-V/virtualization hypervisor is off on this PC). Check: startup offline, back button, fullscreen in a lecture, Print handout → Save as PDF, progress kept after closing.
- Fullscreen on the classroom PC needs a real click — test once.
- Confirm the flagged product facts and the instructor card text (MPhil, 10+ years, roles copied from the Mobile App Dev card).
- Optional ideas: bundle fonts for full offline look; in-app update check; Bloom's-taxonomy tags like the Compiler Construction course.

## 10. Related courses (same style)

- Mobile Application Development: https://mobile-application-development-five.vercel.app · repo tahir8203/Mobile-Application-Development (its own Android app, package `com.mtahir.madcourse`, built with tools in `D:\MADBuildTools`).
- Compiler Construction: https://compiler-construction-phi.vercel.app · repo tahir8203/Compiler-Construction (folder `D:\Fall 2026\Compiler`).
