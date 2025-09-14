const express = require('express');
const {
  getSales,
  createSale,
  deleteSale,
  getSalesStats
} = require('../controllers/salesController');

const router = express.Router();

router.get('/', getSales);
router.get('/stats', getSalesStats);
router.post('/', createSale);
router.delete('/:id', deleteSale); // Add delete sale endpoint

module.exports = router;