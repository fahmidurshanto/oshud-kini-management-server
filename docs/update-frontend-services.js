/*
 * This is a demonstration script showing how to update the frontend services
 * to use the backend API instead of JSON files.
 * 
 * This is NOT meant to be run directly, but rather as a reference for updating
 * the actual frontend service files.
 */

// Example of how to update productService.js
const productServiceExample = `
// productService.js - Updated to use backend API
const API_BASE_URL = 'https://oshud-kini-management-server.onrender.com';

// Function to get products
export const getProducts = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(\`\${API_BASE_URL}/api/products\`, {
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Function to get a single product by ID
export const getProductById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(\`\${API_BASE_URL}/api/products/\${id}\`, {
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    
    const data = await response.json();
    return data.product;
  } catch (error) {
    console.error(\`Error fetching product with id \${id}:\`, error);
    throw error;
  }
};

// Function to create a new product
export const createProduct = async (productData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(\`\${API_BASE_URL}/api/products\`, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    
    const data = await response.json();
    return data.product;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Function to update an existing product
export const updateProduct = async (id, productData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(\`\${API_BASE_URL}/api/products/\${id}\`, {
      method: 'PUT',
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    
    const data = await response.json();
    return data.product;
  } catch (error) {
    console.error(\`Error updating product with id \${id}:\`, error);
    throw error;
  }
};

// Function to delete a product
export const deleteProduct = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(\`\${API_BASE_URL}/api/products/\${id}\`, {
      method: 'DELETE',
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(\`Error deleting product with id \${id}:\`, error);
    throw error;
  }
};
`;

// Example of how to update employeeService.js
const employeeServiceExample = `
// employeeService.js - Updated to use backend API
const API_BASE_URL = 'https://oshud-kini-management-server.onrender.com';

// Function to get employees
export const getEmployees = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(\`\${API_BASE_URL}/api/employees\`, {
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }
    
    const data = await response.json();
    return data.employees;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

// Function to get a single employee by ID
export const getEmployeeById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(\`\${API_BASE_URL}/api/employees/\${id}\`, {
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch employee');
    }
    
    const data = await response.json();
    return data.employee;
  } catch (error) {
    console.error(\`Error fetching employee with id \${id}:\`, error);
    throw error;
  }
};

// Function to create a new employee
export const createEmployee = async (employeeData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(\`\${API_BASE_URL}/api/employees\`, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employeeData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create employee');
    }
    
    const data = await response.json();
    return data.employee;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
};

// Function to update an existing employee
export const updateEmployee = async (id, employeeData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(\`\${API_BASE_URL}/api/employees/\${id}\`, {
      method: 'PUT',
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employeeData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update employee');
    }
    
    const data = await response.json();
    return data.employee;
  } catch (error) {
    console.error(\`Error updating employee with id \${id}:\`, error);
    throw error;
  }
};

// Function to delete an employee
export const deleteEmployee = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(\`\${API_BASE_URL}/api/employees/\${id}\`, {
      method: 'DELETE',
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete employee');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(\`Error deleting employee with id \${id}:\`, error);
    throw error;
  }
};

// Function to activate an employee
export const activateEmployee = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(\`\${API_BASE_URL}/api/employees/\${id}/activate\`, {
      method: 'PUT',
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to activate employee');
    }
    
    const data = await response.json();
    return data.employee;
  } catch (error) {
    console.error(\`Error activating employee with id \${id}:\`, error);
    throw error;
  }
};
`;

// Example of how to update salaryService.js
const salaryServiceExample = `
// salaryService.js - Updated to use backend API
const API_BASE_URL = 'https://oshud-kini-management-server.onrender.com';

// Function to get salary history
export const getSalaryHistory = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(\`\${API_BASE_URL}/api/salaries\`, {
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch salary history');
    }
    
    const data = await response.json();
    return data.salaries;
  } catch (error) {
    console.error('Error fetching salary history:', error);
    throw error;
  }
};

// Function to get a specific salary record by ID
export const getSalaryById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(\`\${API_BASE_URL}/api/salaries/\${id}\`, {
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch salary record');
    }
    
    const data = await response.json();
    return data.salary;
  } catch (error) {
    console.error(\`Error fetching salary record with id \${id}:\`, error);
    throw error;
  }
};

// Function to create a new salary record
export const createSalaryRecord = async (salaryData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(\`\${API_BASE_URL}/api/salaries\`, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(salaryData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create salary record');
    }
    
    const data = await response.json();
    return data.salary;
  } catch (error) {
    console.error('Error creating salary record:', error);
    throw error;
  }
};

// Function to update an existing salary record
export const updateSalaryRecord = async (id, salaryData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(\`\${API_BASE_URL}/api/salaries/\${id}\`, {
      method: 'PUT',
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(salaryData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update salary record');
    }
    
    const data = await response.json();
    return data.salary;
  } catch (error) {
    console.error(\`Error updating salary record with id \${id}:\`, error);
    throw error;
  }
};

// Function to delete a salary record
export const deleteSalaryRecord = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(\`\${API_BASE_URL}/api/salaries/\${id}\`, {
      method: 'DELETE',
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete salary record');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(\`Error deleting salary record with id \${id}:\`, error);
    throw error;
  }
};
`;

// Example of how to update dashboardService.js
const dashboardServiceExample = `
// dashboardService.js - Updated to use backend API
const API_BASE_URL = 'https://oshud-kini-management-server.onrender.com';

// Function to fetch dashboard data
export const getDashboardData = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(\`\${API_BASE_URL}/api/dashboard\`, {
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

// Function to fetch dashboard data with calculated statistics
export const getDashboardDataWithStats = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(\`\${API_BASE_URL}/api/dashboard\`, {
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data with stats');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching dashboard data with stats:', error);
    throw error;
  }
};
`;

console.log("This file contains examples of how to update the frontend services to use the backend API.");
console.log("Please use these examples as a reference when updating the actual service files in the frontend.");