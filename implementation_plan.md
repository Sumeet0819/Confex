# Flutter Frontend Implementation Plan

We will create a new Flutter project strictly for the frontend (`flutter_frontend`). **We will NOT create a new backend.** The new Flutter app will connect directly to your *existing* Node.js REST API (running on `http://localhost:5000/api`), mirroring the exact design language and functionality of the React web app.

## User Review Required

> [!WARNING]
> Building a full Flutter application from scratch to mirror a complex web app is a large undertaking. This plan outlines the initialization and the first phase of development. 

## Open Questions

> [!IMPORTANT]
> 1. **Do you have the Flutter SDK installed on your Windows machine?** (We need it to run `flutter create`).
> 2. **What package name would you like?** (e.g., `com.productivitybox.app`)
> 3. **Which feature should we build first after authentication?** (e.g., Dashboard, Tasks, Finance Hub?)

## Proposed Changes

### Phase 1: Project Initialization & Architecture

#### [NEW] `flutter_frontend/`
- Run `flutter create --org com.productivitybox --project-name productivity_box flutter_frontend`
- Set up state management (e.g., `provider` or `riverpod`).
- Set up routing (e.g., `go_router`).
- Configure HTTP networking (`http` or `dio` package) to communicate with `http://localhost:5000/api`.

#### [NEW] `flutter_frontend/lib/core/theme/`
- Define the Design System:
  - Extract the exact CSS variables from the React app (colors like `--primary`, `--surface-container-lowest`).
  - Create a custom `ThemeData` class in Flutter to enforce consistent styling, typography (Google Fonts), and rounded borders mirroring the web app.

### Phase 2: Authentication & Services
- Implement `api_service.dart` to handle JWT persistence (using `flutter_secure_storage`).
- Build Login and Registration screens mirroring the web UI.

### Phase 3: Core Features (Iterative)
- **Home Dashboard**: Recreate the grid layout using `GridView` and custom Cards.
- **Todo Manager**: Implement drag-and-drop or simple list views with animated status toggles.
- **Finance Hub**: Port over the transaction list and progress indicators.
- **Scratchpad**: Use a Flutter code editor package (like `flutter_code_editor`) to mirror the Monaco editor experience.

## Verification Plan

### Automated Tests
- Run `flutter analyze` to ensure code quality.
- Verify that `flutter build apk` succeeds without compilation errors.

### Manual Verification
- Launch the Flutter app on an Android emulator or Windows desktop target.
- Verify that logging in through the Flutter app successfully communicates with the local Node.js backend and retrieves the correct user data.
