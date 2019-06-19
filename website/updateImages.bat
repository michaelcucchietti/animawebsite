@ECHO OFF
CLS
title Updating xampp site...
echo Updating files, please wait...
xcopy images C:\xampp\htdocs\website\images /E /I /Q /Y
echo All file copied.
pause >nul
exit