@echo off
rem Abre la web en tu navegador. Haz doble clic en este archivo.
cd /d "%~dp0"
set PORT=8080
(py -m http.server %PORT% || python -m http.server %PORT%) 
pause
