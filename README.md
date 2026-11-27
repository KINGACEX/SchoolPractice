# Juaben Senior High School — QUIZFORGE NSMQ Training Lab

Android-first, offline-capable team practice app. Includes five quiz formats, timed drills, explanations, team roster and rotation, performance history, question-bank authoring/import/export, and Mental Math modes: Quick Fire, Accuracy Mode, Mixed Challenge and Team Relay.

The seed bank contains original demonstration questions, not official NSMQ past questions. Teacher review is recommended. Independent project; not affiliated with Primetime or official NSMQ.

Core data is stored locally on each device. Multi-device live synchronization is not implemented.

## APK build
GitHub Actions runs on pushes to this branch or manually via Actions → Android APK → Run workflow. It builds the web app, adds Capacitor Android, runs Gradle assembleDebug, and uploads the debug APK artifact.

Local prerequisites: Node.js 22, Java 17 and Android SDK. Run npm install, npm run build, npx cap add android, npx cap sync android, then cd android && ./gradlew assembleDebug.
