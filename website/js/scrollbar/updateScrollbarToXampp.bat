@ECHO OFF
CLS
title Updating xampp site...
echo Updating files, please wait...
xcopy scrollbar.js C:\xampp\htdocs\website\js\scrollbar\scrollbar.js /E /I /Q /Y
echo All file copied.
pause >nul
exit