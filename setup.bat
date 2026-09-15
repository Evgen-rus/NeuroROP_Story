@echo off
setlocal EnableExtensions
chcp 65001 >nul
title NeuroROP Story - setup
cd /d "%~dp0"

set REPORT=%~dp0setup-report.txt
> "%REPORT%" echo NeuroROP Story setup report
>>"%REPORT%" echo Date: %date% %time%
>>"%REPORT%" echo Folder: %cd%
>>"%REPORT%" echo.

echo.
echo ============================================================
echo   NeuroROP Story - проверка среды и установка зависимостей
echo ============================================================
echo.
echo Отчёт будет сохранён: setup-report.txt
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [!] Node.js не найден.
  >>"%REPORT%" echo [!] Node.js не найден.
  where winget >nul 2>nul
  if errorlevel 1 (
    echo [X] winget тоже не найден.
    echo Установите Node.js LTS и снова запустите setup.bat.
    >>"%REPORT%" echo [X] winget не найден. Требуется Node.js LTS.
    pause
    exit /b 1
  )
  echo [i] Пробую установить Node.js LTS через winget...
  >>"%REPORT%" echo [i] Попытка установки Node.js LTS через winget.
  winget install OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements >>"%REPORT%" 2>&1
  if errorlevel 1 (
    echo [X] Автоустановка Node.js не удалась. См. setup-report.txt
    pause
    exit /b 1
  )
  echo [OK] Node.js установлен.
  echo Закройте окно и запустите setup.bat ещё раз, чтобы обновился PATH.
  >>"%REPORT%" echo [OK] Node.js установлен. Нужен повторный запуск setup.bat.
  pause
  exit /b 0
)

node -e "const [a,b]=process.versions.node.split('.').map(Number); process.exit((a>20 || (a===20 && b>=19))?0:1)"
if errorlevel 1 (
  echo [X] Нужен Node.js 20.19+ или новее.
  echo Сейчас:
  node -v
  >>"%REPORT%" echo [X] Слишком старая версия Node.js:
  node -v >>"%REPORT%" 2>&1
  echo Обновите Node.js LTS и запустите setup.bat снова.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo [X] npm не найден, хотя Node.js есть.
  >>"%REPORT%" echo [X] npm не найден.
  pause
  exit /b 1
)

echo [OK] Node:
node -v
echo [OK] npm:
npm -v
>>"%REPORT%" echo [OK] Node:
node -v >>"%REPORT%" 2>&1
>>"%REPORT%" echo [OK] npm:
npm -v >>"%REPORT%" 2>&1

if exist node_modules (
  echo [i] node_modules уже есть. npm синхронизирует только нужные зависимости.
  >>"%REPORT%" echo [i] node_modules уже существовал.
) else (
  echo [i] node_modules нет. Будет создан локально для этого проекта.
  >>"%REPORT%" echo [i] node_modules отсутствовал.
)

echo.
echo [1/3] Установка/синхронизация зависимостей...
>>"%REPORT%" echo.
>>"%REPORT%" echo === npm install ===
call npm install >>"%REPORT%" 2>&1
if errorlevel 1 goto :fail

echo [OK] зависимости готовы.

echo.
echo [2/3] TypeScript check...
>>"%REPORT%" echo.
>>"%REPORT%" echo === npm run typecheck ===
call npm run typecheck >>"%REPORT%" 2>&1
if errorlevel 1 goto :fail
echo [OK] typecheck.

echo.
echo [3/3] Production build...
>>"%REPORT%" echo.
>>"%REPORT%" echo === npm run build ===
call npm run build >>"%REPORT%" 2>&1
if errorlevel 1 goto :fail
echo [OK] build.

>>"%REPORT%" echo.
>>"%REPORT%" echo RESULT: SUCCESS

echo.
echo ============================================================
echo [OK] Всё готово.
echo Следующий шаг: запустите run.bat
echo Если будете присылать мне отчёт — пришлите setup-report.txt
echo ============================================================
echo.
pause
exit /b 0

:fail
>>"%REPORT%" echo.
>>"%REPORT%" echo RESULT: FAILED
echo.
echo ============================================================
echo [X] Setup остановлен из-за ошибки.
echo Пришлите файл setup-report.txt — там полный вывод.
echo ============================================================
echo.
pause
exit /b 1
