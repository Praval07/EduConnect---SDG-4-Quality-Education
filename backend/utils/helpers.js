/**
 * Backend utility helpers for EduConnect AI
 */

/**
 * Standard API success response
 */
const successResponse = (res, data = {}, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...data,
  });
};

/**
 * Standard API error response
 */
const errorResponse = (res, message = 'Internal Server Error', statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

/**
 * Validate required fields in a request body
 * Returns array of missing field names
 */
const validateFields = (body, required = []) => {
  return required.filter((field) => !body[field] || String(body[field]).trim() === '');
};

/**
 * Paginate a Mongoose query
 * Returns { data, pagination }
 */
const paginate = async (query, page = 1, limit = 12) => {
  const skip = (page - 1) * limit;
  const total = await query.clone().countDocuments();
  const data = await query.skip(skip).limit(limit);
  return {
    data,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit),
    },
  };
};

module.exports = { successResponse, errorResponse, validateFields, paginate };
