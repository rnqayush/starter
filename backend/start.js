const { spawn } = require('child_process');
const path = require('path');

// Start the backend server
console.log('🚀 Starting StoreBuilder Backend Server...');

const server = spawn('node', ['server.js'], {
  cwd: __dirname,
  stdio: 'inherit'
});

server.on('error', (err) => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});

server.on('close', (code) => {
  console.log(`🔚 Server process exited with code ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Received SIGINT, shutting down gracefully...');
  server.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
  server.kill('SIGTERM');
  process.exit(0);
});
