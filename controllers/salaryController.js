const Salary = require('../models/Salary');
const Employee = require('../models/Employee');

// Get all salary records
const getSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find().sort({ processedDate: -1 });
    res.json({ salaries });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Get salary history
const getSalaryHistory = async (req, res) => {
  try {
    const salaries = await Salary.find().sort({ processedDate: -1 });
    res.json({ salaries });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Get current month employees for salary processing
const getCurrentMonthEmployees = async (req, res) => {
  try {
    // For now, return all active employees
    // In a real implementation, you might want to filter by hire date or other criteria
    const employees = await Employee.find({ status: 'Active' });
    res.json({ employees });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Process salaries
const processSalaries = async (req, res) => {
  try {
    const { month, salaries } = req.body;
    
    if (!month || !salaries || !Array.isArray(salaries)) {
      return res.status(400).json({ 
        message: 'Month and salaries array are required' 
      });
    }
    
    // Create a new salary record
    const totalAmount = salaries.reduce((sum, salary) => sum + (salary.amount || 0), 0);
    const employeeCount = salaries.length;
    
    const salaryRecord = new Salary({
      month,
      totalAmount,
      processedDate: new Date(),
      employeeCount
    });
    
    await salaryRecord.save();
    
    res.status(201).json({ 
      message: 'Salaries processed successfully',
      salary: salaryRecord
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Add adjustment (bonus/deduction) for an employee
const addAdjustment = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { type, amount, reason } = req.body;
    
    if (!type || amount === undefined || !reason) {
      return res.status(400).json({ 
        message: 'Type, amount, and reason are required' 
      });
    }
    
    // In a real implementation, you would update the employee's salary record
    // For now, we'll just return a success message
    res.json({ 
      message: `${type} adjustment added successfully for employee ${employeeId}`,
      adjustment: { employeeId, type, amount, reason }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Get a single salary record by ID
const getSalaryById = async (req, res) => {
  try {
    const { id } = req.params;
    const salary = await Salary.findById(id);

    if (!salary) {
      return res.status(404).json({ message: 'Salary record not found' });
    }

    res.json({ salary });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Create a new salary record
const createSalary = async (req, res) => {
  try {
    const { month, totalAmount, processedDate, employeeCount } = req.body;

    if (!month || totalAmount === undefined || !processedDate || employeeCount === undefined) {
      return res.status(400).json({ 
        message: 'Month, totalAmount, processedDate, and employeeCount are required' 
      });
    }

    const salary = new Salary({
      month,
      totalAmount: parseFloat(totalAmount),
      processedDate: new Date(processedDate),
      employeeCount: parseInt(employeeCount)
    });

    await salary.save();
    res.status(201).json({ salary });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Update a salary record
const updateSalary = async (req, res) => {
  try {
    const { id } = req.params;
    const { month, totalAmount, processedDate, employeeCount } = req.body;

    const salary = await Salary.findById(id);

    if (!salary) {
      return res.status(404).json({ message: 'Salary record not found' });
    }

    if (month !== undefined) salary.month = month;
    if (totalAmount !== undefined) salary.totalAmount = parseFloat(totalAmount);
    if (processedDate !== undefined) salary.processedDate = new Date(processedDate);
    if (employeeCount !== undefined) salary.employeeCount = parseInt(employeeCount);

    await salary.save();
    res.json({ salary });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Delete a salary record
const deleteSalary = async (req, res) => {
  try {
    const { id } = req.params;
    const salary = await Salary.findByIdAndDelete(id);

    if (!salary) {
      return res.status(404).json({ message: 'Salary record not found' });
    }

    res.json({ message: 'Salary record deleted successfully' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

module.exports = {
  getSalaries,
  getSalaryHistory,
  getCurrentMonthEmployees,
  processSalaries,
  addAdjustment,
  getSalaryById,
  createSalary,
  updateSalary,
  deleteSalary
};