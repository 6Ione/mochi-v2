@echo off
cd /d "%~dp0"
echo Mochi WebKitty Local HTTP Server (trusted LAN only)
echo Open http://YOUR_PC_LAN_IP:8082/ on the PS4.
echo Press Ctrl+C to stop the server.
py -3 serve_local.py
pause
