const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure the .next directory doesn't exist or is empty
const nextDir = path.join(__dirname, '.next');
if (fs.existsSync(nextDir)) {
  console.log('Removing existing .next directory...');
  try {
    fs.rmSync(nextDir, { recursive: true, force: true });
    console.log('.next directory removed successfully.');
  } catch (error) {
    console.warn('Warning: Could not remove .next directory:', error.message);
    // Continue anyway
  }
}

// Create a netlify.toml file for deployment configuration
const netlifyConfig = `
[build]
  command = "npm run build"
  publish = "out"

[[plugins]]
  package = "@netlify/plugin-nextjs"
`;

fs.writeFileSync(path.join(__dirname, 'netlify.toml'), netlifyConfig);
console.log('Created netlify.toml configuration file.');

try {
  // Run next build with environment variables to disable telemetry and tracing
  console.log('Building Next.js application for Netlify...');
  execSync('npx next build', {
    env: {
      ...process.env,
      NEXT_TELEMETRY_DISABLED: '1',
      NODE_OPTIONS: '--no-warnings --max-old-space-size=4096'
    },
    stdio: 'inherit'
  });
  
  console.log('Build completed successfully!');
  console.log('Your static site is in the "out" directory, ready for Netlify deployment.');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
