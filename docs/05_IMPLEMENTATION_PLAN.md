# 05 — Implementation plan

## Phase 0 — Baseline
- запустить `setup.bat`;
- проверить `npm run build`;
- сохранить текущий working starter;
- не менять storyboard.

## Phase 1 — Design tokens + primitives
Компоненты:
- `StoryRail`
- `SceneShell`
- `StickyVisual`
- `MetricCard`
- `TrafficLight`
- `DealRow`
- `DealPanel`
- `InsightCard`
- `DozhimModal`
- `VoiceInput`
- `FollowupSteps`
- `FeedbackLoop`

Вынести tokens в CSS variables.

## Phase 2 — Scenes 01–04
Сделать first wow:
- hero;
- event chips;
- team summary;
- zoom/focus;
- extraction one deal.

Acceptance: первые 60–90 секунд уже выглядят законченно.

## Phase 3 — Scenes 05–07
Контекст → риск → помощь РОПу.
Главный KPI: зритель понимает, что система не просто красит сделки.

## Phase 4 — Scenes 08–11
Дожим + voice + Quick Help.
Главный KPI: зритель понимает, что менеджеру даётся контекстная помощь внутри сделки.

## Phase 5 — Scene 12–13
Feedback loop и финал.

## Phase 6 — Polish
- spacing/typography;
- scroll pacing;
- reduced motion;
- mobile simplification;
- accessibility;
- performance.

## Suggested agent delegation
Lead Sol Medium:
- архитектура;
- storyboard fidelity;
- интеграция;
- final visual QA.

Luna High worker 1:
- product UI primitives / scenes 02–07.

Luna High worker 2:
- Quick Help / scenes 08–11.

Luna Low/Medium:
- accessibility/mobile/checks.

Luna Max только при реальной необходимости:
- сложный morph между scene 03→04 или loop performance bug.

Не запускать всё одновременно, если компоненты пересекаются. Сначала определить API primitives.

## Definition of Done
- `npm run typecheck` success;
- `npm run build` success;
- нет raw screenshots в `dist`;
- desktop 1440/1920 без overflow/скачков;
- mobile readable;
- reduced-motion usable;
- 13 сцен следуют storyboard;
- CTA присутствует;
- нет реальных компаний/ФИО.
