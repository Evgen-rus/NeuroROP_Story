@echo off
setlocal
chcp 65001 >nul
title NeuroROP Story - dev server
cd /d "%~dp0"

if not exist node_modules (
  echo [!] Зависимости ещё не установлены. Сначала запустите setup.bat
  pause
  exit /b 1
)

echo Запускаю NeuroROP Story...
echo Для остановки нажмите Ctrl+C.
echo.
call npm run dev
