@echo off
title GVK Weapon Studio
echo =======================================================
echo   GVK WEAPON STUDIO // REAL-TIME WEAPONCORE CONFIGURATOR
echo   Engine: Ash-LikeSnow/WeaponCore
echo   Mod:    GV-Server-Mods/GVK-Weapons-Pack
echo =======================================================
echo.
echo Launching GVK Weapon Studio in your browser...
echo.

:: Check if Python is available to run local HTTP server
where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo Starting local web server on port 8080...
    start http://localhost:8080/docs/index.html
    python -m http.server 8080
) else (
    echo Opening directly in default browser...
    start "" "%~dp0docs\index.html"
)

