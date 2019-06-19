@ECHO OFF
CLS
title Updating xampp site...
echo Updating files, please wait...
xcopy index.html C:\xampp\htdocs\website\index.html /E /I /Q /Y
echo All file copied.
pause >nul
exit