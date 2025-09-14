# Oshud Kini Management System - Backend Server

This is the backend server for the Oshud Kini Management System, built with Node.js, Express, and MongoDB.

## Prerequisites

1. Node.js (version 14 or higher)
2. MongoDB (version 4.4 or higher)

## Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd oshud-kini-management-server
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## MongoDB Setup

You have two options for setting up MongoDB:

### Option 1: Local MongoDB Installation

1. Install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   - On Windows: `net start MongoDB` or run `mongod` in a terminal
   - On macOS/Linux: `sudo systemctl start mongod` or run `mongod` in a terminal

### Option 2: MongoDB Atlas (Cloud)

1. Sign up for a free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add database user and IP whitelist
4. Get your connection string
5. Update the `.env` file with your Atlas connection string

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB connection string
MONGODB_URI=your-mongodb-connection-string

# JWT secret key
JWT_SECRET=your-jwt-secret-key-here

# Port (optional, defaults to 5000)
PORT=5000
```

For MongoDB Atlas, use your connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/oshud-kini-management
```

## Available Scripts

### `npm start`

Runs the server in production mode.

### `npm run dev`

Runs the server in development mode with nodemon for automatic restarts on file changes.

### `npm run seed`

Populates the database with sample data.

### `npm run check-mongodb`

Checks if MongoDB is installed and running.

### `npm run check-mongodb-connection`

Tests the connection to MongoDB.

### `npm run test-mongodb-installation`

Checks MongoDB installation and service status.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/stats` - Get employee statistics
- `GET /api/employees/:id` - Get a specific employee
- `POST /api/employees` - Create a new employee
- `PUT /api/employees/:id` - Update an employee
- `PUT /api/employees/:id/activate` - Activate an employee
- `PUT /api/employees/:id/deactivate` - Deactivate an employee
- `DELETE /api/employees/:id` - Delete an employee

### Salaries
- `GET /api/salaries` - Get all salary records
- `GET /api/salaries/history` - Get salary history
- `GET /api/salaries/current-month` - Get current month employees
- `GET /api/salaries/:id` - Get a specific salary record
- `POST /api/salaries` - Create a new salary record
- `POST /api/salaries/process` - Process salaries
- `POST /api/salaries/adjustment/:employeeId` - Add adjustment for employee
- `PUT /api/salaries/:id` - Update a salary record
- `DELETE /api/salaries/:id` - Delete a salary record

### Dashboard
- `GET /api/dashboard` - Get dashboard data (stats and recent activity)

## Testing the API

You can test the API endpoints using curl or a tool like Postman:

```bash
# Test root endpoint
curl https://oshud-kini-management-server.onrender.com/

# Test authentication (replace with valid credentials)
curl -X POST https://oshud-kini-management-server.onrender.com/api/auth/login -H "Content-Type: application/json" -d '{"username":"test@example.com","password":"password"}'
```

## Troubleshooting

### MongoDB Connection Issues

If you're having trouble connecting to MongoDB:

1. Check if MongoDB is installed:
   ```bash
   npm run check-mongodb
   ```

2. Check if MongoDB is running:
   ```bash
   npm run test-mongodb-installation
   ```

3. Test the connection directly:
   ```bash
   npm run check-mongodb-connection
   ```

### Common Errors

1. **ECONNREFUSED**: MongoDB is not running. Start the MongoDB service.
2. **Authentication failed**: Check your MongoDB credentials in the `.env` file.
3. **Port already in use**: Change the PORT variable in `.env` or stop the process using port 5000.

## Seeding the Database

To populate the database with sample data:

```bash
npm run seed
```

This will create sample products, employees, and salary records for testing.

## Development

The server uses the following technologies:

- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication
- **Bcrypt**: Password hashing

## License

This project is licensed under the MIT License.