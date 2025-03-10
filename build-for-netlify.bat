@echo off
echo Building Next.js application for Netlify deployment...

:: Set environment variables to disable telemetry and tracing
set NEXT_TELEMETRY_DISABLED=1
set NODE_OPTIONS=--no-warnings

:: Create an empty .next directory structure without the trace file
if exist .next rmdir /s /q .next
mkdir .next
mkdir .next\cache
mkdir .next\server
mkdir .next\static

:: Run the Next.js build with the static export option
echo Running Next.js build...
call npx next build

:: Check if build was successful
if %ERRORLEVEL% NEQ 0 (
  echo Build failed. Please check the error messages above.
  exit /b 1
)

echo Build completed successfully!
echo Your static site is in the "out" directory, ready for Netlify deployment.
