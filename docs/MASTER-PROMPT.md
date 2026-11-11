# MASTER PROMPT — Applications of ICT (ICT-1013) Animated Course

## Role
Act as a senior front-end engineer, instructional designer and animation specialist. Build — do not just plan — a complete, animated, projector-ready HTML course website for my university course **Applications of Information and Communication Technologies (ICT-1013)**, BS Psychology, 3 credit hours, 16 weeks / 32 sessions of 90 minutes. Instructor: Muhammad Tahir Mehmood.

## Source of truth
The official course outline (`Applications of Information and Communication technologies.doc`). Every topic in its Calendar of Activities must be covered, in its week, with its listed assessment (Assignments 1–4, Quizzes 1–4, Mid-Term in Week 9, Review in Week 15, Project Presentation in Week 16). Learning outcomes LO1–LO4 must be mapped to sessions. Textbooks: *Discovering Computers* (Vermaat et al.), *GO! with Microsoft Office*, *Exploring Microsoft Office*; references *Computing Essentials*, *Technology in Action*.

## Step 1 — Inspect before building
1. Inspect the working folder and any existing repository. If a previous course site exists (e.g. my Mobile Application Development course), reuse its proven architecture: static site, no build step, content separated from UI, deployed on Vercel from GitHub.
2. Write the full 32-session content map (title, objectives, slide list, demo, quiz, activity) **before** writing UI code.

## Step 2 — Content rules (accuracy first)
- Audience: psychology students, not programmers. Easy English, no jargon without a definition, local Pakistani examples (JazzCash, Easypaisa, Raast, Daraz, Oladoc, Marham, Sehat Kahani, PECA 2016, FIA cybercrime reporting, HEC plagiarism policy) and psychology examples (APA 7 citations, mental-health apps, online research ethics).
- Each session: learning objectives, 10–16 slides, real-life examples, one or more interactive animations, common mistakes, a hands-on lab task, quick revision, a 5-question quiz with explanations, and glossary terms.
- Facts must be correct and current as of 2026; do not invent statistics. Prefer timeless explanations over volatile numbers.

## Step 3 — Presentation mode (most important)
ONE SCREEN = ONE CONCEPT. Each slide: one large heading, one short explanation, one visual or demo, one example, one takeaway. Full-screen, large type, high contrast, progress bar, slide number, overview grid, presenter notes (hidden by default, toggle **N**), keys **→/Space** next, **←** back, **Home/End**, **F** fullscreen, **Esc** exit, **O** overview, swipe on phones. Resume last slide.

## Step 4 — Educational animations
Animations must explain, not decorate. Each has Play / Step / Reset, respects `prefers-reduced-motion`, and works on phones. Required demos: input-process-output cycle, computer hardware parts, network data packets, local vs cloud storage sync, search engine crawl→index→rank, email journey, spreadsheet formula evaluation, cloud file sharing permissions, video-call data flow, social feed algorithm, LMS workflow, fitness-tracker sensor to dashboard, telemedicine consultation flow, digital wallet payment flow, e-commerce order pipeline, digital footprint growth, phishing email spotter, plagiarism/citation checker, fake-news verification (SIFT), copyright/Creative Commons license picker.

## Step 5 — Course features
Home dashboard with 16-week roadmap, session library with search, study (reading) view, presentation view, quizzes with scoring, flashcards, glossary, bookmarks, progress tracking and "resume where you left off" (localStorage), assessment calendar, light/dark theme, print-friendly handout view.

## Step 6 — Quality bar
Responsive at 1920×1080, 1366×768, 768×1024, 390×844 and 360×800 with no horizontal overflow. Keyboard accessible, good contrast, no console errors, no placeholder slides, no "coming soon".

## Step 7 — Ship it
Build in phases, each phase working before the next. Keep a progress checklist (`docs/PROGRESS.md`) that states honestly what is complete, tested and deployed. Create a public GitHub repository, push, connect it to Vercel, verify the production URL loads and every session opens, then report the links.
