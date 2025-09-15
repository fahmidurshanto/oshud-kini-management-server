const express = require('express');
const {
  getExpenses,
  createExpense,
  deleteExpense,
  getExpenseStats,
  updateExpense
} = require('../controllers/expenseController');

const router = express.Router();

router.get('/', getExpenses);
router.get('/stats', getExpenseStats);
router.post('/', createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;