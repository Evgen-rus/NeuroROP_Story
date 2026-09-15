# 04 — Motion spec

## Принцип
Motion объясняет причинно-следственную связь. Каждая анимация должна отвечать: «что пользователь понял благодаря этому движению?»

## Базовые паттерны
1. **Reveal** — opacity + 8–24 px translate, 320–650 ms.
2. **Morph/continuity** — элемент из предыдущей сцены физически становится элементом следующей.
3. **Sticky narrative** — визуал фиксирован, текст/состояние меняются по scroll progress.
4. **Focus** — окружающее приглушается, нужный объект остаётся в полном контрасте.
5. **Data convergence** — события сходятся в «Текущую ситуацию».
6. **Zoom-in hierarchy** — команда → менеджер → сделка; не использовать browser zoom.
7. **State transition** — красный риск после feedback loop может стать yellow/green.

## Ритм
Не одинаковый scroll на всех сценах:
- 01 typography + event cloud;
- 02 UI assembly;
- 03 focus/zoom;
- 04 deal extraction;
- 05 graph/convergence;
- 06 progressive explanation;
- 07 split-screen;
- 08 modal expansion;
- 09 tabs/highlight;
- 10 simulated voice;
- 11 step sequence;
- 12 loop/state change;
- 13 quiet landing.

## Easing
Default: smooth ease-out / spring without bounce.
Не использовать playful overshoot для бизнес-интерфейса.

## Scroll ranges
Каждая сложная сцена может занимать 110–180vh.
Текстовая сцена — ~100vh.
Финал — 80–100vh.

## Accessibility
- `prefers-reduced-motion`: убрать parallax/morph, оставить instant/fade state changes.
- scroll не должен блокироваться/перехватываться.
- keyboard navigation для интерактивных элементов.
- никакой критичной информации только через цвет.

## Performance
- transform/opacity first;
- избегать layout-thrashing;
- SVG path animations — ограниченно;
- не держать несколько тяжёлых blur/filter в движении;
- никаких больших autoplay video;
- raw screenshots не рендерить как полноэкранные PNG в production.
