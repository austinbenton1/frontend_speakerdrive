const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, 'out');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

try {
  // Run next build with environment variable to skip tracing
  console.log('Building Next.js application...');
  execSync('npx next build', {
    env: {
      ...process.env,
      NEXT_TELEMETRY_DISABLED: '1',
      NODE_OPTIONS: '--no-warnings'
    },
    stdio: 'inherit'
  });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  
  // If build fails due to trace issue, try to create a static export
  console.log('Attempting static export as fallback...');
  try {
    execSync('npx next export', {
      env: {
        ...process.env,
        NEXT_TELEMETRY_DISABLED: '1',
        NODE_OPTIONS: '--no-warnings'
      },
      stdio: 'inherit'
    });
    console.log('Static export completed successfully!');
  } catch (exportError) {
    console.error('Static export failed:', exportError.message);
    process.exit(1);
  }
}
