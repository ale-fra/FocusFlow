# FocusFlow Scan Report

## Overview
- **Framework & Tooling:** Next.js 16 with React 19, Tailwind CSS 4, Framer Motion, Zustand state management, and Lucide icons.
- **Scope:** Reviewed timer UI (app/page.tsx, components/timer/TimerUI.tsx), layout shell, timer store, ticking hook, and global styles.

## Architecture Notes
- **Layout:** `app/layout.tsx` wires up Geist fonts and wraps pages, while `components/layout/GlassShell.tsx` provides the glassmorphic container with header/footer chrome.
- **Timer Flow:** `TimerUI` renders the mode selector, circular timer, and controls, backed by `useTimerStore` for state/persistence and `useTimerTick` for ticking and document-title updates.

## Findings & Recommendations
1. **Duplicate duration sources** – Timer durations are defined inline in `TimerUI` and separately in the store. Divergence will desync the ring math from the persisted state. Use a single shared source (e.g., export `DURATIONS` from the store) for both rendering and persistence.
   - Evidence: hardcoded branch in `TimerUI` for 25/5/15 minute totals vs. `DURATIONS` map in the store.【F:components/timer/TimerUI.tsx†L13-L33】【F:store/useTimerStore.ts†L20-L42】

2. **Unutilized cycle tracking** – The store exposes `cycles` and `incrementCycles` but the UI never calls them. Consider wiring cycle increments into the completion flow and exposing the count for future stats or auto long-break scheduling.
   - Evidence: `cycles` state and `incrementCycles` setter in the store with no corresponding usage in `TimerUI` or hooks.【F:store/useTimerStore.ts†L6-L18】【F:store/useTimerStore.ts†L50-L52】

3. **Timer completion logic could be clearer** – `useTimerTick` reuses `tick()` on completion primarily to flip `isActive` to false and logs a placeholder. A dedicated completion handler can handle stopping, playing sounds, and scheduling the next mode without double-calling `tick()`.
   - Evidence: completion effect fires when `timeLeft === 0` and calls `tick()` plus a TODO log.【F:hooks/useTimerTick.ts†L20-L26】【F:store/useTimerStore.ts†L43-L49】

4. **Type robustness for intervals** – The ticking effect types `interval` as `NodeJS.Timeout`, which differs from the browser `number` return type and can force downstream `@types/node` coupling. Prefer `ReturnType<typeof setInterval>` to avoid environment mismatch.
   - Evidence: interval declaration inside the ticking effect.【F:hooks/useTimerTick.ts†L8-L18】

5. **Settings control is non-functional** – The settings/Sliders button in `TimerUI` has no handler. Add at least a stub action or remove it to avoid confusing users.
   - Evidence: button renders without onClick logic beyond animation styling.【F:components/timer/TimerUI.tsx†L96-L138】

## Checks Run
- `npm run lint`
