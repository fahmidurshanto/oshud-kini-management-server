# Frontend Integration Guide

This guide explains how to connect the Oshud Kini Management System frontend to the backend API.

## API Endpoint Configuration

The backend server runs on port 5000 by default. To connect the frontend to the backend, you'll need to update the service files in the frontend to make actual API calls instead of using the JSON files.

## Authentication

### Login
- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt_token",
    "user": {
      "id": "user_id",
      "username": "string",
      "email": "string"
    }
  }
  ```

### Register
- **Endpoint**: `POST /api/auth/register`
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt_token",
    "user": {
      "id": "user_id",
      "username": "string",
      "email": "string"
    }
  }
  ```

## Products API

All product endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Get All Products
- **Endpoint**: `GET /api/products`
- **Response**:
  ```json
  {
    "products": [
      {
        "id": "product_id",
        "name": "string",
        "price": "number",
        "quantity": "number",
        "description": "string",
        "dateAdded": "date"
      }
    ]
  }
  ```

### Get Product by ID
- **Endpoint**: `GET /api/products/:id`
- **Response**:
  ```json
  {
    "product": {
      "id": "product_id",
      "name": "string",
      "price": "number",
      "quantity": "number",
      "description": "string",
      "dateAdded": "date"
    }
  }
  ```

### Create Product
- **Endpoint**: `POST /api/products`
- **Request Body**:
  ```json
  {
    "name": "string",
    "price": "number",
    "quantity": "number",
    "description": "string"
  }
  ```
- **Response**:
  ```json
  {
    "product": {
      "id": "product_id",
      "name": "string",
      "price": "number",
      "quantity": "number",
      "description": "string",
      "dateAdded": "date"
    }
  }
  ```

### Update Product
- **Endpoint**: `PUT /api/products/:id`
- **Request Body**:
  ```json
  {
    "name": "string",
    "price": "number",
    "quantity": "number",
    "description": "string"
  }
  ```
- **Response**:
  ```json
  {
    "product": {
      "id": "product_id",
      "name": "string",
      "price": "number",
      "quantity": "number",
      "description": "string",
      "dateAdded": "date"
    }
  }
  ```

### Delete Product
- **Endpoint**: `DELETE /api/products/:id`
- **Response**:
  ```json
  {
    "message": "Product deleted successfully"
  }
  ```

## Employees API

All employee endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Get All Employees
- **Endpoint**: `GET /api/employees`
- **Response**:
  ```json
  {
    "employees": [
      {
        "id": "employee_id",
        "name": "string",
        "email": "string",
        "jobTitle": "string",
        "salary": "number",
        "status": "string"
      }
    ]
  }
  ```

### Get Employee by ID
- **Endpoint**: `GET /api/employees/:id`
- **Response**:
  ```json
  {
    "employee": {
      "id": "employee_id",
      "name": "string",
      "email": "string",
      "jobTitle": "string",
      "salary": "number",
      "status": "string"
    }
  }
  ```

### Create Employee
- **Endpoint**: `POST /api/employees`
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "jobTitle": "string",
    "salary": "number"
  }
  ```
- **Response**:
  ```json
  {
    "employee": {
      "id": "employee_id",
      "name": "string",
      "email": "string",
      "jobTitle": "string",
      "salary": "number",
      "status": "Active"
    }
  }
  ```

### Update Employee
- **Endpoint**: `PUT /api/employees/:id`
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "jobTitle": "string",
    "salary": "number",
    "status": "string"
  }
  ```
- **Response**:
  ```json
  {
    "employee": {
      "id": "employee_id",
      "name": "string",
      "email": "string",
      "jobTitle": "string",
      "salary": "number",
      "status": "string"
    }
  }
  ```

### Delete Employee
- **Endpoint**: `DELETE /api/employees/:id`
- **Response**:
  ```json
  {
    "message": "Employee deleted successfully"
  }
  ```

### Activate Employee
- **Endpoint**: `PUT /api/employees/:id/activate`
- **Response**:
  ```json
  {
    "employee": {
      "id": "employee_id",
      "name": "string",
      "email": "string",
      "jobTitle": "string",
      "salary": "number",
      "status": "Active"
    }
  }
  ```

## Salaries API

All salary endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Get All Salaries
- **Endpoint**: `GET /api/salaries`
- **Response**:
  ```json
  {
    "salaries": [
      {
        "id": "salary_id",
        "month": "string",
        "totalAmount": "number",
        "processedDate": "date",
        "employeeCount": "number"
      }
    ]
  }
  ```

### Get Salary by ID
- **Endpoint**: `GET /api/salaries/:id`
- **Response**:
  ```json
  {
    "salary": {
      "id": "salary_id",
      "month": "string",
      "totalAmount": "number",
      "processedDate": "date",
      "employeeCount": "number"
    }
  }
  ```

### Create Salary
- **Endpoint**: `POST /api/salaries`
- **Request Body**:
  ```json
  {
    "month": "string",
    "totalAmount": "number",
    "processedDate": "date",
    "employeeCount": "number"
  }
  ```
- **Response**:
  ```json
  {
    "salary": {
      "id": "salary_id",
      "month": "string",
      "totalAmount": "number",
      "processedDate": "date",
      "employeeCount": "number"
    }
  }
  ```

### Update Salary
- **Endpoint**: `PUT /api/salaries/:id`
- **Request Body**:
  ```json
  {
    "month": "string",
    "totalAmount": "number",
    "processedDate": "date",
    "employeeCount": "number"
  }
  ```
- **Response**:
  ```json
  {
    "salary": {
      "id": "salary_id",
      "month": "string",
      "totalAmount": "number",
      "processedDate": "date",
      "employeeCount": "number"
    }
  }
  ```

### Delete Salary
- **Endpoint**: `DELETE /api/salaries/:id`
- **Response**:
  ```json
  {
    "message": "Salary record deleted successfully"
  }
  ```

## Dashboard API

The dashboard endpoint requires authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Get Dashboard Data
- **Endpoint**: `GET /api/dashboard`
- **Response**:
  ```json
  {
    "stats": [
      {
        "title": "string",
        "value": "string|number",
        "icon": "string",
        "color": "string"
      }
    ],
    "recentActivity": [
      {
        "id": "activity_id",
        "icon": "string",
        "iconColor": "string",
        "iconTextColor": "string",
        "title": "string",
        "description": "string"
      }
    ]
  }
  ```

## Frontend Service Updates

To connect the frontend services to the backend API, you'll need to replace the current JSON-based implementations with actual API calls. Here's an example of how to update the productService.js:

```javascript
// Example productService.js update
const API_BASE_URL = 'http://localhost:5000';

// Function to get products
export const getProducts = async () => {
  try {
    const token = localStorage.getItem('token'); // Get JWT token from localStorage
    const response = await fetch(`${API_BASE_URL}/api/products`, {
      headers: {
        'Authorization': `Bearer ${token}`,
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

// Function to create a product
export const createProduct = async (productData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
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

// ... other functions
```

## CORS Configuration

The backend is already configured to accept requests from any origin. If you need to restrict access to specific origins, you can modify the CORS configuration in `server.js`:

```javascript
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true
}));
```

## Environment Variables

Make sure to set the correct MongoDB URI and JWT secret in the `.env` file:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/oshud-kini-management
JWT_SECRET=your_secure_jwt_secret_here
```