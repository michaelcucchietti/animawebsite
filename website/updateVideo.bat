@ECHO OFF
CLS
title Updating xampp site...
echo Updating files, please wait...
xcopy videos C:\xampp\htdocs\website\videos /E /I /Q /Y
echo All file copied.
pause >nul
exit