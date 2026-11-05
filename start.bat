@echo off
title Beyond the Unknown (BTU) Tactical Server
echo =======================================================
echo Starting Beyond the Unknown Full-Stack Application...
echo =======================================================
echo.
start "" http://localhost:5000
node backend/server.js
pause

