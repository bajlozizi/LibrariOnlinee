const Order = require('../models/orderModel');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createOrder = async (req, res) => {
  try {
    await Order.createOrder(req.body);
    res.status(201).json({ message: 'Order created' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    await Order.updateOrder(req.params.id, req.body);
    res.json({ message: 'Order updated' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.deleteOrder(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};