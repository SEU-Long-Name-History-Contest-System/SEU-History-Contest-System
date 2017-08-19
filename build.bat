@echo off
::"echo." is for printting an empty line, "::" for comment.

set i=1
set n=5

echo (%i%/%n%)Restoring Server-side Nuget Packages...
cd ./HistoryContest.Server
call dotnet restore
set /a i=i+1

echo.
echo (%i%/%n%)Building Server and Database...
call dotnet ef database update
set /a i=i+1

cd ../

echo. 
echo (%i%/%n%)Restoring Client-side NPM Packages...
cd ./HistoryContest.Client
call npm install
set /a i=i+1

echo. 
echo (%i%/%n%)Building Webpack...
call node node_modules/webpack/bin/webpack.js --config webpack.config.vendor.js --env.prod
call node node_modules/webpack/bin/webpack.js --env.prod
set /a i=i+1

cd ../

echo.
echo (%i%/%n%)Restoring MDWiki renderer html...
cd ./HistoryContest.Wiki
call powershell (new-object System.Net.WebClient).DownloadFile('http://dynalon.github.io/mdwiki/index.html', './index.html')
echo Successfully downloaded index.html from http://dynalon.github.io/mdwiki/index.html.
set /a i=i+1

echo.
echo Restore process finished.
pause