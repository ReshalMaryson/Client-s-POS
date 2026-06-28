// models
const Sales = require("../models/salesSchema");
const Products = require("../models/productSchema");

exports.createSale = async (req, res) => {
  try {
    const { items: cartItems } = req.body;

    const productIds = cartItems.map((item) => item.id);

    const products = await Products.find({
      _id: {
        $in: productIds,
      },
    });

    const saleItems = [];

    for (const cartItem of cartItems) {
      const product = products.find((p) => p._id.toString() === cartItem.id);

      if (!product) {
        return res.status(404).json({
          message: `Product not found ${cartItem.id}`,
        });
      }

      if (product.stock < cartItem.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}`,
        });
      }

      saleItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        cost: product.cost,
        quantity: cartItem.quantity,
        subtotal: product.price * cartItem.quantity,
      });
    }

    // calculate total
    const subtotal = saleItems.reduce((sum, item) => sum + item.subtotal, 0);
    const discount = req.body.discount || 0;

    //  payload
    const payload = {
      invoiceNumber: "INV-001",
      soldBy: req.id,
      customer: req.body.customer,
      items: saleItems,
      subtotal,
      discount,
      totalAmount: subtotal - discount,
      paymentMethod: req.body.paymentMethod,
    };

    res.json(payload);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
