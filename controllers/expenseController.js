const Expense = require('../models/Expense');

// Get all expenses
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ expenseDate: -1 });
    res.json({ expenses });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Create a new expense
const createExpense = async (req, res) => {
  try {
    const { purpose, amount, expenseDate } = req.body;

    // Validate required fields
    if (!purpose || !amount) {
      return res.status(400).json({ 
        message: 'Purpose and amount are required' 
      });
    }

    // Validate amount
    if (amount <= 0) {
      return res.status(400).json({ 
        message: 'Amount must be greater than 0' 
      });
    }

    // Create the expense record
    const expense = new Expense({
      purpose,
      amount,
      expenseDate: expenseDate ? new Date(expenseDate) : new Date()
    });

    await expense.save();

    res.status(201).json({ 
      message: 'Expense created successfully',
      expense 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Update an expense
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { purpose, amount, expenseDate } = req.body;

    // Validate required fields
    if (!purpose || !amount) {
      return res.status(400).json({ 
        message: 'Purpose and amount are required' 
      });
    }

    // Validate amount
    if (amount <= 0) {
      return res.status(400).json({ 
        message: 'Amount must be greater than 0' 
      });
    }

    // Find the expense
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ 
        message: 'Expense not found' 
      });
    }

    // Update the expense
    expense.purpose = purpose;
    expense.amount = amount;
    expense.expenseDate = expenseDate ? new Date(expenseDate) : expense.expenseDate;

    await expense.save();

    res.json({ 
      message: 'Expense updated successfully',
      expense 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Delete an expense
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the expense
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ 
        message: 'Expense not found' 
      });
    }
    
    // Delete the expense
    await Expense.findByIdAndDelete(id);
    
    res.json({ 
      message: 'Expense deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Get expense statistics
const getExpenseStats = async (req, res) => {
  try {
    // Get total expenses count
    const totalExpenses = await Expense.countDocuments();
    
    // Get total expense amount
    const totalAmountResult = await Expense.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);
    
    const totalAmount = totalAmountResult.length > 0 ? totalAmountResult[0].totalAmount : 0;
    
    // Get today's expenses
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayExpensesResult = await Expense.aggregate([
      {
        $match: {
          expenseDate: { $gte: today }
        }
      },
      {
        $group: {
          _id: null,
          todayAmount: { $sum: "$amount" },
          todayExpensesCount: { $sum: 1 }
        }
      }
    ]);
    
    const todayAmount = todayExpensesResult.length > 0 ? todayExpensesResult[0].todayAmount : 0;
    const todayExpensesCount = todayExpensesResult.length > 0 ? todayExpensesResult[0].todayExpensesCount : 0;

    res.json({ 
      totalExpenses,
      totalAmount,
      todayAmount,
      todayExpensesCount
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

module.exports = {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseStats
};