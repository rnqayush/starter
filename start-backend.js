const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Website Builder Backend...');
console.log('');

// Change to backend directory
process.chdir(path.join(__dirname, 'backend'));

// Check if package.json exists
const fs = require('fs');
if (!fs.existsSync('package.json')) {
  console.error('❌ Backend package.json not found. Make sure backend directory exists.');
  process.exit(1);
}

// Check if node_modules exists, if not install dependencies
if (!fs.existsSync('node_modules')) {
  console.log('📦 Installing backend dependencies...');
  const install = spawn('npm', ['install'], { stdio: 'inherit' });
  
  install.on('close', (code) => {
    if (code !== 0) {
      console.error('❌ Failed to install dependencies');
      process.exit(1);
    }
    startServer();
  });
} else {
  startServer();
}

function startServer() {
  console.log('🎯 Starting backend server...');
  console.log('   Backend URL: http://localhost:5000');
  console.log('   API Base: http://localhost:5000/api');
  console.log('   Health Check: http://localhost:5000/api/health');
  console.log('');
  console.log('📋 Ready for frontend integration!');
  console.log('   You can now run the frontend and use the start-building feature');
  console.log('');
  console.log('Press Ctrl+C to stop the server');
  console.log('');
  
  const server = spawn('npm', ['run', 'dev'], { stdio: 'inherit' });
  
  server.on('close', (code) => {
    console.log(`\n🛑 Backend server exited with code ${code}`);
  });
  
  // Handle Ctrl+C
  process.on('SIGINT', () => {
    console.log('\n👋 Shutting down backend server...');
    server.kill();
    process.exit(0);
  });
}
