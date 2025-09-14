const { exec } = require('child_process');

console.log('Checking if MongoDB is installed...');

exec('mongod --version', (error, stdout, stderr) => {
  if (error) {
    console.log('MongoDB is not installed or not in PATH');
    console.log('Error:', error.message);
    return;
  }
  
  console.log('MongoDB is installed');
  console.log(stdout);
});