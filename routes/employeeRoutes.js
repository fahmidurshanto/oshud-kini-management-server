const express = require('express');
const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  activateEmployee,
  deactivateEmployee,
  getEmployeeStats
} = require('../controllers/employeeController');

const router = express.Router();

router.get('/', getEmployees);
router.get('/stats', getEmployeeStats);
router.get('/:id', getEmployeeById);
router.post('/', createEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);
router.put('/:id/activate', activateEmployee);
router.put('/:id/deactivate', deactivateEmployee);

module.exports = router;