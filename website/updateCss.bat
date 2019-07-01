@ECHO OFF
CLS
title Updating xampp site...
echo Updating files, please wait...
xcopy css C:\xampp\htdocs\css /E /I /Q /Y
echo All file copied.
pause >nul
exit