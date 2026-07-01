# Codex Guidance For PhysioReact

## Project Nature

PhysioReact is a static web app:

- No framework.
- No runtime dependencies.
- Main behavior lives in `js/app.js`.
- UI structure lives in `index.html`.
- Styling lives in `css/style.css`.

Keep changes small, focused, and easy to review.

## Strict Rules

- Do not rename HTML ids without a complete search through `js/app.js`.
- Do not remove classes or `data-*` attributes used by JavaScript.
- Do not mix unrelated topics in one PR.
- Prefer small, testable PRs.
- Do not migrate to a framework.
- Do not add dependencies without a strong justification.
- Do not combine visual redesign, behavior changes, and PWA/cache changes unless the PR explicitly targets that integration.

## DOM / JavaScript Contract To Protect

These ids are used by `js/app.js` and must be treated as part of the app contract:

- `screen-stimuli`
- `screen-timing`
- `screen-session`
- `stimulus-box`
- `stimulus-content`
- `session-status`
- `btn-start`
- `btn-stop`
- `floating-stop-btn`
- `countdown-overlay`
- `countdown-text`
- `check-combined-enabled`
- `combined-options`
- `check-colored-arrows-only`
- `check-background-cue`
- `input-fixed-duration`
- `input-random-min`
- `input-random-max`
- `input-delay`
- `input-work-sec`
- `input-rest-sec`
- `check-auto-restart`
- `input-repetitions`
- `input-max-same`

## Sensitive Classes And Attributes

These classes and attributes are read or controlled by JavaScript:

- `tab-button`
- `screen`
- `active`
- `hidden`
- `color-checkbox`
- `arrow-checkbox`
- `number-checkbox`
- `letter-checkbox`
- `data-screen`
- `data-color`
- `data-arrow`
- `data-number`
- `data-letter`

Search before renaming or removing any of them.

## PWA And Cache Rules

- If `index.html`, `css/style.css`, `js/app.js`, `manifest.webmanifest`, or `service-worker.js` changes, check whether `CACHE_NAME` in `service-worker.js` must be incremented.
- If assets are versioned with query strings, keep `index.html` and `service-worker.js` aligned.
- Do not mix a UI redesign and a cache bump in the same PR unless the PR is explicitly about PWA release/versioning.

## Manual Test Checklist

For behavior changes, test:

- Color mode.
- Arrow mode.
- Number mode.
- Letter mode.
- Combined mode with `Stimulus color = Go/No-Go`.
- Combined mode with `Background color = Go/No-Go`.
- Start and stop.
- Mobile layout.
- Browser console for errors.

For documentation-only PRs, confirm that no app files changed.
