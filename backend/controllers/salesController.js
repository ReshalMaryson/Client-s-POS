// models
const Sales = require("../models/salesSchema");
const Products = require("../models/productSchema");
const invoiceSequence = require("../models/invoiceSequenceSchema");
const mongoose = require("mongoose");

exports.createSale = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    //check the required assets.
    if (!req.body.items || req.body.items.length == 0) {
      return res.status(400).json({ status: "failure", message: "empty cart" });
    }
    if (
      !req.body.customer ||
      !req.body.customer.name ||
      !req.body.customer.phone
    ) {
      return res.status(400).json({
        status: "failure",
        message: "required customer name and phone",
      });
    }

    //get the cart items from DB
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
      // check invalid quantity
      if (cartItem.quantity < 1) {
        return res.status(400).json({
          status: "failure",
          message: "Quantity should be atleast 1",
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

    session.startTransaction();
    //manage invoice number sequence.
    const invoiceNum = await invoiceSequence.findOneAndUpdate(
      { name: "invoice" },
      { $inc: { sequence: 1 } },
      { new: true, upsert: true, session },
    );

    const invoiceNumber = `INV-${String(invoiceNum.sequence).padStart(6, "0")}`;

    //  payload
    const payload = {
      invoiceNumber: invoiceNumber,
      soldBy: req.id,
      customer: req.body.customer,
      items: saleItems,
      subtotal,
      discount,
      totalAmount: subtotal - discount,
      paymentMethod: req.body.paymentMethod,
    };

    // create a sale
    const saleCreated = await Sales.create([payload], { session });

    if (!saleCreated) {
      return res
        .status(400)
        .json({ status: "failure", message: "failed to create sale" });
    }

    // update the stock
    for (const item of cartItems) {
      await Products.findByIdAndUpdate(
        item.id,
        {
          $inc: {
            stock: -item.quantity,
          },
        },
        { session },
      );
    }

    await session.commitTransaction();
    //succes response
    return res.status(201).json({
      status: "success",
      message: "invoice created successfuly",
      data: saleCreated,
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({
      message: error.message,
    });
  } finally {
    session.endSession();
  }
};
