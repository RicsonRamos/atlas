@echo off
cd /d "%~dp0"
start "Atlas - Servidor Local" cmd /k python -m http.server 8000
timeout /t 2 /nobreak >nul
start "" http://localhost:8000
