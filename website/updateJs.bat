@ECHO OFF
CLS
title Updating xampp site...
echo Updating files, please wait...
xcopy js C:\xampp\htdocs\js /E /I /Q /Y
echo All file copied.
pause >nul
exit