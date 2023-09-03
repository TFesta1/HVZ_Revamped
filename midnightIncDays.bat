@echo off

REM Replace the API URL with your actual API endpoint
REM set "apiUrl=http://localhost:3000/api/models/midnightIncDays"
REM set "apiUrl=https://newpaltzhvz.netlify.app/api/models/midnightIncDays"
set "apiUrl=http://localhost:3000/api/models/midnightIncDays"

REM Call the API using curl
curl %apiUrl%

REM Pause (optional, to see the output)
pause
