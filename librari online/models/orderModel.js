const db = require('../db');

exports.getAllOrders = async () => {
  const pool = await db;
  const result = await pool.request().query('SELECT * FROM Orders');
  return result.recordset;
};

exports.getOrderById = async (id) => {
  const pool = await db;
  const result = await pool.request().input('id', id).query('SELECT * FROM Orders WHERE OrderID = @id');
  return result.recordset[0];
};

exports.createOrder = async (order) => {
  const { CustomerID, OrderDate, ShippingAddressID, TotalAmount, OrderStatus, PaymentStatus } = order;
  const pool = await db;
  return await pool.request()
    .input('CustomerID', CustomerID)
    .input('OrderDate', OrderDate)
    .input('ShippingAddressID', ShippingAddressID)
    .input('TotalAmount', TotalAmount)
    .input('OrderStatus', OrderStatus)
    .input('PaymentStatus', PaymentStatus)
    .query(`INSERT INTO Orders (CustomerID, OrderDate, ShippingAddressID, TotalAmount, OrderStatus, PaymentStatus)
            VALUES (@CustomerID, @OrderDate, @ShippingAddressID, @TotalAmount, @OrderStatus, @PaymentStatus)`);
};

exports.updateOrder = async (id, order) => {
  const { OrderStatus, PaymentStatus } = order;
  const pool = await db;
  return await pool.request()
    .input('id', id)
    .input('OrderStatus', OrderStatus)
    .input('PaymentStatus', PaymentStatus)
    .query('UPDATE Orders SET OrderStatus = @OrderStatus, PaymentStatus = @PaymentStatus WHERE OrderID = @id');
};

exports.deleteOrder = async (id) => {
  const pool = await db;
  return await pool.request().input('id', id).query('DELETE FROM Orders WHERE OrderID = @id');
};
