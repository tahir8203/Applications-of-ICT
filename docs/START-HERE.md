# START HERE: continuing the ICT-1013 project

This repository holds **everything** needed to continue the **Applications of ICT (ICT-1013)** web portal and Android app: the code, the course outline, the full chat history and the technical handoff. Share this repository link with anyone (or any new Claude account) and they can start from here:

**https://github.com/tahir8203/Applications-of-ICT**

## 1. What is in this repository

| What | Path |
|---|---|
| This guide | `docs/START-HERE.md` |
| Full technical handoff (links, structure, build steps, decisions, version 2.0 notes) | `docs/HANDOFF.md` |
| Readable history of the whole chat that built the project | `docs/CHAT-HISTORY.md` |
| Original course outline | `docs/course-outline/ICT-1013 Course Outline.doc` |
| Improved project prompt | `docs/MASTER-PROMPT.md` |
| Progress checklist | `docs/PROGRESS.md` |
| Website (static, no build step) | `index.html`, `assets/`, `manifest.webmanifest`, `sw.js` |
| Course content as data | `assets/sessions/part1–4.js`, `assets/sessions/bloom.js` |
| Android app source and build script | `android/` (see `android/README.md`) |
| Signed APK files | GitHub **Releases** (not stored in the code): latest at https://github.com/tahir8203/Applications-of-ICT/releases/latest/download/ICT-1013.apk |

Live website: https://applications-of-ict.vercel.app (Vercel redeploys it on every push to `main`).

**Not in the repository, on purpose:** the Android signing key (`ict1013-release.jks` + `key.properties`). It is private and kept on the owner's laptop in `Documents\ICT-1013-Signing\` and in a personal backup. Without it, new APK versions cannot update the installed app. Never commit it.

## 2. Start working

**On the owner's laptop** the project is already at `D:\Fall 2026\ICT\ict`. Open that folder as the project.

**On any other computer:**

```bash
git clone https://github.com/tahir8203/Applications-of-ICT.git
cd Applications-of-ICT
python -m http.server 5173
```

Then open http://localhost:5173. Pushing to `main` needs write access to the repository; building a release APK needs JDK 17+, the Android SDK (platform 36) and the signing key (see `android/README.md`).

## 3. What to tell a new Claude account

Paste this as the first message, with the project folder open:

```text
I am continuing my ICT-1013 course project from another Claude account.
Repository: https://github.com/tahir8203/Applications-of-ICT
Before doing anything, read in this repository:
1. docs/START-HERE.md
2. docs/HANDOFF.md  (full technical details, especially sections 6, 9 and 11)
3. docs/CHAT-HISTORY.md  (what I asked for and what was done)
Live site: https://applications-of-ict.vercel.app · Android app package pk.edu.ict1013, version 2.0.0.
Summarise the current state in a few lines, then wait for my next instruction.
```

Account setup for the new account: GitHub access works through the `gh` command on the laptop (signed in as tahir8203). For tasks in the Vercel dashboard, connect the Vercel connector and approve the team *tahirs-projects*.

## 4. Current state (13 Nov 2026)

- **Website:** Portal 2.0 is live. Student dashboard, bottom tab bar on phones, 32 units (30 sessions + Midterm + Final), 980 slides, 80 animations, Watch mode, Bloom's Taxonomy outcomes for every session, practice centre (quick quiz, timed mocks, phishing spotter, shortcut trainer, formula challenge, term match), web journey visualizer, 7 lab tools, 19 cheat sheets, 26 viva answers, badges, notes and offline install.
- **Android app:** version 2.0.0 (versionCode 2), signed, published as GitHub release `v2.0.0`; works offline and installs over 1.0.0.
- **Portfolio:** the course is the first card in the Teaching section of https://tahir-portfolio-teal.vercel.app.

## 5. Still to do

- Install the APK on a real phone and test it (startup offline, back button, fullscreen slides, Print → Save as PDF, progress kept).
- On the live site in Chrome, check "Install app" once.
- Confirm the product facts flagged in presenter notes before class (wallet names, shop policies, free storage sizes).
- Fullscreen on the classroom PC needs a real click; test it once.

## 6. Rules the course follows

- No invented official marks, grading weights or exam policies.
- All people, banks, shops and messages in examples are fictional.
- Never ask for real banking or login details.
- Health and AI tools do not replace qualified professionals; stress privacy and confidentiality.
- Cyberbullying reporting refers to NCCIA under PECA 2016.
