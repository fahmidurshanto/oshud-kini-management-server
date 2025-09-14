// Simple API test script
const axios = require('axios');

// Base URL for the API
const BASE_URL = 'http://localhost:5000';

// Test data
const testProduct = {
  name: 'Test Product',
  price: 99.99,
  quantity: 10,
  description: 'A test product for API testing'
};

const testEmployee = {
  name: 'Test Employee',
  email: 'test.employee@example.com',
  jobTitle: 'Test Developer',
  salary: 50000
};

const testSalary = {
  month: 'October 2023',
  totalAmount: 5000,
  processedDate: '2023-10-01',
  employeeCount: 5
};

let authToken = '';
let createdProductId = '';
let createdEmployeeId = '';
let createdSalaryId = '';

// Test functions
async function testHealthCheck() {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    console.log('✓ Health check passed:', response.data.message);
    return true;
  } catch (error) {
    console.error('✗ Health check failed:', error.message);
    return false;
  }
}

async function testRegister() {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/register`, {
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword123'
    });
    console.log('✓ Registration passed:', response.data.user.username);
    return true;
  } catch (error) {
    console.error('✗ Registration failed:', error.response?.data?.message || error.message);
    return false;
  }
}

async function testLogin() {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, {
      username: 'testuser',
      password: 'testpassword123'
    });
    authToken = response.data.token;
    console.log('✓ Login passed, token received');
    return true;
  } catch (error) {
    console.error('✗ Login failed:', error.response?.data?.message || error.message);
    return false;
  }
}

async function testCreateProduct() {
  try {
    const response = await axios.post(`${BASE_URL}/api/products`, testProduct, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    createdProductId = response.data.product._id;
    console.log('✓ Product creation passed:', response.data.product.name);
    return true;
  } catch (error) {
    console.error('✗ Product creation failed:', error.response?.data?.message || error.message);
    return false;
  }
}

async function testGetProducts() {
  try {
    const response = await axios.get(`${BASE_URL}/api/products`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✓ Get products passed, found', response.data.products.length, 'products');
    return true;
  } catch (error) {
    console.error('✗ Get products failed:', error.response?.data?.message || error.message);
    return false;
  }
}

async function testCreateEmployee() {
  try {
    const response = await axios.post(`${BASE_URL}/api/employees`, testEmployee, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    createdEmployeeId = response.data.employee._id;
    console.log('✓ Employee creation passed:', response.data.employee.name);
    return true;
  } catch (error) {
    console.error('✗ Employee creation failed:', error.response?.data?.message || error.message);
    return false;
  }
}

async function testGetEmployees() {
  try {
    const response = await axios.get(`${BASE_URL}/api/employees`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✓ Get employees passed, found', response.data.employees.length, 'employees');
    return true;
  } catch (error) {
    console.error('✗ Get employees failed:', error.response?.data?.message || error.message);
    return false;
  }
}

async function testCreateSalary() {
  try {
    const response = await axios.post(`${BASE_URL}/api/salaries`, testSalary, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    createdSalaryId = response.data.salary._id;
    console.log('✓ Salary creation passed:', response.data.salary.month);
    return true;
  } catch (error) {
    console.error('✗ Salary creation failed:', error.response?.data?.message || error.message);
    return false;
  }
}

async function testGetSalaries() {
  try {
    const response = await axios.get(`${BASE_URL}/api/salaries`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✓ Get salaries passed, found', response.data.salaries.length, 'salary records');
    return true;
  } catch (error) {
    console.error('✗ Get salaries failed:', error.response?.data?.message || error.message);
    return false;
  }
}

async function testGetDashboard() {
  try {
    const response = await axios.get(`${BASE_URL}/api/dashboard`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✓ Get dashboard passed, found', response.data.stats.length, 'stats');
    return true;
  } catch (error) {
    console.error('✗ Get dashboard failed:', error.response?.data?.message || error.message);
    return false;
  }
}

async function runTests() {
  console.log('Starting API tests...\n');
  
  // Run tests in sequence
  const tests = [
    testHealthCheck,
    testRegister,
    testLogin,
    testCreateProduct,
    testGetProducts,
    testCreateEmployee,
    testGetEmployees,
    testCreateSalary,
    testGetSalaries,
    testGetDashboard
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    const result = await test();
    if (result) {
      passed++;
    } else {
      failed++;
    }
    // Add a small delay between tests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`\nTests completed: ${passed} passed, ${failed} failed`);
  
  if (failed === 0) {
    console.log('🎉 All tests passed!');
  } else {
    console.log('❌ Some tests failed.');
  }
}

// Run the tests
runTests().catch(error => {
  console.error('Test suite error:', error);
});