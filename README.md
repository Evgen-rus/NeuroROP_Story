# NeuroROP Story

Отдельный presentation/scrollytelling-проект для НейроРОПа. Это **не модуль production Neuro_rop_practice** и не должен импортировать его backend, БД, Bitrix-клиент или секреты.

## Зачем
За 5–7 минут показать директору/собственнику и РОПу путь:
**вся команда → менеджер → проблемная сделка → причина → помощь РОПу → дожим менеджеру → feedback loop**.

Главная формулировка:
> CRM хранит события. НейроРОП превращает их в решение.

## Быстрый старт Windows
1. Распакуйте архив в отдельную папку.
2. Дважды запустите `setup.bat`.
3. После успешной проверки запустите `run.bat`.
4. Откройте адрес, который покажет Vite (обычно http://localhost:5173).

Важно: React не «устанавливается в Windows глобально». Зависимости этого проекта ставятся локально в `node_modules`.

## Что уже внутри
- рабочий React + TypeScript + Vite starter;
- 13 сцен как каркас;
- Motion для анимаций;
- подробный storyboard;
- design/motion spec;
- правила приватности;
- `AGENTS.md` под Codex и субагентов;
- исходные скриншоты пользователя в `references/raw/` — **только как референсы, не публиковать**.

## Перед работой Codex
Читать в порядке:
1. `AGENTS.md`
2. `docs/01_PRODUCT_BRIEF.md`
3. `docs/02_STORYBOARD.md`
4. `docs/03_DESIGN_SYSTEM.md`
5. `docs/04_MOTION_SPEC.md`
6. `docs/05_IMPLEMENTATION_PLAN.md`
7. `docs/06_PRIVACY_AND_ASSETS.md`

## Команды
```powershell
npm install
npm run dev
npm run typecheck
npm run build
```
