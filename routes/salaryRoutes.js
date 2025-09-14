const express = require('express');
const {
  getSalaries,
  getSalaryById,
  createSalary,
  updateSalary,
  deleteSalary,
  getSalaryHistory,
  getCurrentMonthEmployees,
  processSalaries,
  addAdjustment
} = require('../controllers/salaryController');

const router = express.Router();

router.get('/', getSalaries);
router.get('/history', getSalaryHistory);
router.get('/current-month', getCurrentMonthEmployees);
router.get('/:id', getSalaryById);
router.post('/', createSalary);
router.post('/process', processSalaries);
router.post('/adjustment/:employeeId', addAdjustment);
router.put('/:id', updateSalary);
router.delete('/:id', deleteSalary);

module.exports = router;