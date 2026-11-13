# START HERE: moving the ICT-1013 project to a new Claude account

Everything for the **Applications of ICT (ICT-1013)** web portal and Android app is saved on this laptop. Nothing is stored only in the old Claude account.

## 1. What is saved, and where

| What | Location on this laptop |
|---|---|
| This guide | `D:\Fall 2026\ICT\START-HERE.md` |
| Full technical handoff (links, structure, build steps, decisions) | `D:\Fall 2026\ICT\HANDOFF.md` (same file in the repo as `ict\docs\HANDOFF.md`) |
| Readable history of the whole chat | `D:\Fall 2026\ICT\CHAT-HISTORY.md` |
| Complete project with git history (website + Android app) | `D:\Fall 2026\ICT\ict\` |
| Android app files | `D:\Fall 2026\ICT\ICT-1013_v2.0.0.apk` (latest) and `ICT-1013_v1.0.0.apk` |
| Course outline (original) | `D:\Fall 2026\ICT\Applications of Information and Communication technologies.doc` |
| Improved project prompt | `D:\Fall 2026\ICT\ict\docs\MASTER-PROMPT.md` |
| Progress checklist | `D:\Fall 2026\ICT\ict\docs\PROGRESS.md` |
| **Android signing key (private, never share or upload)** | `C:\Users\Hameed Computers\Documents\ICT-1013-Signing\` (`ict1013-release.jks` + `key.properties`) |

**Back up the signing-key folder** to a USB drive or private cloud folder. Without it you can never publish an update that installs over the existing app.

Online copies (these do not depend on any Claude account):
- Live website: https://applications-of-ict.vercel.app
- GitHub repo: https://github.com/tahir8203/Applications-of-ICT
- APK download (latest): https://github.com/tahir8203/Applications-of-ICT/releases/latest/download/ICT-1013.apk
- Portfolio card: https://tahir-portfolio-teal.vercel.app/#teaching

## 2. Set up the new Claude account

1. Sign in to the Claude desktop app with the new account and open the **Code** tab.
2. Choose **`D:\Fall 2026\ICT\ict`** as the project folder (not a new empty folder).
3. GitHub: the `gh` command on this laptop is already signed in as `tahir8203`, so pushing and releases keep working. If it asks, run `gh auth login`.
4. Vercel: in the new account, connect the **Vercel** connector and approve access to the team *tahirs-projects*. This is needed only for Vercel dashboard tasks; normal updates deploy automatically when you push to GitHub.
5. Build tools for the APK are already on this laptop: `C:\dev\jdk21` and `C:\dev\android-sdk`.

## 3. What to type in the first message to the new account

Copy and paste this:

```text
I am continuing my ICT-1013 course project from another Claude account.
Before doing anything, read these files:
1. D:\Fall 2026\ICT\START-HERE.md
2. D:\Fall 2026\ICT\HANDOFF.md  (full technical details, especially sections 6, 9 and 11)
3. D:\Fall 2026\ICT\CHAT-HISTORY.md  (what I asked for and what was done)
The project is in D:\Fall 2026\ICT\ict (GitHub tahir8203/Applications-of-ICT, live at
https://applications-of-ict.vercel.app, Android app package pk.edu.ict1013, now version 2.0.0).
Summarise the current state in a few lines, then wait for my next instruction.
```

Then give your new request, for example "add more animations to Session 12" or "build version 2.0.1 of the app".

## 4. Current state (13 Nov 2026)

- **Website:** Portal 2.0 is live. Student dashboard, bottom tab bar on phones, 32 units (30 sessions + Midterm + Final), 980 slides, 80 animations, Watch mode, Bloom's Taxonomy outcomes for every session, practice centre (quick quiz, timed mocks, phishing spotter, shortcut trainer, formula challenge, term match), web journey visualizer, 7 lab tools, 19 cheat sheets, 26 viva answers, badges, notes and offline install.
- **Android app:** version 2.0.0 (versionCode 2), signed, published as GitHub release `v2.0.0`. It works offline and installs over 1.0.0.
- **Portfolio:** the course is the first card in the Teaching section.

## 5. Still to do

- Install the APK on a real phone and test it (startup offline, back button, fullscreen slides, Print → Save as PDF, progress kept).
- On the live site in Chrome, check "Install app" once.
- Confirm the product facts flagged in presenter notes before class (wallet names, shop policies, free storage sizes).
- Fullscreen on the classroom PC needs a real click; test it once.

## 6. Rules the course follows (tell the new account to keep them)

- No invented official marks, grading weights or exam policies.
- All people, banks, shops and messages in examples are fictional.
- Never ask for real banking or login details.
- Health and AI tools do not replace qualified professionals; stress privacy and confidentiality.
- Cyberbullying reporting refers to NCCIA under PECA 2016.
