const Product = require('../models/Product');
const Employee = require('../models/Employee');
const Salary = require('../models/Salary');
const Sale = require('../models/Sale');
const Expense = require('../models/Expense'); // Add Expense model

// Get dashboard data
const getDashboardData = async (req, res) => {
  try {
    // Get counts
    const totalProducts = await Product.countDocuments();
    const totalEmployees = await Employee.countDocuments();
    const totalSalaries = await Salary.countDocuments();
    
    // Get total product quantity and value
    const products = await Product.find();
    const totalProductQuantity = products.reduce((sum, product) => sum + (product.quantity || 0), 0);
    const totalProductValue = products.reduce((sum, product) => sum + (product.price * product.quantity || 0), 0);
    
    // Get latest salary record
    const latestSalary = await Salary.findOne().sort({ processedDate: -1 });
    const currentMonthSalary = latestSalary ? latestSalary.totalAmount : 0;
    
    // Get total salary expenses
    const allSalaries = await Salary.find();
    const totalSalaryExpenses = allSalaries.reduce((sum, salary) => sum + (salary.totalAmount || 0), 0);
    
    // Get active employees
    const activeEmployees = await Employee.countDocuments({ status: 'Active' });
    
    // Calculate total sales (assuming each product's price * quantity is a proxy for inventory value)
    // In a real application, you would have sales transactions
    const totalSales = totalProductValue; // Placeholder for actual sales data
    const totalPurchases = totalProductValue; // Placeholder for actual purchase data
    
    // Get sales statistics
    const totalSalesCount = await Sale.countDocuments();
    const totalRevenueResult = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$finalAmount" }
        }
      }
    ]);
    const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].totalRevenue : 0;

    // Get expense statistics
    const totalExpensesCount = await Expense.countDocuments();
    const totalExpenseAmountResult = await Expense.aggregate([
      {
        $group: {
          _id: null,
          totalExpenseAmount: { $sum: "$amount" }
        }
      }
    ]);
    const totalExpenseAmount = totalExpenseAmountResult.length > 0 ? totalExpenseAmountResult[0].totalExpenseAmount : 0;

    const stats = [
      {
        title: "Total Products",
        value: totalProducts,
        icon: "📦",
        color: "bg-blue-500"
      },
      {
        title: "Total Employees",
        value: totalEmployees,
        icon: "👥",
        color: "bg-green-500"
      },
      {
        title: "This Month's Salary",
        value: `৳${currentMonthSalary.toLocaleString()}`,
        icon: "💰",
        color: "bg-yellow-500"
      },
      {
        title: "Total Product Quantity",
        value: totalProductQuantity,
        icon: "📊",
        color: "bg-purple-500"
      },
      {
        title: "Total Revenue",
        value: `৳${totalRevenue.toLocaleString()}`,
        icon: "📈",
        color: "bg-indigo-500"
      },
      {
        title: "Total Sales",
        value: totalSalesCount,
        icon: "🛒",
        color: "bg-pink-500"
      },
      {
        title: "Active Employees",
        value: activeEmployees,
        icon: "✅",
        color: "bg-teal-500"
      },
      {
        title: "Total Salary Expenses",
        value: `৳${totalSalaryExpenses.toLocaleString()}`,
        icon: "💸",
        color: "bg-red-500"
      },
      {
        title: "Total Expenses",
        value: `৳${totalExpenseAmount.toLocaleString()}`,
        icon: "📋",
        color: "bg-orange-500"
      }
    ];

    // Get recent activities from actual data
    const recentProducts = await Product.find().sort({ createdAt: -1 }).limit(3);
    const recentEmployees = await Employee.find().sort({ createdAt: -1 }).limit(3);
    const recentSalaries = await Salary.find().sort({ processedDate: -1 }).limit(3);
    const recentSales = await Sale.find().sort({ saleDate: -1 }).limit(3);
    const recentExpenses = await Expense.find().sort({ createdAt: -1 }).limit(3); // Add recent expenses

    // Combine and sort all recent activities
    const allActivities = [
      ...recentProducts.map(product => ({
        id: product._id,
        type: 'product',
        action: 'New product added',
        item: product.name,
        time: new Date(product.createdAt).toLocaleDateString(),
        timestamp: product.createdAt
      })),
      ...recentEmployees.map(employee => ({
        id: employee._id,
        type: 'employee',
        action: 'New employee joined',
        item: employee.name,
        time: new Date(employee.createdAt).toLocaleDateString(),
        timestamp: employee.createdAt
      })),
      ...recentSalaries.map(salary => ({
        id: salary._id,
        type: 'salary',
        action: 'Salaries processed',
        item: salary.month,
        time: new Date(salary.processedDate).toLocaleDateString(),
        timestamp: salary.processedDate
      })),
      ...recentSales.map(sale => ({
        id: sale._id,
        type: 'sale',
        action: 'New sale completed',
        item: sale.customerName,
        time: new Date(sale.saleDate).toLocaleDateString(),
        timestamp: sale.saleDate
      })),
      ...recentExpenses.map(expense => ({ // Add recent expenses to activities
        id: expense._id,
        type: 'expense',
        action: 'New expense added',
        item: expense.purpose,
        time: new Date(expense.expenseDate).toLocaleDateString(),
        timestamp: expense.expenseDate
      }))
    ];

    // Sort by timestamp and take the 5 most recent
    const recentActivity = allActivities
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 5)
      .map((activity, index) => {
        let icon, iconColor, iconTextColor;
        
        switch (activity.type) {
          case 'product':
            icon = "📦";
            iconColor = "bg-blue-100";
            iconTextColor = "text-blue-500";
            break;
          case 'employee':
            icon = "👤";
            iconColor = "bg-green-100";
            iconTextColor = "text-green-500";
            break;
          case 'salary':
            icon = "💰";
            iconColor = "bg-yellow-100";
            iconTextColor = "text-yellow-500";
            break;
          case 'sale':
            icon = "💰";
            iconColor = "bg-green-100";
            iconTextColor = "text-green-500";
            break;
          case 'expense': // Add expense icon
            icon = "📋";
            iconColor = "bg-red-100";
            iconTextColor = "text-red-500";
            break;
          default:
            icon = "📝";
            iconColor = "bg-gray-100";
            iconTextColor = "text-gray-500";
        }
        
        return {
          id: activity.id,
          icon: icon,
          iconColor: iconColor,
          iconTextColor: iconTextColor,
          title: activity.action,
          description: `${activity.item} - ${activity.time}`
        };
      });

    // Additional data for charts or detailed views
    const additionalData = {
      productCategories: [
        { name: "Electronics", count: Math.floor(totalProducts * 0.4) },
        { name: "Clothing", count: Math.floor(totalProducts * 0.3) },
        { name: "Food", count: Math.floor(totalProducts * 0.2) },
        { name: "Other", count: Math.ceil(totalProducts * 0.1) }
      ],
      employeeDistribution: [
        { department: "Sales", count: Math.floor(totalEmployees * 0.3) },
        { department: "Marketing", count: Math.floor(totalEmployees * 0.25) },
        { department: "Engineering", count: Math.floor(totalEmployees * 0.2) },
        { department: "HR", count: Math.floor(totalEmployees * 0.15) },
        { department: "Other", count: Math.ceil(totalEmployees * 0.1) }
      ]
    };

    res.json({ 
      stats, 
      recentActivity,
      totalProducts,
      totalEmployees,
      totalSalaries,
      totalProductQuantity,
      totalProductValue,
      currentMonthSalary,
      totalSalaryExpenses,
      activeEmployees,
      totalSales,
      totalPurchases,
      totalRevenue,
      totalSalesCount,
      totalExpensesCount,
      totalExpenseAmount,
      additionalData
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

module.exports = {
  getDashboardData
};