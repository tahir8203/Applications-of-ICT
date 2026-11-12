# Applications of ICT (ICT-1013)

An animated, projector-ready course website for **Applications of Information and Communication Technologies** — BS Psychology, 3 credit hours, 16 weeks.

Instructor: Muhammad Tahir Mehmood

Static site, no build step. Open `index.html` directly or serve the folder.

Repository: https://github.com/tahir8203/Applications-of-ICT  
Hosting: Vercel project `applications-of-ict` (every push to `main` deploys to production).

## What's inside

- **30 teaching sessions + Midterm unit (Week 9) + Final Exam unit (Week 17)** following the official calendar of activities.
- Every session: introduction, learning objectives, 9–16 concept slides, animations, psychology examples, classroom activity, discussion questions, common mistakes, summary, knowledge check (5 MCQs with explanations), homework and key terms.
- **Assessments:** Quiz 1–4, Assignment 1–4, Midterm mock exam, Project guide and presentation, Final mock exam. They include MCQs, true/false, short questions and scenario questions with model answers. No official marks or weightage are set here; the instructor announces those.
- **80 step-by-step educational animations** (Play / Pause / Step / Reset, plus decision simulations).
- **Watch mode:** plays any lecture like an animated video. Slides auto-advance, animations auto-play and quiz answers reveal on their own.
- Revision dashboard, flashcards, glossary, search, bookmarks, progress tracking (localStorage), light/dark theme and print handouts.

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
assets/app.js              Router, study view, presentation engine, Watch mode, assessments, flashcards, glossary
assets/demos.js            Educational animation library (flow, SVG and decision-simulation widgets)
assets/sessions/part1-4.js Course content as data (sessions, slides, quizzes, assessments)
assets/instructor.webp     Instructor photo
docs/MASTER-PROMPT.md      Refined project brief
docs/PROGRESS.md           Progress checklist
android/                   Android app (offline WebView shell) and build script
```

To add or edit a session, change the data in `assets/sessions/*.js`. No UI code changes are needed.
