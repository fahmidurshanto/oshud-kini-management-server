const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const Employee = require('./models/Employee');
const Salary = require('./models/Salary');
const User = require('./models/User');
const bcrypt = require('bcrypt');

dotenv.config();

// MongoDB connection with better error handling
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/oshud-kini-management');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.log('Please make sure MongoDB is running on your system.');
    console.log('You can start MongoDB by running "mongod" in a separate terminal.');
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB().then(async () => {
  try {
    // Clear existing data
    await Product.deleteMany({});
    await Employee.deleteMany({});
    await Salary.deleteMany({});
    await User.deleteMany({});
    
    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    const adminUser = new User({
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword
    });
    
    await adminUser.save();
    console.log('Admin user created');
    
    // Create sample products
    const products = [
      {
        name: "Laptop",
        price: 1200,
        quantity: 15,
        description: "High-performance laptop with latest processor",
        dateAdded: new Date("2023-01-15")
      },
      {
        name: "Desk Chair",
        price: 300,
        quantity: 25,
        description: "Ergonomic office chair with lumbar support",
        dateAdded: new Date("2023-02-20")
      },
      {
        name: "Monitor",
        price: 400,
        quantity: 30,
        description: "27-inch 4K monitor with HDR support",
        dateAdded: new Date("2023-03-10")
      },
      {
        name: "Keyboard",
        price: 80,
        quantity: 50,
        description: "Mechanical keyboard with RGB lighting",
        dateAdded: new Date("2023-04-05")
      },
      {
        name: "Mouse",
        price: 50,
        quantity: 40,
        description: "Wireless mouse with high precision sensor",
        dateAdded: new Date("2023-05-12")
      }
    ];
    
    await Product.insertMany(products);
    console.log('Sample products created');
    
    // Create sample employees
    const employees = [
      {
        name: "John Doe",
        email: "john.doe@company.com",
        jobTitle: "Software Engineer",
        salary: 75000,
        status: "Active"
      },
      {
        name: "Jane Smith",
        email: "jane.smith@company.com",
        jobTitle: "Product Manager",
        salary: 85000,
        status: "Active"
      },
      {
        name: "Robert Johnson",
        email: "robert.j@company.com",
        jobTitle: "Designer",
        salary: 65000,
        status: "Inactive"
      },
      {
        name: "Emily Davis",
        email: "emily.d@company.com",
        jobTitle: "HR Specialist",
        salary: 60000,
        status: "Active"
      },
      {
        name: "Michael Wilson",
        email: "michael.w@company.com",
        jobTitle: "DevOps Engineer",
        salary: 80000,
        status: "Active"
      },
      {
        name: "Sarah Johnson",
        email: "sarah.j@company.com",
        jobTitle: "Marketing Manager",
        salary: 70000,
        status: "Active"
      },
      {
        name: "David Brown",
        email: "david.b@company.com",
        jobTitle: "Accountant",
        salary: 65000,
        status: "Active"
      },
      {
        name: "Lisa Miller",
        email: "lisa.m@company.com",
        jobTitle: "QA Engineer",
        salary: 70000,
        status: "Active"
      }
    ];
    
    await Employee.insertMany(employees);
    console.log('Sample employees created');
    
    // Create sample salary records
    const salaries = [
      {
        month: "September 2023",
        totalAmount: 12450,
        processedDate: new Date("2023-09-01"),
        employeeCount: 12
      },
      {
        month: "August 2023",
        totalAmount: 12200,
        processedDate: new Date("2023-08-01"),
        employeeCount: 12
      },
      {
        month: "July 2023",
        totalAmount: 12100,
        processedDate: new Date("2023-07-01"),
        employeeCount: 11
      },
      {
        month: "June 2023",
        totalAmount: 11900,
        processedDate: new Date("2023-06-01"),
        employeeCount: 11
      },
      {
        month: "May 2023",
        totalAmount: 11750,
        processedDate: new Date("2023-05-01"),
        employeeCount: 10
      },
      {
        month: "April 2023",
        totalAmount: 11600,
        processedDate: new Date("2023-04-01"),
        employeeCount: 10
      },
      {
        month: "March 2023",
        totalAmount: 11500,
        processedDate: new Date("2023-03-01"),
        employeeCount: 9
      }
    ];
    
    await Salary.insertMany(salaries);
    console.log('Sample salary records created');
    
    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
});