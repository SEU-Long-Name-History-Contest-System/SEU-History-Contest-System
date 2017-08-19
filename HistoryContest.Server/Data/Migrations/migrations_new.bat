@echo off
if "%1"=="" goto ArgumentNull
cd ../../
call dotnet ef migrations add %1 --output-dir ./Data/Migrations
call dotnet ef database update
exit

:ArgumentNull
echo Please pass an argument to specify the name of the new migration.
pause