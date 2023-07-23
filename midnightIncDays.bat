@echo off

REM Replace the API URL with your actual API endpoint
set "apiUrl=http://localhost:3000/api/models/midnightIncDays"

REM Call the API using curl
curl %apiUrl%

REM Pause (optional, to see the output)
pause
