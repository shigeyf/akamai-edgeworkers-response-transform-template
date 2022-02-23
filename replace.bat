@echo off

setlocal

set cli_json="akamai-cli.config.json"
set bundle_json="src\bundle.json"

FOR /F "delims=" %%i IN ('jq -r .edgeworkers.edgeworkerId %cli_json%') DO set edgeworkerId=%%i
echo .["edgeworker-version"]> query.jq
FOR /F "delims=" %%j IN ('jq -r -f ./query.jq %bundle_json%') DO set edgeworkerBundleVersion=%%j
rm -f query.jq
REM echo %edgeworkerId%
REM echo %edgeworkerBundleVersion%

cat %1 | sed "s;@@VERSION@@;%edgeworkerBundleVersion%;" | sed "s;@@EDGEWORKERS_ID@@;%edgeworkerId%;" > %1.new
mv %1 %1.orig
mv %1.new %1

endlocal
