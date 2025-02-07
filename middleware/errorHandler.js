const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: err.message || "An unexpected error occurred",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

const errorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
  });
};

const successResponse = (res, statusCode, data, message) => {
  res.status(statusCode).json({
    success: true,
    status: statusCode,
    data,
    message,
  });
};

module.exports = { errorHandler, successResponse, errorResponse };
