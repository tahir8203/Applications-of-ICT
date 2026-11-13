# ICT-1013 Android app

A native Android app (package `pk.edu.ict1013`) that carries the whole course inside the APK, so it works **offline**: all 32 units, 950 slides, 80 animations, Watch mode, quizzes, flashcards, glossary and progress tracking.

- Download: https://github.com/tahir8203/Applications-of-ICT/releases/latest/download/ICT-1013.apk
- Android 7.0 (API 24) or newer. Allow "Install unknown apps" for your browser or file manager the first time.

## What the app adds to the website

- Runs from the APK's assets on a private https origin, so progress, bookmarks and quiz scores are saved on the phone.
- The Android back button goes back through slides and pages before closing the app.
- Fullscreen presentations hide the status and navigation bars.
- **Print handout** opens Android's print dialog (choose *Save as PDF*).
- The screen stays on while the app is open (useful in Watch mode).
- Web links open in the phone's browser. Fonts load from Google Fonts when online and fall back to system fonts offline.

## Version 2.0.0 additions

- Splash screen, then the portal dashboard with a bottom tab bar.
- Vibration feedback on taps and answers (`VIBRATE` permission).
- Status and navigation bar areas follow the light or dark theme.
- Back closes a sheet, the slide overview or the presentation first, then steps back, and exits from Home.
- Screen stays on only while a presentation is open; a rotate button locks slides to landscape.
- Native share sheet for the portal link.

## Build

Needs JDK 17+ and the Android SDK (platform 36). The signing key is kept **outside** the repository:
`Documents\ICT-1013-Signing\` (`ict1013-release.jks` + `key.properties`). Back it up: every future update must be signed with the same key, or phones cannot update the app.

```bash
export JAVA_HOME=/c/dev/jdk21 ANDROID_HOME=/c/dev/android-sdk
export ICT_SIGNING_PROPERTIES="$USERPROFILE/Documents/ICT-1013-Signing/key.properties"
./build-apk.sh        # copies ../index.html and ../assets into the APK, writes release/ICT-1013.apk
```

For a new version, raise `versionCode` and `versionName` in `app/build.gradle.kts`, build, then upload `release/ICT-1013.apk` to a new GitHub release.
