# Applications of ICT (ICT-1013)

An animated, projector-ready course website for **Applications of Information and Communication Technologies** — BS Psychology, 3 credit hours, 16 weeks.

Instructor: Muhammad Tahir Mehmood

Static site, no build step. Open `index.html` directly or serve the folder.

Repository: https://github.com/tahir8203/Applications-of-ICT  
Hosting: Vercel project `applications-of-ict` (every push to `main` deploys to production).

> **Continuing this project?** Start with [docs/START-HERE.md](docs/START-HERE.md). It links the technical handoff ([docs/HANDOFF.md](docs/HANDOFF.md)), the full chat history ([docs/CHAT-HISTORY.md](docs/CHAT-HISTORY.md)) and the original course outline ([docs/course-outline](docs/course-outline/)).

## What's inside

- **30 teaching sessions + Midterm unit (Week 9) + Final Exam unit (Week 17)** following the official calendar of activities.
- Every session: introduction, learning objectives, 9–16 concept slides, animations, psychology examples, classroom activity, discussion questions, common mistakes, summary, knowledge check (5 MCQs with explanations), homework and key terms.
- **Assessments:** Quiz 1–4, Assignment 1–4, Midterm mock exam, Project guide and presentation, Final mock exam. They include MCQs, true/false, short questions and scenario questions with model answers. No official marks or weightage are set here; the instructor announces those.
- **Bloom's Taxonomy outcomes (Head · Heart · Hand)** for all 30 teaching sessions.
- **80 step-by-step educational animations** (Play / Pause / Step / Reset, plus decision simulations).
- **Watch mode:** plays any lecture like an animated video. Slides auto-advance, animations auto-play and quiz answers reveal on their own.
- Revision dashboard, flashcards, glossary, search, bookmarks, progress tracking (localStorage), light/dark theme and print handouts.

## Student portal (version 2.0)

- **Dashboard home:** greeting, progress ring, XP levels, day streak, resume card, quick-access tiles, question of the day, upcoming assessments, "ICT today" and the current week (from the semester start date in the profile).
- **App shell:** bottom tab bar on phones (Home, Learn, Practice, Tools, Me), compact top bar with back button, page transitions, toasts, confetti, global search (Ctrl+K).
- **Bloom's Taxonomy outcomes** (Head · Heart · Hand) on every teaching session and as a slide (`assets/sessions/bloom.js`).
- **Practice centre** (`#/practice`): quick quiz by topic, timed midterm and final mocks, phishing spotter, keyboard-shortcut trainer, spreadsheet formula challenge, term match.
- **Web journey visualizer** (`#/journey`): type a web address and step through URL parts → DNS → connection and HTTPS → request → response → packets → page. A simulation; nothing is sent.
- **Lab tools** (`#/tools`): password strength lab, APA 7 reference builder, search builder, descriptive statistics calculator, data size and download time, text ↔ binary, formal email checker.
- **Resources** (`#/sheets`): 19 cheat sheets, 26 viva questions with answers, "ICT today" (AI, passkeys, deepfakes, instant payments…), "If something goes wrong" steps, free tools for psychology students, exam tips.
- **Profile** (`#/me`): badges, progress by unit, personal notes per session, backup/restore code, install and share.
- **Installable:** `manifest.webmanifest` + `sw.js` make the website installable and usable offline. Bump `VERSION` in `sw.js` together with every `?v=N` in `index.html` after editing assets.

Files: `assets/portal.js` (shell and new pages), `assets/portal.css`, `assets/portal-data.js` (cheat sheets, viva, practice banks), `assets/tools.js` (lab tools). Portal data is stored under the localStorage key `ict-portal-v1`.

## Android app

Offline Android app with the full course: **[Download ICT-1013.apk](https://github.com/tahir8203/Applications-of-ICT/releases/latest/download/ICT-1013.apk)** (Android 7.0+). Source and build steps are in [`android/`](android/README.md).

## Presentation mode (classroom projector)

One screen = one concept. Open from any session (**Present** / **Watch**) or the URL `#/p/<session>/<slide>`. Use `#/w/<session>` to start in Watch mode.

| Key | Action |
|---|---|
| → / Space / PageDown | Next slide |
| ← / PageUp | Previous slide |
| Home / End | First / last slide |
| number + Enter | Jump to slide |
| W | Watch mode (auto-play like a video) |
| F | Fullscreen |
| Esc | Exit fullscreen, then exit presentation |
| N | Presenter notes |
| O | Slide overview |
| S / P / R | Step, play/pause, reset the slide's animation |
| L | Light / dark |

Swipe left/right on phones.

## Structure

```
index.html                 Shell + course metadata (outline, outcomes, books, policies)
assets/styles.css          Design system, presentation, animation & instructor card styles
assets/portal.js           Portal layer: dashboard, app shell, practice, web journey, resources, profile
assets/portal-data.js      Cheat sheets, viva questions, practice banks
assets/tools.js            Lab tools
assets/sessions/bloom.js   Bloom's Taxonomy outcomes per session
manifest.webmanifest, sw.js  Installable / offline support
assets/app.js              Router, study view, presentation engine, Watch mode, assessments, flashcards, glossary
assets/demos.js            Educational animation library (flow, SVG and decision-simulation widgets)
assets/sessions/part1-4.js Course content as data (sessions, slides, quizzes, assessments)
assets/instructor.webp     Instructor photo
docs/MASTER-PROMPT.md      Refined project brief
docs/PROGRESS.md           Progress checklist
docs/START-HERE.md         How to continue the project (read first)
docs/HANDOFF.md            Full technical handoff
docs/CHAT-HISTORY.md       Readable history of the chat that built the project
docs/course-outline/       Original course outline
android/                   Android app (offline WebView shell) and build script
```

To add or edit a session, change the data in `assets/sessions/*.js`. No UI code changes are needed.
