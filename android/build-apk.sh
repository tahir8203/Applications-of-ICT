#!/usr/bin/env bash
# Builds the signed ICT-1013 Android APK with the course bundled for offline use.
# Needs: JDK 17+ (JAVA_HOME), Android SDK (ANDROID_HOME) and ICT_SIGNING_PROPERTIES -> key.properties.
set -euo pipefail
cd "$(dirname "$0")"
WWW=app/src/main/assets/www
rm -rf "$WWW" && mkdir -p "$WWW"
cp ../index.html "$WWW/"
cp -r ../assets "$WWW/"
VER=$(grep -o 'versionName = "[^"]*"' app/build.gradle.kts | cut -d'"' -f2)
./gradlew --no-daemon -q assembleRelease
mkdir -p release
cp app/build/outputs/apk/release/app-release.apk release/ICT-1013.apk
cp release/ICT-1013.apk "release/ICT-1013_v$VER.apk"
(cd release && sha256sum ICT-1013.apk > SHA256SUMS.txt)
echo "Built release/ICT-1013.apk (v$VER)"
