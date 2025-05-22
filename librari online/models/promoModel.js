const db = require('../db');

exports.getAllPromotions = async () => {
  const pool = await db;
  const result = await pool.request().query('SELECT * FROM Promotions');
  return result.recordset;
};

exports.createPromotion = async (promo) => {
  const { PromoCode, Description, DiscountAmount, StartDate, EndDate } = promo;
  const pool = await db;
  return await pool.request()
    .input('PromoCode', PromoCode)
    .input('Description', Description)
    .input('DiscountAmount', DiscountAmount)
    .input('StartDate', StartDate)
    .input('EndDate', EndDate)
    .query(`INSERT INTO Promotions (PromoCode, Description, DiscountAmount, StartDate, EndDate)
            VALUES (@PromoCode, @Description, @DiscountAmount, @StartDate, @EndDate)`);
};

exports.updatePromotion = async (id, promo) => {
  const { PromoCode, Description, DiscountAmount, StartDate, EndDate } = promo;
  const pool = await db;
  return await pool.request()
    .input('id', id)
    .input('PromoCode', PromoCode)
    .input('Description', Description)
    .input('DiscountAmount', DiscountAmount)
    .input('StartDate', StartDate)
    .input('EndDate', EndDate)
    .query(`UPDATE Promotions SET
              PromoCode = @PromoCode,
              Description = @Description,
              DiscountAmount = @DiscountAmount,
              StartDate = @StartDate,
              EndDate = @EndDate
            WHERE PromotionID = @id`);
};

exports.deletePromotion = async (id) => {
  const pool = await db;
  return await pool.request().input('id', id).query('DELETE FROM Promotions WHERE PromotionID = @id');
};

