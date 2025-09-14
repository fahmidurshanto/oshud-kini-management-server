const Sale = require('../models/Sale');
const Product = require('../models/Product');

// Get all sales
const getSales = async (req, res) => {
  try {
    const sales = await Sale.find().sort({ saleDate: -1 });
    res.json({ sales });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Create a new sale
const createSale = async (req, res) => {
  try {
    const { customerName, items, discount = 0 } = req.body;

    if (!customerName || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        message: 'Customer name and items are required' 
      });
    }

    // Validate each item and calculate totals
    let totalAmount = 0;
    const processedItems = [];

    for (const item of items) {
      const { productId, quantity, price } = item; // Get the selling price from the request
      
      if (!productId || !quantity || quantity <= 0) {
        return res.status(400).json({ 
          message: 'Each item must have a valid productId and quantity' 
        });
      }

      // Find the product
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ 
          message: `Product with id ${productId} not found` 
        });
      }

      // Check if there's enough quantity
      if (product.quantity < quantity) {
        return res.status(400).json({ 
          message: `Not enough quantity for product ${product.name}. Available: ${product.quantity}, Requested: ${quantity}` 
        });
      }

      // Use the selling price from the request, or fallback to product price
      const sellingPrice = price || product.price;
      const itemTotal = sellingPrice * quantity;
      totalAmount += itemTotal;

      processedItems.push({
        productId: product._id,
        productName: product.name,
        quantity,
        price: sellingPrice, // Use the selling price
        total: itemTotal
      });

      // Update product quantity
      product.quantity -= quantity;
      await product.save();
    }

    const finalAmount = totalAmount - discount;

    // Create the sale record
    const sale = new Sale({
      customerName,
      items: processedItems,
      totalAmount,
      discount,
      finalAmount
    });

    await sale.save();

    res.status(201).json({ 
      message: 'Sale created successfully',
      sale 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Delete a sale and restore product quantities
const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the sale
    const sale = await Sale.findById(id);
    if (!sale) {
      return res.status(404).json({ 
        message: 'Sale not found' 
      });
    }
    
    // Restore product quantities
    for (const item of sale.items) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.quantity += item.quantity;
        await product.save();
      }
    }
    
    // Delete the sale
    await Sale.findByIdAndDelete(id);
    
    res.json({ 
      message: 'Sale deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Get sales statistics
const getSalesStats = async (req, res) => {
  try {
    // Get total sales count
    const totalSales = await Sale.countDocuments();
    
    // Get total revenue
    const totalRevenueResult = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$finalAmount" }
        }
      }
    ]);
    
    const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].totalRevenue : 0;
    
    // Get today's sales
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todaySalesResult = await Sale.aggregate([
      {
        $match: {
          saleDate: { $gte: today }
        }
      },
      {
        $group: {
          _id: null,
          todayRevenue: { $sum: "$finalAmount" },
          todaySalesCount: { $sum: 1 }
        }
      }
    ]);
    
    const todayRevenue = todaySalesResult.length > 0 ? todaySalesResult[0].todayRevenue : 0;
    const todaySalesCount = todaySalesResult.length > 0 ? todaySalesResult[0].todaySalesCount : 0;

    res.json({ 
      totalSales,
      totalRevenue,
      todayRevenue,
      todaySalesCount
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

module.exports = {
  getSales,
  createSale,
  deleteSale,
  getSalesStats
};