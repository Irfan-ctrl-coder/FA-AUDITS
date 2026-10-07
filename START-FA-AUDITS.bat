@echo off
cd /d "%~dp0"
echo.
echo Starting FA Audits website...
echo Keep this window open while using the website.
echo.
start "FA Audits Browser" http://localhost:5173/
npm run dev
pause
