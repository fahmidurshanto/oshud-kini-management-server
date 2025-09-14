const { exec } = require('child_process');

console.log('Checking MongoDB installation and status...\n');

// Check if MongoDB is installed
exec('mongod --version', (error, stdout, stderr) => {
  if (error) {
    console.log('❌ MongoDB is not installed or not in PATH');
    console.log('Please install MongoDB from https://www.mongodb.com/try/download/community\n');
    return;
  }
  
  console.log('✅ MongoDB is installed');
  console.log(stdout);
  
  // Check if MongoDB is running
  exec('mongo --eval "db.runCommand({ connectionStatus: 1 })"', (error, stdout, stderr) => {
    if (error) {
      console.log('❌ MongoDB service is not running');
      console.log('To start MongoDB:\n');
      console.log('Windows: net start MongoDB');
      console.log('macOS/Linux: sudo systemctl start mongod\n');
      console.log('Or run "mongod" in a separate terminal\n');
      return;
    }
    
    console.log('✅ MongoDB service is running');
    console.log('You can now start the server with "npm run dev"\n');
  });
});