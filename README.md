# Juaben Senior High School — QUIZFORGE NSMQ Training Lab

Android-first, offline-capable team practice app. Includes five quiz formats, timed drills, explanations, team roster and rotation, performance history, question-bank authoring/import/export, and Mental Math modes: Quick Fire, Accuracy Mode, Mixed Challenge and Team Relay.

The seed bank contains original demonstration questions, not official NSMQ past questions. Teacher review is recommended. Independent project; not affiliated with Primetime or official NSMQ.

Core data is stored locally on each device. Multi-device live synchronization is not implemented.

## APK build
GitHub Actions runs on pushes to this branch or manually via Actions → Android APK → Run workflow. It builds the web app, adds Capacitor Android, runs Gradle assembleDebug, and uploads the debug APK artifact.

Local prerequisites: Node.js 22, Java 17 and Android SDK. Run npm install, npm run build, npx cap add android, npx cap sync android, then cd android && ./gradlew assembleDebug.


## Visual identity
The in-app crest is linked from the JUASS school website (https://www.juass.online/about.html). Physics and Chemistry use separate science-themed Unsplash images; the Home screen uses an auditorium photograph as an NSMQ-inspired training-arena backdrop. The build workflow downloads and packages these images into the APK so they are available offline. The JUASS crest is also used for the Android launcher icon. Pinterest was reviewed for layout inspiration only; Pins are not copied into the app because their copyright/licensing status is not reliably established. Unsplash license: https://unsplash.com/license.

Image references:
- Physics atom render: https://unsplash.com/photos/diagram-of-an-atom-with-nucleus-and-orbiting-electrons-OQ6T3OusS6Q
- Chemistry molecular structure: https://unsplash.com/photos/abstract-blue-and-white-organic-molecular-structure-wt23anUaLec
- NSMQ arena auditorium: https://unsplash.com/photos/an-empty-auditorium-with-red-seats-and-a-projector-screen-9dela-to5c4
